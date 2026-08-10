import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BLOG_POSTS } from '../content/blog-posts';
import type { BlogPost } from '../types';
import './HomeBlogPreview.css';

const subtitleLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;
const BLOG_HERO_FALLBACK_IMAGE = '/images/blogs/resume-writing-guide-getting-shortlisted-cover.webp';

const navigateToBlogRoute = (path: string) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const handleInternalBlogLinkClick = (
  event: React.MouseEvent<HTMLAnchorElement>,
  path: string,
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  navigateToBlogRoute(path);
};

const previewPosts = [...BLOG_POSTS]
  .sort((a, b) => Date.parse(b.publishedAt || b.date) - Date.parse(a.publishedAt || a.date))
  .slice(0, 3);

const BlogPreviewCard: React.FC<{ post: BlogPost; isFirst?: boolean }> = ({ post, isFirst = false }) => (
  <article className="h-full">
    <a
      href={`/blog/${post.id}`}
      aria-label={`Read article: ${post.title}`}
      onClick={(event) => handleInternalBlogLinkClick(event, `/blog/${post.id}`)}
      className="blog-index-card group flex h-full flex-col overflow-hidden rounded-xl border shadow-sm outline-none transition-all duration-300 focus:outline-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-100 focus-visible:ring-offset-2"
    >
      <div className="blog-index-card__media aspect-[16/10] shrink-0 overflow-hidden border-b">
        <img
          src={post.image || BLOG_HERO_FALLBACK_IMAGE}
          alt=""
          role="presentation"
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"}
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="blog-index-card__title mb-3 line-clamp-2 text-[20px] font-bold leading-[1.3] transition-colors">
          {post.title}
        </h3>
        <p className="blog-index-card__excerpt mb-6 line-clamp-2 text-[15px]">
          {post.excerpt}
        </p>
        <span className="blog-index-card__cta mt-auto flex items-center gap-1 text-[14px] font-semibold transition-all group-hover:gap-2">
          Read more{' '}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </span>
      </div>
    </a>
  </article>
);

const HomeBlogPreview: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="section home-blog-preview" aria-labelledby="home-blog-preview-title">
      <div className="home-blog-preview__container">
        <motion.div
          className="home-blog-preview__header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="home-blog-preview__heading-wrap">
            <div className="section-subtitle-wrap">
              <div className="section-subtitle-single">
                <img src={subtitleLogoUrl} loading="lazy" alt="" className="section-subtitle-icon" />
                <div className="section-subtitle">My Blogs</div>
              </div>
            </div>
            <h2 id="home-blog-preview-title" className="section-title mb0">
              Read My Recent Articles
            </h2>
          </div>
          <div className="home-blog-preview__button-wrap">
            <a
              href="/blog"
              onClick={(event) => handleInternalBlogLinkClick(event, '/blog')}
              className="primary-button"
              aria-label="Browse all articles"
            >
              <span className="primary-button-inner">
                <span className="primary-button-text-wrap">
                  <span className="primary-button-text-block">Browse All Articles</span>
                  <span className="primary-button-text-block is-text-absolute">Browse All Articles</span>
                </span>
              </span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="home-blog-preview__grid blog-post-related__grid"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          {previewPosts.map((post, index) => (
            <BlogPreviewCard key={post.id} post={post} isFirst={index === 0} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeBlogPreview;
