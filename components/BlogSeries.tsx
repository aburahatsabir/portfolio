
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

// ─── Share Buttons ─────────────────────────────────────────────────────────────

const ShareButtons: React.FC<{ title: string }> = ({ title }) => {
  const [copied, setCopied] = useState(false);

  const share = (platform: 'x' | 'facebook' | 'linkedin' | 'copy') => {
    const url = window.location.href;
    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }
    const map = {
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };
    window.open(map[platform], '_blank', 'width=600,height=400');
  };

  const btnClass = `w-9 h-9 rounded-full flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-slate-500 hover:text-slate-800`;

  return (
    <div className="flex flex-row gap-2">
      <button type="button" onClick={() => share('x')} title="Share on X" className={btnClass}>
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
      </button>
      <button type="button" onClick={() => share('facebook')} title="Share on Facebook" className={btnClass}>
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
      </button>
      <button type="button" onClick={() => share('linkedin')} title="Share on LinkedIn" className={btnClass}>
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
      </button>
      <button type="button" onClick={() => share('copy')} title={copied ? 'Copied!' : 'Copy link'} className={btnClass}>
        {copied
          ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
          : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
        }
      </button>
    </div>
  );
};

// ─── Blog Post Detail (Webflow-style) ─────────────────────────────────────────

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
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-white min-h-screen">
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-0.5 bg-[#444CE7] origin-left z-[200]" style={{ scaleX }} />

      {/* ── HERO ── */}
      <div
        className="relative overflow-hidden pt-28 pb-16"
        style={{ background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 30%, #C7D2FE 60%, #dbeafe 100%)' }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-white/20 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-200/30 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <button type="button" onClick={navigateBack} className="hover:text-[#444CE7] transition-colors font-medium">Blog</button>
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            <span className="text-slate-700 font-medium">{post.category}</span>
          </div>

          {/* Split: text left, image right */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-[#444CE7]/10 text-[#444CE7] text-xs font-semibold rounded-full mb-6 uppercase tracking-wider">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-5">
                {post.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">{post.excerpt}</p>
              <div className="flex items-center gap-4">
                <img src={post.author.avatar} alt={post.author.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-white shadow-sm" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{post.author.name}</p>
                  <p className="text-xs text-slate-500">{post.date} · {post.readTime}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200/50 aspect-[16/10] bg-slate-200">
                <img
                  src={post.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200'}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2.5 shadow-lg border border-slate-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700">{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[280px_1fr] gap-16 items-start">

          {/* ── LEFT SIDEBAR (sticky) ── */}
          <aside className="hidden lg:block sticky top-28 space-y-8">
            {/* Author */}
            <div className="flex items-start gap-3 pb-6 border-b border-slate-100">
              <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{post.author.name}</p>
                <p className="text-xs text-slate-500 leading-snug mt-0.5">{post.author.role}</p>
              </div>
            </div>

            {/* Table of Contents */}
            {headings.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Table of contents</p>
                <nav className="space-y-1">
                  {headings.map(h => (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => scrollToHeading(h.id)}
                      className={`flex items-start gap-2 w-full text-left py-1.5 text-sm transition-colors group ${activeToc === h.id ? 'text-[#444CE7] font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
                    >
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${activeToc === h.id ? 'bg-[#444CE7]' : 'bg-slate-200 group-hover:bg-slate-400'}`} />
                      <span className="leading-snug">{h.text}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Share */}
            <div className="pb-6 border-b border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Share</p>
              <ShareButtons title={post.title} />
            </div>

            {/* Subscribe CTA */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
              <p className="text-sm font-semibold text-slate-900 mb-1">Get exclusive insights</p>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Subscribe for best practices, frameworks, and case studies.</p>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#444CE7]/20 focus:border-[#444CE7] placeholder:text-slate-400 transition-all"
                />
                <button type="submit" className="w-full py-2 text-sm font-semibold text-white bg-[#444CE7] hover:bg-[#3538CD] rounded-lg transition-colors">
                  Subscribe
                </button>
              </form>
            </div>

            {/* Back */}
            <button
              type="button"
              onClick={navigateBack}
              className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </button>
          </aside>

          {/* ── MAIN CONTENT ── */}
          <article ref={contentRef}>
            <button
              type="button"
              onClick={navigateBack}
              className="lg:hidden flex items-center gap-2 text-sm text-slate-500 hover:text-[#444CE7] transition-colors mb-8 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              All posts
            </button>

            <div className="max-w-none">
              {blocks.map((block, i) => {
                if (block.type === 'h2') {
                  const id = (block.text || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  return <h2 key={i} id={id} className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-12 mb-5 scroll-mt-32">{block.text}</h2>;
                }
                if (block.type === 'h3') {
                  return <h3 key={i} className="text-xl font-semibold text-slate-800 mt-8 mb-3">{block.text}</h3>;
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="my-5 space-y-2 pl-0">
                      {(block.items || []).map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-slate-600 leading-relaxed text-[17px]">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#444CE7] shrink-0" />
                          <span><InlineText text={item} /></span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                const isLead = i === 0;
                return (
                  <p key={i} className={`${isLead ? 'text-xl text-slate-700 font-medium leading-relaxed mb-7' : 'text-[17px] text-slate-600 leading-relaxed mb-5'}`}>
                    <InlineText text={block.text || ''} />
                  </p>
                );
              })}
            </div>

            {/* Keep Reading */}
            {relatedPosts.length > 0 && (
              <div className="mt-20 pt-12 border-t border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-8">Keep reading</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map(related => (
                    <motion.div
                      key={related.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="group cursor-pointer"
                      onClick={() => {
                        window.history.pushState({}, '', `/blog/${related.id}`);
                        window.dispatchEvent(new CustomEvent('blog-navigate', { detail: { postId: related.id } }));
                      }}
                    >
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 mb-4">
                        <img
                          src={related.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'}
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{related.category}</span>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-[#444CE7] transition-colors leading-snug mt-1.5 mb-2 line-clamp-2">{related.title}</h3>
                      <p className="text-xs text-slate-500">{related.author.name} · {related.date}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
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
