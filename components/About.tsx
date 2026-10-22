import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { BriefcaseBusiness, CalendarClock, ChartNoAxesCombined, FileDown, Workflow, type LucideIcon } from 'lucide-react';
import WhyChooseMe from './WhyChooseMe';
import './About.css';


const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className={`profile-about__faq-item${isOpen ? ' active' : ''}`}>
      <button
        type="button"
        onClick={onClick}
        className="profile-about__faq-item-top"
        aria-expanded={isOpen}
      >
        <span className="profile-about__faq-question">{question}</span>
        <span className="profile-about__faq-item-icon" aria-hidden="true">
          <span className="profile-about__faq-item-icon-line-1"></span>
          <span className={`profile-about__faq-item-icon-line-2${isOpen ? ' active' : ''}`}></span>
        </span>
      </button>
      <div className="profile-about__faq-item-bottom">
        <div className="profile-about__faq-item-bottom-wrapper">
          <div>{answer}</div>
        </div>
      </div>
    </div>
  );
};

interface AboutProps {
  showStrategicPillars?: boolean;
}

const revealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};

const profileLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;

type CounterSegment =
  | { type: 'up' | 'down'; digits: string[] }
  | { type: 'static'; value: string };

type ProfileStat = {
  value: string;
  description: string;
  icon?: LucideIcon;
  counterSegments?: CounterSegment[];
};

const makeCounterUpStack = (finalDigit: string) => [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  finalDigit,
  '8',
  '9',
];

const useAboutCardScrollMotion = (targetRef: React.RefObject<HTMLDivElement | null>) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 34,
    mass: 0.2,
  });

  const card1X = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['50%', '50%', '0%', '0%']);
  const card1Y = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['50%', '50%', '0%', '0%']);
  const card2X = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['-50%', '-50%', '0%', '0%']);
  const card2Y = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['50%', '50%', '0%', '0%']);
  const card3X = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['50%', '50%', '0%', '0%']);
  const card3Y = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['-50%', '-50%', '0%', '0%']);
  const card4X = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['-50%', '-50%', '0%', '0%']);
  const card4Y = useTransform(smoothedProgress, [0, 0.2, 0.5, 1], ['-50%', '-50%', '0%', '0%']);

  return [
    { x: card1X, y: card1Y },
    { x: card2X, y: card2Y },
    { x: card3X, y: card3Y },
    { x: card4X, y: card4Y },
  ];
};

const RollingCounter: React.FC<{ label: string; segments: CounterSegment[] }> = ({ label, segments }) => {
  const counterRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const node = counterRef.current;

    if (!node || hasAnimated) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting || entry.intersectionRatio >= 0.15) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <div ref={counterRef} className="profile-about__summary-counter-wrap summery-counter-wrap" aria-label={label}>
      {segments.map((segment, index) => {
        if (segment.type === 'up' || segment.type === 'down') {
          const stackClass = segment.type === 'up' ? '_1' : '_2';

          return (
            <div
              key={`${segment.type}-${index}`}
              className={`profile-about__single-counter-wrap single-counter-wrap ${stackClass}${hasAnimated ? ' is-animated' : ''}`}
            >
              {segment.digits.map((item, digitIndex) => (
                <h3 className="profile-about__number-digit number-digit" key={`${item}-${digitIndex}`} aria-hidden="true">
                  {item}
                </h3>
              ))}
            </div>
          );
        }

        return (
          <h3 className="profile-about__number-digit number-digit" key={`${segment.value}-${index}`} aria-hidden="true">
            {segment.value}
          </h3>
        );
      })}
    </div>
  );
};

const About: React.FC<AboutProps> = ({ showStrategicPillars = true }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const aboutCardsGridRef = useRef<HTMLDivElement | null>(null);
  const aboutCardScrollMotion = useAboutCardScrollMotion(aboutCardsGridRef);

  const faqs = [
    {
      question: "Do you handle both executive assistance and office administration?",
      answer: "Yes. I connect the two, supporting leadership priorities while managing the daily office operations, facilities, and coordination that keep the business running."
    },
    {
      question: "How do you manage competing priorities?",
      answer: "I weigh urgency, business impact, and deadlines, then set clear owners and next steps, so critical work keeps moving without dropping ongoing commitments."
    },
    {
      question: "How do you improve inefficient processes?",
      answer: "I find the bottleneck, remove unnecessary steps, and build simple workflows that cut manual effort, make ownership clear, and stop the same issue from returning."
    },
    {
      question: "What tools do you use to manage operations?",
      answer: "I use Microsoft Excel and Google Sheets for tracking, dashboards, and reporting, alongside AI for documentation, analysis, and workflow support."
    },
    {
      question: "How do you approach cost and resource management?",
      answer: "I monitor expenses, resource usage, and vendor performance while planning ahead to reduce avoidable costs without compromising service quality."
    }
  ];

  const profileStats: ProfileStat[] = [
    {
      value: '7+',
      counterSegments: [
        { type: 'up' as const, digits: makeCounterUpStack('7') },
        { type: 'static' as const, value: '+' },
      ],
      description: 'Years of Professional Experience',
      icon: CalendarClock,
    },
    {
      value: 'Executive Support',
      description: 'Leadership & Admin Support',
      icon: BriefcaseBusiness,
    },
    {
      value: 'Office Operations',
      description: 'People, Processes & Workplace Management',
      icon: Workflow,
    },
    {
      value: 'Process Improvement',
      description: 'Reporting, Systems & Automation',
      icon: ChartNoAxesCombined,
    },
  ];

  return (
    <section id="about" className="bg-white relative">
      <div className="profile-about">
        <div className="profile-about__container">
          <motion.div
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="profile-about__title-wrapper"
          >
            <div className="profile-about__subtitle-wrap">
              <div className="profile-about__subtitle-single">
                <img src={profileLogoUrl} alt="" width={14} height={14} className="profile-about__subtitle-icon" aria-hidden="true" />
                <div className="profile-about__subtitle">About Me</div>
              </div>
            </div>
            <h2 className="profile-about__title">How I Work. What I Keep Running</h2>
            <p className="profile-about__description">
              I identify what slows teams down, improve the process behind it, and document practical
              solutions, so executive support, office administration, and reporting stay consistent
              without constant follow-up.
            </p>
          </motion.div>

          <div className="profile-about__content">
            <motion.div
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="profile-about__image-wrapper"
            >
              <motion.img
                src="./images/hero/Abu Rahat Hero 02.webp"
                alt="Abu Rahat Sabir"
                width={584}
                height={516}
                loading="lazy"
                initial={{ scale: 1.04 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.05, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="profile-about__image"
              />
              <div className="profile-about__image-overlay" aria-hidden="true">
                <motion.div
                  initial={{ y: '0%' }}
                  whileInView={{ y: '-102%' }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="profile-about__image-overlay-left"
                />
                <motion.div
                  initial={{ y: '0%' }}
                  whileInView={{ y: '102%' }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="profile-about__image-overlay-right"
                />
              </div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="profile-about__typography"
            >
              <div className="profile-about__top-content">
                <div ref={aboutCardsGridRef} className="profile-about__top-grid about-us-top-grid">
                  {profileStats.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.description}
                        style={aboutCardScrollMotion[index]}
                        className={`profile-about__card about-us-card _0${index + 1}`}
                      >
                        {Icon && (
                          <div className="profile-about__card-icon-wrap" aria-hidden="true">
                            <Icon size={48} strokeWidth={1.6} className="profile-about__card-icon" />
                          </div>
                        )}
                        <div className="profile-about__card-typography">
                          <div className={`profile-about__card-counter-wrap${item.counterSegments ? '' : ' profile-about__card-counter-wrap--title'}`}>
                            {item.counterSegments ? (
                              <RollingCounter label={item.value} segments={item.counterSegments} />
                            ) : (
                              <h3 className="profile-about__card-title">{item.value}</h3>
                            )}
                          </div>
                          <p className="profile-about__card-description">{item.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div variants={revealVariants} className="profile-about__bottom-content">
                <a href="/about" className="profile-about__primary-button">
                  <span className="profile-about__primary-button-inner">
                    <span className="profile-about__primary-button-text-wrap" aria-hidden="true">
                      <span className="profile-about__primary-button-text">More About Me</span>
                      <span className="profile-about__primary-button-text profile-about__primary-button-text--absolute">More About Me</span>
                    </span>
                    <span className="sr-only">More About Me</span>
                  </span>
                </a>

                <a
                  href="/AbuRahatSabir-Resume.pdf"
                  download="Abu-Rahat-Sabir-Resume.pdf"
                  aria-label="Download Abu Rahat Sabir's resume as a PDF"
                  className="profile-about__contact-link"
                >
                  <span className="profile-about__contact-icon-wrap" aria-hidden="true">
                    <FileDown className="profile-about__contact-icon" strokeWidth={1.9} />
                  </span>
                  <span className="profile-about__contact-title-number">
                    <span className="profile-about__contact-title">Resume</span>
                    <span className="profile-about__contact-number">Download Resume</span>
                  </span>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <WhyChooseMe />

      <div className="profile-about__container">
        {/* Easton-style FAQ Section */}
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="profile-about__faq-section"
        >
          <div className="profile-about__faq-content">
            <div className="profile-about__faq-left">
              <div className="profile-about__faq-title">Questions &amp; Answers</div>
              <div className="profile-about__faq-intro">
                Straight answers about my expertise, how I work, and how I keep administrative operations running well.
              </div>
            </div>

            <div className="profile-about__faq-right">
              {faqs.map((faq, idx) => (
                <FAQItem
                  key={idx}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === idx}
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Structural Animation Definitions */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
};

export default About;
