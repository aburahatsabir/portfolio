import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import './ExperienceTimeline.css';

const profileLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;

const revealVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08,
        },
    },
};

const experienceRecords = [
    {
        role: 'Executive Administration & Operations',
        company: 'Prominent Tec',
        period: '2024 – Present',
        summary: 'Connecting leadership priorities with daily operations and reporting, so administrative work stays organized and decisions are never delayed.',
        focus: ['Executive Support', 'Vendor Coordination', 'Reporting'],
        mark: 'PT',
        color: '#316ff6',
        current: true,
    },
    {
        role: 'Program Coordination & Support',
        company: 'Dreams IT Park',
        period: '2022 – 2023',
        summary: 'Kept training programs on track by coordinating resources, guiding participants, and preparing everything before each session.',
        focus: ['Program Coordination', 'Participant Guidance', 'Resource Readiness'],
        mark: 'D',
        color: '#f36f3d',
        current: false,
    },
    {
        role: 'Lab Operations & Asset Coordination',
        company: 'I-Con Computer Institute',
        period: '2019 – 2021',
        summary: 'Kept computer labs ready every day through equipment management, software setup, and organized asset records.',
        focus: ['Lab Management', 'Asset Tracking', 'Learner Support'],
        mark: 'I',
        color: '#161616',
        current: false,
    },
];

const ExperienceTimeline: React.FC = () => {
    return (
        <section id="experience" className="ritovex-experience">
            <div className="ritovex-experience__container">
                <div className="ritovex-experience__layout">
                    <motion.div
                        variants={revealVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-10%' }}
                        className="ritovex-experience__title-wrapper"
                    >
                        <div className="ritovex-experience__subtitle-wrap">
                            <div className="ritovex-experience__subtitle-single">
                                <img src={profileLogoUrl} alt="" width={14} height={14} className="ritovex-experience__subtitle-icon" aria-hidden="true" />
                                <div className="ritovex-experience__subtitle">Work Experience</div>
                            </div>
                        </div>
                        <h2 className="ritovex-experience__title">Operations Experience</h2>
                        <p className="ritovex-experience__description">
                            A closer look at the roles where I’ve strengthened coordination, streamlined operations, and helped teams move forward.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-10%' }}
                        className="ritovex-experience__timeline-panel"
                    >
                        <h3 className="ritovex-experience__timeline-title">Where I’ve Worked.</h3>

                        <div className="ritovex-experience__timeline">
                            {experienceRecords.map((record) => (
                                <motion.article
                                    variants={revealVariants}
                                    key={`${record.company}-${record.role}`}
                                    className={`ritovex-experience__record${record.current ? ' ritovex-experience__record--current' : ''}`}
                                >
                                    <div
                                        className="ritovex-experience__company-mark"
                                        style={{ '--company-color': record.color } as React.CSSProperties}
                                        aria-hidden="true"
                                    >
                                        {record.mark}
                                    </div>

                                    <div className="ritovex-experience__record-body">
                                        <p className="ritovex-experience__company">{record.company}</p>

                                        <div className="ritovex-experience__role-block">
                                            <div className="ritovex-experience__role-heading">
                                                <h4 className="ritovex-experience__role">{record.role}</h4>
                                                <BadgeCheck className="ritovex-experience__verified" strokeWidth={2.2} aria-hidden="true" />
                                            </div>

                                            <p className="ritovex-experience__meta">
                                                <strong>{record.period}</strong>
                                                {record.focus.map((item) => (
                                                    <React.Fragment key={item}>
                                                        <span aria-hidden="true">•</span>
                                                        {item}
                                                    </React.Fragment>
                                                ))}
                                            </p>

                                            <p className="ritovex-experience__summary">{record.summary}</p>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceTimeline;
