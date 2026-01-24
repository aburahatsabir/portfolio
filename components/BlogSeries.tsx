
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { BLOG_POSTS } from '../constants';
import { BlogPost } from '../types';
import PersonaCTABanner from './PersonaCTABanner';

const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 15);
    return () => clearInterval(timer);
  }, [text]);

  return <span className="mono">{displayedText}</span>;
};

const RatingSystem: React.FC<{ postId: string }> = ({ postId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [hasRated, setHasRated] = useState(false);

  const handleRate = (value: number) => {
    setRating(value);
    setHasRated(true);
    console.log(`User rated post ${postId} with ${value} stars.`);
  };

  return (
    <div className="py-12 border-y border-slate-100 my-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-2 text-center md:text-left">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600">Content Efficacy Audit</h4>
          <p className="text-xl font-black text-slate-900 tracking-tight">Was this strategic insight useful?</p>
        </div>

        {!hasRated ? (
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(null)}
                onClick={() => handleRate(star)}
                className="p-1 transition-transform hover:scale-125 focus:outline-none"
              >
                <svg
                  className={`w-8 h-8 transition-colors duration-200 ${star <= (hoveredRating || 0) ? 'fill-blue-600 text-blue-600' : 'fill-transparent text-slate-200 stroke-2'
                    }`}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 bg-emerald-50 border border-emerald-100 px-6 py-3 rounded-2xl"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-emerald-600">Feedback Recorded</p>
              <p className="text-sm font-bold text-slate-700">Institutional knowledge updated.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const BlogPostDetail: React.FC<{ post: BlogPost }> = ({ post }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${post.title} | Thought Leadership`;
    return () => {
      document.title = originalTitle;
    };
  }, [post.title]);

  const relatedPosts = useMemo(() => {
    const others = BLOG_POSTS.filter(p => p.id !== post.id);
    const sameCategory = others.filter(p => p.category === post.category);
    const differentCategory = others.filter(p => p.category !== post.category);
    return [...sameCategory, ...differentCategory].slice(0, 2);
  }, [post]);

  const handleShare = (platform: 'linkedin' | 'twitter' | 'copy') => {
    const url = window.location.href;
    const text = `Insightful read on ${post.category}: ${post.title}`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
      return;
    }

    let shareUrl = '';
    if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen pt-32 pb-24 relative"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 origin-left z-[200]"
        style={{ scaleX }}
      />

      <div className="hidden xl:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-4 z-[100]">
        <div className="flex flex-col gap-3 p-3 glass-nav border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/50">
          <button
            onClick={() => handleShare('linkedin')}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 hover:bg-blue-600 hover:border-blue-600 group transition-all duration-300"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 hover:bg-slate-900 hover:border-slate-900 group transition-all duration-300"
          >
            <svg className="w-4 h-4 text-slate-400 group-hover:text-white fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          <div className="h-px bg-slate-100 mx-2"></div>
          <button
            onClick={() => handleShare('copy')}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 hover:bg-slate-50 group transition-all duration-300 relative"
          >
            <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <a
          href="#/blog"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] mb-12 transition-colors group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Insights Library
        </a>

        <div className="grid lg:grid-cols-[1fr_320px] gap-20 items-start">
          <article className="space-y-12">
            <header className="space-y-8">
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {post.date} • {post.readTime}
                </span>
              </div>

              <h1 className="text-4xl md:text-7xl font-[900] text-slate-900 tracking-tighter leading-[1.05]">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic border-l-4 border-blue-600 pl-8 py-2">
                <TypewriterText text={post.excerpt} />
              </p>
            </header>

            <div className="aspect-[21/9] rounded-[3rem] bg-slate-50 border border-slate-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/5 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
                <span className="text-[15vw] font-black">AUDIT_LOG</span>
              </div>
            </div>

            <div className="prose prose-slate max-w-none">
              <div className="space-y-8 text-lg text-slate-700 leading-[1.8] font-medium">
                {post.content.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>

            <RatingSystem postId={post.id} />

            <div className="pt-24 pb-12">
              <div className="flex flex-col md:flex-row items-baseline gap-4 mb-12">
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600">Strategic Exploration</h2>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Deepen Your Strategy.</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {relatedPosts.map(related => (
                  <motion.a
                    key={related.id}
                    href={`#/blog/${related.id}`}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="block p-10 bg-slate-50 border border-slate-100 rounded-[3rem] group hover:border-blue-600/30 hover:bg-white transition-all duration-300"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all">
                        {related.category}
                      </span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{related.readTime}</span>
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-4">
                      {related.title}
                    </h4>
                    <div className="mt-8 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                      Continue Reading <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <PersonaCTABanner />
          </article>

          <aside className="sticky top-32 space-y-10 hidden lg:block">
            <div className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Audit Metadata</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-semibold">
                Strategic insights focused on administrative ROI and system sovereignty.
              </p>
              <div className="pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Security Level</span>
                  <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[8px] font-black rounded uppercase">Public</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black text-slate-400 uppercase">Governance ID</span>
                  <span className="font-mono text-[9px] text-slate-900 uppercase">TR-{(Math.random() * 100).toFixed(0)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

const BlogSeries: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/blog/')) {
        setSelectedPostId(hash.replace('#/blog/', ''));
      } else {
        setSelectedPostId(null);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredPosts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return BLOG_POSTS.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.excerpt.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const selectedPost = useMemo(() =>
    BLOG_POSTS.find(p => p.id === selectedPostId)
    , [selectedPostId]);

  if (selectedPost) {
    return <BlogPostDetail post={selectedPost} />;
  }

  return (
    <section id="blog" className="py-32 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">Thought Leadership</h2>
            <h3 className="text-4xl md:text-6xl font-black tracking-tight leading-tight text-slate-900">
              Administrative <span className="text-blue-600">Sovereignty.</span>
            </h3>
            <p className="mt-8 text-xl text-slate-500 leading-relaxed font-medium">
              Contrarian insights for administrative leaders who value ROI and stability over hype.
            </p>
          </div>
        </div>

        <div className="mb-12 relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-blue-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search insights..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-medium text-slate-900"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[3rem] p-10 md:p-14 border border-slate-100 hover:border-blue-600/30 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col cursor-pointer h-full"
                onClick={() => window.location.hash = `#/blog/${post.id}`}
              >
                <div className="flex justify-between items-center mb-10">
                  <span className="px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                    {post.category}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {post.date}
                  </span>
                </div>
                <h4 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight mb-8">
                  {post.title}
                </h4>
                <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-10 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest group-hover:translate-x-2 transition-transform flex items-center gap-2">
                    Review Record <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                  <span className="mono text-[9px] text-slate-300 font-black opacity-0 group-hover:opacity-100 transition-opacity">ID: {post.id}</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default BlogSeries;
