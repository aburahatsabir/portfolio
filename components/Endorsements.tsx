import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../content';
import { Testimonial } from '../types';
import './Endorsements.css';

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

const ReviewStar: React.FC<{ muted?: boolean }> = ({ muted = false }) => (
  <svg
    width={muted ? 17 : 18}
    height={muted ? 16 : 17}
    viewBox={muted ? '0 0 17 16' : '0 0 18 17'}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="testimonial-card-review-icon"
    aria-hidden="true"
  >
    {muted ? (
      <path d="M7.939 0.245745C7.97552 0.171962 8.03193 0.109855 8.10188 0.0664324C8.17182 0.0230097 8.25251 0 8.33483 0C8.41716 0 8.49785 0.0230097 8.56779 0.0664324C8.63773 0.109855 8.69415 0.171962 8.73067 0.245745L10.6557 4.14491C10.7825 4.40155 10.9697 4.62359 11.2012 4.79196C11.4327 4.96033 11.7016 5.07001 11.9848 5.11158L16.2898 5.74158C16.3714 5.7534 16.448 5.7878 16.5111 5.84091C16.5741 5.89402 16.621 5.9637 16.6465 6.04208C16.672 6.12047 16.6751 6.20442 16.6553 6.28444C16.6356 6.36447 16.5938 6.43737 16.5348 6.49491L13.4215 9.52658C13.2162 9.72666 13.0626 9.97365 12.9739 10.2463C12.8852 10.5189 12.8641 10.809 12.9123 11.0916L13.6473 15.3749C13.6617 15.4564 13.6529 15.5404 13.6219 15.6171C13.5909 15.6939 13.5389 15.7604 13.472 15.8091C13.405 15.8577 13.3256 15.8866 13.2431 15.8923C13.1605 15.8981 13.0779 15.8805 13.0048 15.8416L9.1565 13.8182C8.90293 13.6851 8.62082 13.6155 8.33442 13.6155C8.04802 13.6155 7.7659 13.6851 7.51233 13.8182L3.66483 15.8416C3.59178 15.8803 3.50933 15.8977 3.42688 15.8918C3.34442 15.8859 3.26527 15.857 3.19841 15.8084C3.13156 15.7598 3.07969 15.6934 3.04871 15.6168C3.01773 15.5401 3.00888 15.4563 3.02317 15.3749L3.75733 11.0924C3.80583 10.8097 3.78482 10.5194 3.69611 10.2466C3.60741 9.97382 3.45367 9.72671 3.24817 9.52658L0.134833 6.49575C0.075328 6.43827 0.0331608 6.36524 0.0131351 6.28497C-0.00689053 6.20471 -0.00396948 6.12043 0.0215654 6.04174C0.0471003 5.96305 0.0942223 5.89311 0.157564 5.8399C0.220905 5.78668 0.297919 5.75233 0.379833 5.74074L4.684 5.11158C4.96755 5.07033 5.23682 4.96079 5.46865 4.7924C5.70048 4.62401 5.88792 4.4018 6.01483 4.14491L7.939 0.245745Z" fill="#D2D2D4" />
    ) : (
      <path d="M8.60416 0.912737C8.64068 0.838954 8.69709 0.776847 8.76704 0.733425C8.83698 0.690002 8.91767 0.666992 8.99999 0.666992C9.08232 0.666992 9.16301 0.690002 9.23295 0.733425C9.30289 0.776847 9.35931 0.838954 9.39583 0.912737L11.3208 4.8119C11.4476 5.06854 11.6348 5.29058 11.8663 5.45895C12.0979 5.62732 12.3668 5.737 12.65 5.77857L16.955 6.40857C17.0366 6.42039 17.1132 6.4548 17.1762 6.5079C17.2393 6.56101 17.2862 6.63069 17.3117 6.70908C17.3372 6.78746 17.3402 6.87141 17.3205 6.95143C17.3007 7.03146 17.259 7.10436 17.2 7.1619L14.0867 10.1936C13.8813 10.3937 13.7277 10.6406 13.639 10.9133C13.5503 11.1859 13.5292 11.476 13.5775 11.7586L14.3125 16.0419C14.3269 16.1234 14.3181 16.2074 14.2871 16.2841C14.2561 16.3609 14.2041 16.4274 14.1371 16.4761C14.0701 16.5247 13.9908 16.5536 13.9082 16.5593C13.8256 16.5651 13.7431 16.5475 13.67 16.5086L9.82166 14.4852C9.56809 14.3521 9.28598 14.2825 8.99958 14.2825C8.71318 14.2825 8.43106 14.3521 8.17749 14.4852L4.32999 16.5086C4.25694 16.5472 4.17449 16.5646 4.09204 16.5588C4.00958 16.5529 3.93043 16.524 3.86357 16.4754C3.79672 16.4268 3.74485 16.3604 3.71387 16.2838C3.68289 16.2071 3.67404 16.1233 3.68833 16.0419L4.42249 11.7594C4.47099 11.4767 4.44998 11.1864 4.36128 10.9136C4.27257 10.6408 4.11883 10.3937 3.91333 10.1936L0.799994 7.16274C0.740489 7.10526 0.698322 7.03223 0.678296 6.95197C0.658271 6.8717 0.661192 6.78742 0.686727 6.70873C0.712261 6.63004 0.759383 6.56011 0.822725 6.50689C0.886066 6.45367 0.96308 6.41932 1.04499 6.40774L5.34916 5.77857C5.63271 5.73732 5.90199 5.62779 6.13381 5.45939C6.36564 5.291 6.55308 5.0688 6.67999 4.8119L8.60416 0.912737Z" fill="#141414" />
    )}
  </svg>
);

const ReviewRow: React.FC<{ index: number }> = ({ index }) => {
  const mutedLastStar = index === 0 || index === 3;

  return (
    <div className="testimonial-card-review-wrapper" aria-label={mutedLastStar ? '4 out of 5 stars' : '5 out of 5 stars'}>
      <ReviewStar />
      <ReviewStar />
      <ReviewStar />
      <ReviewStar />
      <ReviewStar muted={mutedLastStar} />
    </div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial; index: number }> = ({ testimonial, index }) => (
  <article className="testimonial-card">
    <ReviewRow index={index} />

    <div className="testimonial-card-description-wrapper">
      <p className="testimonial-card-description-text">{testimonial.content}</p>
    </div>

    <div className="testimonial-card-author-wrapper">
      <div className="testimonial-card-author-image-wrapper">
        <img src={testimonial.avatar} loading="lazy" alt={testimonial.name} className="testimonial-card-author-image" />
      </div>
      <div className="testimonial-card-author-name-bio-wrapper">
        {testimonial.linkedInProfile ? (
          <a href={testimonial.linkedInProfile} target="_blank" rel="noopener noreferrer" className="testimonial-card-author-name">
            {testimonial.name}
          </a>
        ) : (
          <h6 className="testimonial-card-author-name">{testimonial.name}</h6>
        )}
        {testimonial.companyLinkedIn ? (
          <a href={testimonial.companyLinkedIn} target="_blank" rel="noopener noreferrer" className="testimonial-card-author-bio">
            {testimonial.position}
          </a>
        ) : (
          <div className="testimonial-card-author-bio">{testimonial.position}</div>
        )}
      </div>
    </div>
  </article>
);

const TickerSet: React.FC<{ copyIndex: number }> = ({ copyIndex }) => (
  <div className="testimonial-inner-ticker-wrapper" aria-hidden={copyIndex > 0}>
    {TESTIMONIALS.map((testimonial, index) => (
      <TestimonialCard key={`${copyIndex}-${testimonial.name}`} testimonial={testimonial} index={index} />
    ))}
  </div>
);

const Endorsements: React.FC = () => {
  return (
    <section id="endorsements" className="section testimonial endorsements-testimonial">
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
                <img src={subtitleLogoUrl} loading="lazy" alt="" className="section-subtitle-icon" />
                <div className="section-subtitle">Testimonial</div>
              </div>
            </div>
            <h2 className="section-title">What My Clients are Saying</h2>
            <p className="section-description about-us">
              Hear directly from my clients about their experiences and the results I've delivered. Explore Client Feedback
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
