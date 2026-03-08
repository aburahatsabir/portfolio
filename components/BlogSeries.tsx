
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { BLOG_POSTS } from '../content/blog-posts';
import { BlogPost } from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function parseContent(content: string): Array<{ type: 'h2' | 'h3' | 'p' | 'ul'; text?: string; items?: string[] }> {
  const lines = content.split('\n');
  const blocks: Array<{ type: 'h2' | 'h3' | 'p' | 'ul'; text?: string; items?: string[] }> = [];
  let currentList: string[] | null = null;

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({ type: 'ul', items: currentList });
      currentList = null;
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }
    if (line.startsWith('### ')) { flushList(); blocks.push({ type: 'h3', text: line.slice(4) }); }
    else if (line.startsWith('## ')) { flushList(); blocks.push({ type: 'h2', text: line.slice(3) }); }
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      if (!currentList) currentList = [];
      currentList.push(line.slice(2));
    } else { flushList(); blocks.push({ type: 'p', text: line }); }
  }
  flushList();
  return blocks;
}

function extractHeadings(content: string): Array<{ id: string; text: string }> {
  return content.split('\n')
    .filter(l => l.trim().startsWith('## '))
    .map(l => {
      const text = l.trim().slice(3).trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return { id, text };
    });
}

const InlineText: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\[.+?\]\(.+?\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
        }
        const linkMatch = part.match(/^\[(.+?)\]\((.+?)\)$/);
        if (linkMatch) {
          return <a key={i} href={linkMatch[2]} className="underline text-[#444CE7] hover:opacity-80 transition-opacity">{linkMatch[1]}</a>;
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

  const navigateBack = () => {
    window.history.pushState({}, '', '/blog');
    window.dispatchEvent(new CustomEvent('blog-navigate', { detail: { postId: null } }));
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white min-h-screen font-sans selection:bg-blue-200">
      {/* Scroll Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#146ef5] origin-left z-[200]" style={{ scaleX }} />

      {/* ── HERO SECTION ── */}
      <div className="bg-[#f5f7fa] pt-32 pb-24 border-b border-[#e2e4e8]">
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Hero Content (Left) */}
          <div className="max-w-xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[14px] font-medium text-slate-500 mb-8">
               <button type="button" onClick={navigateBack} className="hover:text-slate-900 transition-colors">Blog</button>
               <span className="text-slate-300">›</span>
               <span className="text-slate-900">{post.category}</span>
            </div>

            <h1 className="text-[48px] md:text-[56px] lg:text-[64px] font-bold text-[#1a1b1f] leading-[1.05] tracking-[-0.02em] mb-6">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-[20px] md:text-[22px] text-slate-600 leading-[1.5] font-normal max-w-lg">
                {post.excerpt}
              </p>
            )}
          </div>

          {/* Hero Image (Right) */}
          <div className="w-full">
            <div className="w-full rounded-[16px] overflow-hidden bg-slate-200 aspect-[16/10] shadow-lg border border-slate-200/50 relative">
              <img
                src={post.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000'}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
              
              {/* Overlay matching the dribbble shot */}
              <div className="absolute inset-x-0 bottom-0 pt-24 pb-6 px-6 sm:px-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col sm:flex-row justify-between sm:items-end gap-6 sm:gap-0">
                <div className="flex items-center">
                  <p className="text-white text-[15px] tracking-wide flex items-center gap-2">
                    <span className="opacity-90 font-medium">Published on</span>
                    <span className="font-semibold">{post.date}</span>
                  </p>
                </div>
                
                <div className="flex gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }} className="flex items-center gap-2 px-3 py-1.5 border border-white/40 rounded-sm bg-transparent hover:bg-white/10 transition-all text-white text-[13px] font-medium tracking-wide">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    Copy link
                  </button>
                  <button onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`, '_blank')} className="w-8 h-8 border border-white/40 rounded-sm bg-transparent hover:bg-white/10 transition-all text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </button>
                  <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="w-8 h-8 border border-white/40 rounded-sm bg-transparent hover:bg-white/10 transition-all text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </button>
                  <button onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')} className="w-8 h-8 border border-white/40 rounded-sm bg-transparent hover:bg-white/10 transition-all text-white flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
      </div>

      {/* ── ARTICLE SECTION ── */}
      <div className="max-w-[1280px] mx-auto px-6 pt-24 pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-start">

          {/* ── LEFT SIDEBAR (Sticky) ── */}
          <aside className="w-full lg:w-[320px] shrink-0 lg:sticky top-32 lg:pb-12">
            
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-12">
              <div className="w-12 h-12 bg-slate-200 rounded-lg overflow-hidden shrink-0 border border-slate-200/50 shadow-[0_2px_4px_rgba(0,0,0,0.04)]">
                <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover object-top origin-[50%_15%] scale-[1.6]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[17px] font-bold text-slate-900 leading-snug">{post.author.name}</span>
                <span className="text-[15px] text-slate-500 leading-snug">{post.author.role}</span>
              </div>
            </div>

            {/* Table of Contents */}
            {headings.length > 0 && (
              <div className="bg-white border border-slate-200 rounded-xl p-6 mb-12 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <p className="text-[15px] font-bold text-slate-900 mb-4 tracking-wide uppercase text-xs">Table of contents</p>
                <nav className="flex flex-col space-y-3 relative">
                  {headings.map((h, i) => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => scrollToHeading(h.id)}
                      className="group flex gap-2.5 items-start text-left text-[15px] leading-snug transition-colors"
                    >
                      <svg className={`w-4 h-4 mt-0.5 shrink-0 transition-colors ${activeToc === h.id ? 'text-[#146ef5]' : 'text-slate-300 group-hover:text-slate-400'}`} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 2v6c0 1.1.9 2 2 2h6M11 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className={`block transition-colors ${activeToc === h.id ? 'text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'}`}>
                        {h.text}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Share */}
            <div className="mb-14">
               <p className="text-[14px] font-bold text-slate-800 mb-4 uppercase tracking-wider">Share</p>
               <div className="flex flex-row gap-5 items-center">
                 <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://aburahatsabir.vercel.app/blog/${post.id}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors" aria-label="Share on X">
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                 </a>
                 <a href={`https://www.facebook.com/sharer/sharer.php?u=https://aburahatsabir.vercel.app/blog/${post.id}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors" aria-label="Share on Facebook">
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                 </a>
                 <a href={`https://www.linkedin.com/shareArticle?mini=true&url=https://aburahatsabir.vercel.app/blog/${post.id}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 transition-colors" aria-label="Share on LinkedIn">
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                 </a>
                 <button onClick={() => {
                   navigator.clipboard.writeText(`https://aburahatsabir.vercel.app/blog/${post.id}`);
                   alert('Link copied!');
                 }} className="text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center p-1" aria-label="Copy link">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                 </button>
               </div>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-[#f5f7fa] p-8 rounded-xl border border-slate-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
              <p className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">Unlock exclusive insights</p>
              <p className="text-[15px] text-slate-600 leading-[1.6] mb-6">Subscribe now for best practices, research reports, and more.</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="w-full px-4 py-3 text-[15px] border border-slate-300 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#146ef5] focus:border-transparent placeholder:text-slate-400 transition-all shadow-sm"
                />
                <button type="submit" className="w-full py-3 text-[15px] font-semibold text-white bg-[#146ef5] hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <article ref={contentRef} className="flex-1 min-w-0 max-w-[800px] pb-12">
            
            <div className="prose prose-lg max-w-none text-slate-800 tracking-normal">
              {blocks.map((block, i) => {
                if (block.type === 'h2') {
                  const id = (block.text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return <h2 key={i} id={id} className="text-[36px] md:text-[40px] font-bold text-[#1a1b1f] tracking-[-0.01em] mt-16 mb-6 leading-[1.2] scroll-mt-32">{block.text}</h2>;
                }
                if (block.type === 'h3') {
                  return <h3 key={i} className="text-[28px] font-bold text-[#1a1b1f] mt-12 mb-4">{block.text}</h3>;
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="my-10 space-y-4 pl-0 list-none">
                      {(block.items || []).map((item, j) => (
                        <li key={j} className="flex items-start gap-5 text-[20px] leading-[1.6] text-[#1a1b1f]">
                          <span className="mt-[11px] w-[5px] h-[5px] rounded-full bg-[#146ef5] shrink-0" />
                          <span><InlineText text={item} /></span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className={`text-[20px] leading-[1.6] text-[#1a1b1f] mb-8 font-normal`}>
                    <InlineText text={block.text || ''} />
                  </p>
                );
              })}
            </div>
            
            {/* Post Tags & Bottom Meta */}
            <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
               <div className="flex gap-2">
                 {(post.tags || [post.category]).map((tag, i) => (
                   <span key={i} className="px-3 py-1.5 bg-slate-100/80 text-slate-600 text-[14px] font-semibold tracking-wide uppercase rounded-md">
                     {tag}
                   </span>
                 ))}
               </div>
               <div className="text-[14px] text-slate-500 font-medium tracking-wide">
                 LAST UPDATED: <span className="text-slate-900">{post.date}</span>
               </div>
            </div>
            
          </article>
        </div>

        {/* Keep Reading Section at bottom */}
        {relatedPosts.length > 0 && (
          <div className="mt-24 pt-16 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
               <h2 className="text-[32px] font-bold text-[#1a1b1f] tracking-[-0.01em]">Get started for free</h2>
               <button 
                 onClick={navigateBack}
                 className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 bg-white rounded-lg text-[15px] font-semibold text-slate-700 hover:bg-slate-50 hover:shadow-sm transition-all self-start sm:self-auto"
               >
                 View more templates
               </button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map(related => (
                <motion.div
                  key={related.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group cursor-pointer flex flex-col h-full bg-white border border-slate-200/60 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => {
                    window.history.pushState({}, '', `/blog/${related.id}`);
                    window.dispatchEvent(new CustomEvent('blog-navigate', { detail: { postId: related.id } }));
                  }}
                >
                  <div className="aspect-[16/10] bg-slate-100 border-b border-slate-200/60">
                    <img
                      src={related.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-[20px] font-bold text-[#1a1b1f] group-hover:text-[#146ef5] transition-colors leading-[1.3] mb-3 line-clamp-2">{related.title}</h3>
                    <p className="text-[15px] text-slate-600 mb-6 flex-1 line-clamp-2">{related.excerpt}</p>
                    <span className="text-[14px] font-semibold text-[#146ef5] mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read more <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Blog Card ─────────────────────────────────────────────────────────────────

const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
      className="group cursor-pointer flex flex-col h-full bg-transparent transition-all duration-300"
      onClick={() => {
        const id = post.id;
        window.history.pushState({}, '', `/blog/${id}`);
        window.dispatchEvent(new CustomEvent('blog-navigate', { detail: { postId: id } }));
      }}
    >
      <div className="relative aspect-[16/10] mb-6 overflow-hidden bg-slate-100">
        <img
          src={post.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <span className="text-slate-700">{post.author.name}</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">{post.date}</span>
          </div>
          <div className="shrink-0 flex items-center justify-center text-slate-300 group-hover:text-blue-600 transition-all duration-300">
            <svg className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>

        <h4 className="text-[22px] font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-[1.3] tracking-tight mb-3">
          {post.title}
        </h4>

        <p className="text-slate-500 text-base leading-relaxed mb-6 line-clamp-3">
          {post.excerpt}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {(post.tags || [post.category]).map((tag, i) => (
            <span key={i} className="px-3 py-1 bg-white border border-slate-200 text-slate-700 text-[13px] font-medium rounded-md hover:bg-slate-50 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
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
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent');
  const [selectedCategory, setSelectedCategory] = useState<string>('All categories');
  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(BLOG_POSTS.map(p => p.category)));
    return ['All categories', ...cats];
  }, []);

  useEffect(() => {
    const handleBlogNav = (e: Event) => {
      const postId = (e as CustomEvent).detail?.postId;
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      if (postId) {
        setSelectedPostId(postId);
      } else {
        setSelectedPostId(null);
      }
    };
    const path = window.location.pathname;
    if (path.startsWith('/blog/')) {
      setSelectedPostId(path.replace('/blog/', ''));
    }
    window.addEventListener('blog-navigate', handleBlogNav);
    return () => window.removeEventListener('blog-navigate', handleBlogNav);
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
    window.scrollTo({ top: document.getElementById('blog')?.offsetTop ?? 0, behavior: 'smooth' });
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
      <div className="bg-[#155EEF] pt-32 pb-32 mb-20 relative overflow-hidden -mt-24">
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
                  window.dispatchEvent(new CustomEvent('blog-navigate', { detail: { postId: id } }));
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recent.map((post) => (
                  <div
                    key={post.id}
                    className="flex gap-4 cursor-pointer group"
                    onClick={() => {
                      const id = post.id;
                      window.history.pushState({}, '', `/blog/${id}`);
                      window.dispatchEvent(new CustomEvent('blog-navigate', { detail: { postId: id } }));
                    }}
                  >
                    <div className="w-24 h-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1.5">{post.category}</p>
                      <h4 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-500">{post.author.name} • {post.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 border-t border-slate-100" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400 mt-8 mb-8">All Posts</p>
            </div>
          );
        })()}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {pagedPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </AnimatePresence>
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
