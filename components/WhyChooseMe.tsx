import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, ChartNoAxesCombined, Handshake } from "lucide-react";
import "./WhyChooseMe.css";

const profileLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;

const reasons = [
  {
    title: "Ownership Through Every Task",
    description:
      "I handle urgent requests, resolve obstacles early, and follow administrative tasks through to completion.",
    icon: BadgeCheck,
  },
  {
    title: "Point of Contact for Office Needs",
    description:
      "From vendor management and facilities to staff needs, I keep services responsive and essentials available.",
    icon: Handshake,
  },
  {
    title: "Clear Records, Easier Decisions",
    description:
      "I keep expenses, inventory, and requests visible through accurate records and timely updates.",
    icon: ChartNoAxesCombined,
  },
];

const headingReveal = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const gridReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const WhyChooseMe: React.FC = () => {
  return (
    <section className="why-choose" aria-labelledby="why-choose-title">
      <div className="why-choose__container">
        <motion.div
          variants={headingReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="why-choose__heading"
        >
          <div className="why-choose__eyebrow">
            <img
              src={profileLogoUrl}
              alt=""
              width={14}
              height={14}
              aria-hidden="true"
            />
            <span>Why Choose Me</span>
          </div>

          <h2 id="why-choose-title" className="why-choose__title">
            Why Work With Me.
          </h2>
          <p className="why-choose__description">
            Proactive administrative support that keeps people, resources, and
            deadlines in order.
          </p>
        </motion.div>

        <motion.div
          variants={gridReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          className="why-choose__grid"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <motion.article
                variants={itemReveal}
                className="why-choose__item"
                key={reason.title}
              >
                <Icon
                  className="why-choose__icon"
                  strokeWidth={1.35}
                  aria-hidden="true"
                />
                <h3 className="why-choose__reason-title">{reason.title}</h3>
                <p className="why-choose__reason-description">
                  {reason.description}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseMe;
