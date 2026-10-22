import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { trackContactCTA } from '../utils/analytics';
import './Hero.css';

const bannerImage =
  './images/hero/Abu Rahat Hero 01.webp';

const easeOut = [0.16, 1, 0.3, 1] as const;

const Hero: React.FC = () => {
  return (
    <section className="ritovex-hero" aria-label="Hero">
      <div className="ritovex-hero__container">
        <div className="ritovex-hero__content">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
            className="ritovex-hero__typography"
          >
            <div className="ritovex-hero__subtitle-wrapper">
              <div className="ritovex-hero__subtitle">Executive Administration &amp; Operations</div>
            </div>

            <div className="ritovex-hero__title-description">
              <h1 className="ritovex-hero__title">Executive Operations Specialist</h1>
              <p className="ritovex-hero__description">
                I find what slows teams down, fix the process behind it, and document the solution,
                so executive support, office operations, and reporting stay consistent without
                constant follow-up.
              </p>
            </div>

            <div className="ritovex-hero__button-wrapper">
              <a
                href="/contact"
                onClick={() =>
                  trackContactCTA({
                    location: 'hero_section',
                    conversionType: 'contact_form',
                    label: 'start_discussion_cta',
                  })
                }
                className="ritovex-hero__primary-button"
              >
                <span className="ritovex-hero__primary-button-inner">
                  <span className="ritovex-hero__button-text-wrap" aria-hidden="true">
                    <span className="ritovex-hero__button-text">Let’s Connect</span>
                    <span className="ritovex-hero__button-text ritovex-hero__button-text--absolute">
                      Let’s Connect
                    </span>
                  </span>
                  <span className="sr-only">Let’s Connect</span>
                </span>
              </a>

              <a
                href="/work"
                className="ritovex-hero__video-button"
              >
                <span className="ritovex-hero__video-button-wrap" aria-hidden="true">
                  <ArrowUpRight className="ritovex-hero__video-button-icon" strokeWidth={2.4} />
                </span>
                <span className="ritovex-hero__video-button-text">Case Studies</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeOut }}
            className="ritovex-hero__image-wrapper"
          >
            <motion.img
              src={bannerImage}
              alt="Abu Rahat Sabir"
              width={631}
              height={590}
              fetchPriority="high"
              loading="eager"
              initial={{ scale: 1.045 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.05, delay: 0.15, ease: easeOut }}
              className="ritovex-hero__image"
            />
            <div className="ritovex-hero__image-overlay" aria-hidden="true">
              <motion.div
                initial={{ y: '0%' }}
                animate={{ y: '-102%' }}
                transition={{ duration: 0.85, delay: 0.35, ease: easeOut }}
                className="ritovex-hero__image-overlay-left"
              />
              <motion.div
                initial={{ y: '0%' }}
                animate={{ y: '102%' }}
                transition={{ duration: 0.85, delay: 0.35, ease: easeOut }}
                className="ritovex-hero__image-overlay-right"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
