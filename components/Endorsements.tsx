import React from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS } from "../content";
import { Testimonial } from "../types";
import "./Endorsements.css";

const subtitleLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;

const revealVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => (
  <article className="testimonial-card">
    <div className="testimonial-card-body">
      <div className="testimonial-card-layout">
        <div className="testimonial-card-author-wrapper">
          <div className="testimonial-card-author-image-wrapper">
            <img
              src={testimonial.avatar}
              loading="lazy"
              alt={testimonial.name}
              className="testimonial-card-author-image"
            />
          </div>
          <div className="testimonial-card-author-name-bio-wrapper">
            <h3 className="testimonial-card-author-name">{testimonial.name}</h3>
            <p className="testimonial-card-author-bio">
              {testimonial.position}
            </p>
          </div>
        </div>

        <blockquote className="testimonial-card-quote">
          <p>{testimonial.content}</p>
        </blockquote>
      </div>
    </div>

    {testimonial.linkedInProfile && (
      <a
        href={testimonial.linkedInProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="testimonial-card-link"
        aria-label={`View ${testimonial.name}'s LinkedIn profile`}
      />
    )}
  </article>
);

const TickerSet: React.FC<{ copyIndex: number }> = ({ copyIndex }) => (
  <div className="testimonial-inner-ticker-wrapper" aria-hidden={copyIndex > 0}>
    {TESTIMONIALS.map((testimonial) => (
      <TestimonialCard
        key={`${copyIndex}-${testimonial.name}`}
        testimonial={testimonial}
      />
    ))}
  </div>
);

const Endorsements: React.FC = () => {
  return (
    <section
      id="endorsements"
      className="section testimonial endorsements-testimonial"
    >
      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="testimonial-top-content"
      >
        <div className="container">
          <div className="section-title-wrapper">
            <div className="section-subtitle-wrap">
              <div className="section-subtitle-single">
                <img
                  src={subtitleLogoUrl}
                  loading="lazy"
                  alt=""
                  className="section-subtitle-icon"
                />
                <div className="section-subtitle">Professional Feedback</div>
              </div>
            </div>
            <h2 className="section-title">What Leaders Say</h2>
            <p className="section-description about-us">
              Behind every well-run office are priorities, decisions, and details that matter. Hear from the people who relied on me.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={revealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="testimonial-bottom-content"
      >
        <div className="testimonial-ticker">
          <div className="ticker-testimonial">
            <TickerSet copyIndex={0} />
            <TickerSet copyIndex={1} />
            <TickerSet copyIndex={2} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Endorsements;
