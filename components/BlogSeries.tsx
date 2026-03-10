
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { BLOG_POSTS } from '../content/blog-posts';
import { BlogPost } from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

type ContentBlock = 
  | { type: 'h2' | 'h3' | 'h4' | 'p' | 'ul' | 'feature_ul' | 'read_more'; text?: string; items?: string[]; url?: string; label?: string; }
  | { type: 'image'; url: string; caption?: string; }
  | { type: 'table'; headers: string[]; rows: string[][]; }
  | { type: 'buttons'; buttons: Array<{ label: string; url: string; variant: 'download' | 'demo' }>; };

function parseContent(content: string): Array<ContentBlock> {
  const lines = content.split('\n');
  const blocks: Array<ContentBlock> = [];
  let currentList: string[] | null = null;
  let isFeatureList = false;
  let currentTable: { headers: string[]; rows: string[][] } | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: isFeatureList ? 'feature_ul' : 'ul', items: currentList });
      currentList = null;
      isFeatureList = false;
    }
  };

  const flushTable = () => {
    if (currentTable) {
      blocks.push({ type: 'table', ...currentTable });
      currentTable = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    
    if (!line) { 
      flushList(); 
      flushTable();
      continue; 
    }
    
    // Check for Table
    if (line.startsWith('|')) {
      flushList();
      const parts = line.split('|').map(s => s.trim()).filter(s => s !== '');
      // Handle the separator line
      if (parts.every(p => p.match(/^-+$/))) {
        continue;
      }
      if (!currentTable) {
        currentTable = { headers: parts, rows: [] };
      } else {
        currentTable.rows.push(parts);
      }
      continue;
    } else {
      flushTable();
    }

    // Check for Image: ![caption](url)
    const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
    if (imgMatch) {
      flushList();
      blocks.push({ type: 'image', caption: imgMatch[1], url: imgMatch[2] });
      continue;
    }

    // Check for Buttons: [Download](url) [Demo](url)
    const btnMatch = line.match(/\[(Download|Demo)\]\((.*?)\)/gi);
    if (btnMatch && line.includes('Download') && line.includes('Demo')) {
      flushList();
      const buttons: Array<{ label: string; url: string; variant: 'download' | 'demo' }> = [];
      const matches = line.matchAll(/\[(Download|Demo)\]\((.*?)\)/gi);
      for (const m of matches) {
        buttons.push({ label: m[1], url: m[2], variant: m[1].toLowerCase() as 'download' | 'demo' });
      }
      blocks.push({ type: 'buttons', buttons });
      continue;
    }

    // Check for inline "Read more" link box
    const readMoreMatch = line.match(/^\[(Read more:[^\]]+)\]\(([^)]+)\)$/i);
    if (readMoreMatch) {
      flushList();
      blocks.push({ type: 'read_more', label: readMoreMatch[1], url: readMoreMatch[2] });
      continue;
    }

    if (line.startsWith('Feature:')) {
      flushList();
      isFeatureList = true;
      continue;
    }

    if (line.startsWith('#### ')) { flushList(); blocks.push({ type: 'h4', text: line.slice(5) }); }
    else if (line.startsWith('### ')) { flushList(); blocks.push({ type: 'h3', text: line.slice(4) }); }
    else if (line.startsWith('## ')) { flushList(); blocks.push({ type: 'h2', text: line.slice(3) }); }
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!currentList) currentList = [];
      currentList.push(line.slice(2));
    } else { 
      flushList(); 
      blocks.push({ type: 'p', text: line }); 
    }
  }
  flushList();
  flushTable();
  return blocks;
}

function extractHeadings(content: string): Array<{ id: string; text: string; level: 'h2' | 'h3' }> {
  const lines = content.split('\n');
  const headings: Array<{ id: string; text: string; level: 'h2' | 'h3' }> = [];
  lines.forEach(l => {
    const trimmed = l.trim();
    if (trimmed.startsWith('## ') || trimmed.startsWith('### ')) {
      const level = trimmed.startsWith('### ') ? 'h3' : 'h2';
      const text = trimmed.replace(/^#+\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      headings.push({ id, text, level });
    }
  });
  return headings;
}

const InlineText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[.+?\]\(.+?\)|<br\s*\/?>)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        if (part.match(/<br\s*\/?>/i)) {
          return <br key={i} />;
        }
        const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
        if (linkMatch) {
          return <a key={i} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:underline underline-offset-4 decoration-2 transition-all">{linkMatch[1]}</a>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </>
  );
};


// ─── Blog Post Detail (100% Webflow Replica) ──────────────────────────────────

const BlogPostDetail: React.FC<{ post: BlogPost }> = ({ post }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [activeToc, setActiveToc] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const tocNavRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} | Thought Leadership`;
    return () => { document.title = originalTitle; };
  }, [post.title]);

  const blocks = useMemo(() => parseContent(post.content), [post.content]);
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  // For the "Keep Reading" / Related Posts section
  const relatedPosts = useMemo(() => {
    const others = BLOG_POSTS.filter(p => p.id !== post.id);
    return [...others.filter(p => p.category === post.category), ...others.filter(p => p.category !== post.category)].slice(0, 3);
  }, [post]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveToc(e.target.id); }); },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    headings.forEach(h => { const el = document.getElementById(h.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [headings]);

  // Auto-scroll the active TOC item into view within the sidebar
  useEffect(() => {
    if (!activeToc || !tocNavRef.current) return;
    const activeBtn = tocNavRef.current.querySelector(`[data-toc-id="${activeToc}"]`) as HTMLElement | null;
    if (activeBtn) {
      activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeToc]);

  const navigateBack = () => {
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-indigo-100">
      {/* Scroll Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-brand-blue origin-left z-[200]" style={{ scaleX }} />

      {/* ── HERO SECTION ── */}
      {/* Webflow exact: white base + fluted glass bars + blue bottom fade + diagonal white overlay */}
      <div className="relative overflow-hidden bg-white pt-32 pb-24 border-b border-[#e2e4e8]">
        
        {/* EXACT WEBFLOW BACKGROUND REPLICATION (REFINED SHADER MATCH) */}
        <div className="absolute inset-0 pointer-events-none bg-white overflow-hidden">
          
          {/* Base Environment */}
          <div className="absolute inset-0 bg-[#fbfcff]"></div>

          {/* LAYER 1: The exact image Webflow uses, heavily blurred & scaled to mimic WebGL diffusion.
              Scaling past 100% hides the harsh photographic dark edges of the original image. */}
          <div className="absolute inset-0 opacity-[0.8] scale-[1.3] origin-center transform-gpu" style={{
            backgroundImage: "url('https://cdn.prod.website-files.com/687e8d1b96312cc631cafec7/69a9c2b20295866956be180f_MCP-BlogHeader.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(90px) saturate(1.2)'
          }}></div>

          {/* LAYER 2: Simulated WebGL Fluted Glass Refraction Map */}
          <div className="absolute inset-0 backdrop-blur-[16px] transform-gpu" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.05) 0%,
              rgba(255,255,255,0) 50%,
              rgba(255,255,255,0.25) 100%
            )`,
            backgroundSize: '160px 100%'
          }}></div>

          {/* LAYER 3: Softened fluted indentations (Removed harsh black overlays) */}
          <div className="absolute inset-0 mix-blend-multiply opacity-[0.3]" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent 0px,
              transparent 159px,
              rgba(20,110,245,0.08) 159.5px,
              rgba(20,110,245,0.02) 160px
            )`
          }}></div>

          {/* LAYER 4: Webflow's exact overlay masking gradient for perfect text contrast */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(165deg, rgba(255,255,255,1) 35%, rgba(255,255,255,0) 80%)',
          }}></div>

          {/* LAYER 5: Webflow's exact noise overlay mapping (Shader noise simulation) */}
          <div className="absolute inset-0 opacity-[0.035] mix-blend-multiply pointer-events-none" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%221.5%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')",
          }}></div>

          {/* Content Integration Fades (Top and Bottom edges) */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent"></div>

        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Hero Content (Left) */}
          <div className="max-w-[600px]">
            {/* Breadcrumb - Exact Webflow URL Match: 16px, normal tracking, normal casing, 16px margin bottom */}
            <div className="flex items-center gap-2 mb-[16px]" style={{
                fontSize: '16px',
                lineHeight: '22.4px',
                letterSpacing: 'normal',
                fontWeight: 400
            }}>
               <button type="button" onClick={navigateBack} className="text-slate-500 hover:text-slate-900 transition-colors">Blog</button>
               <span className="text-slate-500">›</span>
               <span className="text-slate-500">{post.category}</span>
            </div>

            {/* Typography Exact Ref Match: Core theme font with Webflow's rigorous breakpoint math, Semibold (600) */}
            <h1 className="font-semibold text-[#111111] mb-[24px] text-[33.17px] md:text-[41.6px] lg:text-[56px] leading-[1.04] tracking-normal">
              {post.title}
            </h1>
            
            {/* Subtitle / Excerpt - Exact Webflow URL Match: 16px, 1.6 line height, semibold */}
            {post.excerpt && (
              <p className="text-[#333333] mb-10" style={{
                  fontSize: '16px',
                  lineHeight: '25.6px',
                  letterSpacing: 'normal',
                  fontWeight: 600
              }}>
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Hero Image (Right) - EXACT Webflow Card Styling */}
          <div className="w-full relative group">

            {/* Exactly 8px rounded corners, perfect 16:9 layout, NO drop shadows, NO hover effects */}
            <div className="w-full rounded-[8px] overflow-hidden bg-slate-50 aspect-[16/9] relative">
              <img
                src={post.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
          
        </div>
      </div>

      {/* ── ARTICLE SECTION ── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">

          {/* ── MAIN CONTENT ── */}
          <article ref={contentRef} className="flex-1 min-w-0 max-w-[850px] pb-12">
            
            <div className="prose prose-lg max-w-none text-slate-800 tracking-normal leading-[1.5]">
              {blocks.map((block, i) => {
                if (block.type === 'h2') {
                  const id = (block.text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  const rawText = block.text || '';
                  const hasGradient = rawText.includes('[gradient]');
                  const cleanText = rawText.replace('[gradient]', '').trim();
                  // Webflow H2: clamp(2rem, 3.5rem) -> text-[32px] md:text-[44px] lg:text-[56px]
                  return <h2 key={i} id={id} className={`scroll-mt-32 font-semibold text-[32px] md:text-[44px] lg:text-[56px] leading-[1.04] tracking-[0em] mt-[1.5em] mb-[0.5em] ${hasGradient ? 'blog-gradient-heading tracking-[-0.02em]' : 'text-[#080808]'}`}>{cleanText}</h2>;
                }
                if (block.type === 'h3') {
                  const id = (block.text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  const rawText = block.text || '';
                  const hasGradient = rawText.includes('[gradient]');
                  const cleanText = rawText.replace('[gradient]', '').trim();
                  // Webflow H3: clamp(1.5rem, 2rem) -> text-[24px] lg:text-[32px]
                  return <h3 key={i} id={id} className={`scroll-mt-32 font-semibold text-[24px] lg:text-[32px] leading-[1.1] tracking-[0em] mt-[1.25em] mb-[0.4em] ${hasGradient ? 'blog-gradient-heading' : 'text-[#080808]'}`}>{cleanText}</h3>;
                }
                if (block.type === 'h4') {
                  // Webflow H4: Assuming proportional spacing
                  return <h4 key={i} className="font-medium text-slate-900" style={{ fontSize: '18px', lineHeight: '24px', marginTop: '30px', marginBottom: '10.5px' }}>{block.text}</h4>;
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="mb-5 pl-[25px] list-disc" style={{ marginBottom: '10px' }}>
                      {(block.items || []).map((item, j) => (
                        <li key={j} className="text-slate-800 text-[16px] leading-[1.5] mb-[6px]">
                          <InlineText text={item} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'feature_ul') {
                  return (
                    <div key={i} className="my-5">
                       <p className="text-[16px] font-bold text-slate-900 mb-2">Feature:</p>
                       <ul className="pl-[25px] list-none" style={{ marginBottom: '10px' }}>
                        {(block.items || []).map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-[16px] leading-[1.5] text-slate-700 mb-[6px]">
                            <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0" />
                            <InlineText text={item} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                if (block.type === 'read_more' && block.url && block.label) {
                  return (
                    <div key={i} className="bg-slate-50 border-l-[4px] border-brand-blue py-3 px-5 my-5 rounded-[2px] transition-all hover:bg-slate-100 group w-fit">
                      <a href={block.url} target="_blank" rel="noopener noreferrer" className="text-brand-blue font-semibold text-[16px] leading-tight flex items-center gap-2">
                        <span className="shrink-0">Read more:</span>
                        <span className="group-hover:underline underline-offset-4 decoration-2">{block.label.replace(/^Read more:\s*/i, '')}</span>
                      </a>
                    </div>
                  );
                }
                if (block.type === 'image' && block.url) {
                  return (
                    <figure key={i} className="my-10 text-center">
                      <div className="rounded-lg overflow-hidden border border-slate-200 inline-block max-w-full">
                        <img src={block.url} alt={block.caption || 'Blog image'} className="max-w-full h-auto" />
                      </div>
                      {block.caption && <figcaption className="mt-4 text-[14px] text-slate-500 italic">{block.caption}</figcaption>}
                    </figure>
                  );
                }
                if (block.type === 'table') {
                  return (
                    <div key={i} className="my-6 overflow-x-auto" style={{ marginBottom: '24px' }}>
                      <table className="w-full text-left text-[16px]" style={{ borderCollapse: 'collapse', marginBottom: '24px' }}>
                        <thead>
                          <tr>
                            {block.headers.map((h, j) => (
                              <th key={j} style={{ background: '#eceeef', color: '#464a4c', fontWeight: 600, fontSize: '16px', padding: '0.75rem', border: '1px solid #eceeef', verticalAlign: 'top' }}>
                                <InlineText text={h} />
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.rows.map((row, j) => (
                            <tr key={j}>
                              {row.map((cell, k) => (
                                <td key={k} style={{ fontSize: '16px', padding: '0.75rem', border: '1px solid #eceeef', verticalAlign: 'top', color: '#292b2c' }}>
                                  <InlineText text={cell} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                if (block.type === 'buttons') {
                  return (
                    <div key={i} className="flex flex-wrap gap-4 my-8">
                      {block.buttons.map((btn, j) => (
                        <a
                          key={j}
                          href={btn.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-10 py-4 rounded-lg font-bold text-[17px] transition-all shadow-md hover:shadow-xl hover:-translate-y-1 ${
                            btn.variant === 'download' 
                              ? 'bg-brand-blue text-white hover:bg-[#3538CD]' 
                              : 'bg-slate-900 text-white hover:bg-black'
                          }`}
                        >
                          {btn.label}
                        </a>
                      ))}
                    </div>
                  );
                }
                return (
                  // Webflow P: font-size: 16px, line-height: 25.6px, mb: 12.5714px
                  <p key={i} className="text-slate-800 font-normal" style={{ fontSize: '16px', lineHeight: '25.6px', marginBottom: '12.5714px' }}>
                    <InlineText text={block.text || ''} />
                  </p>
                );
              })}
            </div>
            {/* Post Tags & Bottom Meta — Webflow-Inspired Premium Minimal */}
            <div className="mt-16 pt-8 border-t border-slate-100">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 sm:gap-16">
                <div className="col-span-1 sm:col-span-3 flex flex-col gap-2 justify-center">
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {['Search', 'AI', 'Marketing'].map((tag, i) => (
                      <span 
                        key={i} 
                        className="text-[16px] font-medium text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 justify-center sm:text-right">
                  <span className="text-[16px] font-medium text-slate-900 whitespace-nowrap">March 2026</span>
                </div>
              </div>
            </div>
          </article>

          {/* ── RIGHT SIDEBAR (Sticky — non-scrollable, only TOC nav scrolls) ── */}
          <aside
            className="w-full lg:w-[300px] shrink-0 lg:sticky top-24 self-start"
          >

            {/* Author Info */}
            <div className="mb-10">
              <button
                type="button"
                onClick={navigateBack}
                className="group flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-[#4F46E5] uppercase tracking-wider transition-colors"
              >
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-[#4F46E5] bg-white group-hover:bg-slate-50 transition-all">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </div>
                Back to Blog
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
              <div className="w-[60px] h-[60px] bg-slate-200 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 shadow-sm">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-bold text-slate-900 leading-snug">{post.author.name}</span>
                <span className="text-[13px] text-slate-500 font-medium leading-snug">{post.author.role}</span>
              </div>
            </div>

            {/* Table of Contents — multi-level */}
            {headings.length > 0 && (
              <div className="mb-8">
                <p className="text-[13px] font-bold text-[#222] mb-4 tracking-wide uppercase">Table of contents</p>
                <nav
                  ref={tocNavRef as React.RefObject<HTMLElement>}
                  className="no-scrollbar flex flex-col border-l-2 border-slate-100"
                  style={{
                    maxHeight: 'calc(100vh - 20rem)',
                    overflowY: 'auto',
                  }}
                >
                  {headings.map((h) => {
                    const isH3 = h.level === 'h3';
                    const isActive = activeToc === h.id;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        data-toc-id={h.id}
                        onClick={() => scrollToHeading(h.id)}
                        className={`text-left border-l-2 transition-all leading-snug ${
                          isH3
                            ? 'py-1.5 text-[13px]'
                            : 'py-2 text-[14px] font-medium'
                        } ${
                          isActive
                            ? 'border-brand-blue text-brand-blue bg-blue-50/50 font-semibold'
                            : 'border-transparent text-slate-500 hover:text-brand-blue hover:border-slate-300'
                        }`}
                        style={{
                          paddingLeft: isH3 ? '1.5rem' : '1rem',
                          marginLeft: '-2px',
                        }}
                      >
                        {h.text}
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* Share — minimal bare-icon style matching deployed site */}
            <div className="mt-2 mb-6">
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 mb-3">Share</p>
              <div className="flex items-center gap-4">
                {/* X / Twitter */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on X"
                  className="text-slate-700 hover:text-slate-950 transition-colors"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on Facebook"
                  className="text-slate-700 hover:text-slate-950 transition-colors"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Share on LinkedIn"
                  className="text-slate-700 hover:text-slate-950 transition-colors"
                >
                  <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* Copy link */}
                <button
                  type="button"
                  aria-label="Copy link"
                  className="text-slate-700 hover:text-slate-950 transition-colors"
                  onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                >
                  <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related Posts — Webflow-Inspired Premium Minimal */}
        {relatedPosts.length > 0 && (
          <div className="mt-48 pt-32 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 mb-20">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-[-0.03em]">Read next</h2>
              <button 
                onClick={navigateBack}
                className="group flex items-center gap-2 text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em]"
              >
                <span className="transition-colors group-hover:text-blue-600">Browse all</span>
                <svg className="w-4 h-4 transition-all group-hover:translate-x-1 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              {relatedPosts.slice(0, 3).map((related, index) => (
                <BlogCard key={related.id} post={related} index={index} showMeta={false} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Blog Card ─────────────────────────────────────────────────────────────────

const BlogCard: React.FC<{ post: BlogPost; index?: number; showMeta?: boolean }> = ({ post, showMeta = true }) => {
  return (
    <article
      className="group cursor-pointer flex flex-col h-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
      onClick={() => {
        const id = post.id;
        window.history.pushState({}, '', `/blog/${id}`);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }}
    >
      <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200/60 overflow-hidden shrink-0">
        <img
          src={post.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        {showMeta && (
          <p className="text-[13px] font-medium text-slate-500 mb-3 flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-blue-600/90">{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            {post.date}
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            {post.readTime}
          </p>
        )}
        <h4 className="text-[20px] font-bold text-[#1a1b1f] group-hover:text-[#4F46E5] transition-colors leading-[1.3] mb-3 line-clamp-2">
          {post.title}
        </h4>
        <p className="text-[15px] text-slate-600 mb-6 line-clamp-2">
          {post.excerpt}
        </p>
        <span className="text-[14px] font-semibold text-[#4f46e5] mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
          Read more <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </span>
      </div>
    </article>
  );
};

// ─── Dropdown ──────────────────────────────────────────────────────────────────

const PremiumDropdown: React.FC<{
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}> = ({ value, options, onChange, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none min-w-[160px] justify-between group"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-400 group-hover:text-blue-500 transition-colors">{icon}</span>}
          <span>{selectedOption.label}</span>
        </div>
        <svg
          className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute z-[60] w-full mt-2 py-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden min-w-[200px]"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                  value === option.value
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {option.label}
                {value === option.value && (
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Blog Series (Index) ────────────────────────────────────────────────────────

const BlogSeries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/blog/') && path !== '/blog/') {
        return path.replace('/blog/', '');
      }
    }
    return null;
  });
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map(p => p.category)));
    return ['All categories', ...cats];
  }, []);

  useEffect(() => {
    // Always force scroll to top on mount
    // NOTE: We do NOT add a popstate listener here because App.tsx already handles
    // routing by remounting this component entirely via key={currentPath}.
    // A duplicate popstate listener here was causing a race condition that froze
    // Framer Motion animations at opacity:0 (the blank page bug).
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    let posts = BLOG_POSTS.filter(post =>
      (post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term)) &&
      (selectedCategory === 'All categories' || post.category === selectedCategory)
    );
    if (sortBy === 'oldest') posts = [...posts].reverse();
    return posts;
  }, [searchTerm, sortBy, selectedCategory]);

  useEffect(() => { setCurrentPage(1); }, [searchTerm, sortBy, selectedCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const pagedPosts = filteredPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Small timeout to let React update the DOM first, then scroll to the cards grid
    setTimeout(() => {
      const grid = document.getElementById('all-posts-grid');
      if (grid) {
        const top = grid.getBoundingClientRect().top + window.scrollY - 100;
        if (window.__lenis) {
          window.__lenis.scrollTo(top, { immediate: true });
        } else {
          window.scrollTo({ top, behavior: 'instant' });
        }
      }
    }, 0);
  };

  const selectedPost = useMemo(() =>
    BLOG_POSTS.find(p => p.id === selectedPostId)
    , [selectedPostId]);

  if (selectedPost) {
    return <BlogPostDetail post={selectedPost} />;
  }

  return (
    <section id="blog" className="bg-white min-h-screen pb-24">
      {/* Edge-to-edge Blue Hero */}
      <div className="bg-[#4f46e5] pt-32 pb-32 mb-20 relative overflow-hidden -mt-24">
        {/* Background Circles */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 -translate-y-1/2 -left-[10%] w-[1000px] h-[1000px] rounded-full border border-white/30"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            className="absolute top-1/2 -translate-y-1/2 -left-[5%] w-[600px] h-[600px] rounded-full border border-white/30"
          />
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            className="absolute top-1/2 -translate-y-1/2 right-[5%] w-[800px] h-[800px] rounded-full border border-white/30"
          />
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            className="absolute top-1/2 -translate-y-1/2 right-[10%] w-[1200px] h-[1200px] rounded-full border border-white/30"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 lg:items-end">
            <div className="flex-1 max-w-[800px]">
              <h2 className="text-white font-semibold text-base mb-4">Blog</h2>
              <h3 className="text-4xl md:text-5xl lg:text-[64px] font-bold tracking-tight text-white leading-[1.1]">
                The Journal: Design Resources,<br className="hidden md:block"/> Interviews, and Industry News
              </h3>
            </div>

            <div className="max-w-[400px] w-full shrink-0 flex flex-col justify-end mb-1">
              <p className="text-white/90 text-[17px] font-medium mb-6 leading-[1.6]">
                Subscribe to learn about new product features, the latest in technology, solutions, and updates.
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="bg-white p-1.5 rounded-xl flex items-center shadow-sm w-full focus-within:ring-4 ring-white/20 transition-all">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-transparent text-slate-900 placeholder:text-slate-500 px-4 py-2 outline-none font-medium text-base h-11"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 h-11 transition-colors text-sm whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <div className="relative flex-1 min-w-[240px] max-w-sm group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-[15px] outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium shadow-sm hover:border-slate-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <PremiumDropdown
              value={sortBy}
              onChange={(val) => setSortBy(val as 'recent' | 'oldest')}
              options={[
                { label: 'Most recent', value: 'recent' },
                { label: 'Oldest first', value: 'oldest' }
              ]}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
              }
            />
            <PremiumDropdown
              value={selectedCategory}
              onChange={(val) => setSelectedCategory(val)}
              options={allCategories.map(cat => ({ label: cat, value: cat }))}
              icon={
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Latest Featured Section */}
        {!searchTerm && filteredPosts.length > 0 && (() => {
          const featured = filteredPosts[0];
          const recent = filteredPosts.slice(1, 4);
          return (
            <div className="mb-20">
              <h2 className="text-2xl font-semibold text-slate-900 tracking-tight mb-8">Latest</h2>

              <div
                className="grid md:grid-cols-2 gap-0 border border-slate-200 rounded-xl overflow-hidden cursor-pointer group mb-8 transition-all duration-300"
                onClick={() => {
                  const id = featured.id;
                  window.history.pushState({}, '', `/blog/${id}`);
                  window.dispatchEvent(new PopStateEvent('popstate'));
                }}
              >
                <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="p-10 flex flex-col justify-center bg-white">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 mb-4">{featured.category}</p>
                  <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 leading-[1.25] tracking-tight mb-6 group-hover:text-blue-600 transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">
                    {featured.author.name} • {featured.date}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {recent.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} showMeta={true} />
                ))}
              </div>

              <div className="mt-12 border-t border-slate-100" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mt-8 mb-8">All Posts</p>
            </div>
          );
        })()}

        <div id="all-posts-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {pagedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {pagedPosts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-medium">No results found for your search criteria.</p>
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="mt-20 pt-8 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Previous
            </button>
            <span className="text-sm font-medium text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSeries;
