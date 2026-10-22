import React from 'react';
import { Bot, Database, LineChart, ShieldCheck, Workflow } from 'lucide-react';
import { PROJECTS } from '../constants';
import './Work.css';

const subtitleLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;

const cardIcons: Record<string, React.ReactNode> = {
  Systems: <Database size={22} strokeWidth={2.2} />,
  Governance: <ShieldCheck size={22} strokeWidth={2.2} />,
  Automation: <Bot size={22} strokeWidth={2.2} />,
  Finance: <LineChart size={22} strokeWidth={2.2} />,
};

const getCardIcon = (category: string) => cardIcons[category] ?? <Workflow size={22} strokeWidth={2.2} />;

const workCardCopy: Record<string, {
  title: string;
  category: string;
  area: string;
  description: string;
  tags: string[];
}> = {
  'fmcg-erp': {
    title: 'Office Operations & Task Coordination',
    category: 'Administration',
    area: 'Workplace Operations',
    description: 'I brought office requests, task assignments, deadlines, and follow-ups into one tracker, making daily priorities visible and outstanding administrative work easier to manage.',
    tags: ['Office Management', 'Administrative Support'],
  },
  mocs: {
    title: 'Vendor Sourcing & Office Procurement',
    category: 'Procurement',
    area: 'Vendor & Facility Management',
    description: 'I organized supplier contacts, service categories, and quotation details in one directory, making vendor comparisons faster and essential office services easier to source and coordinate.',
    tags: ['Vendor Management', 'Procurement'],
  },
  'hr-docs': {
    title: 'Petty Cash & Expense Tracking',
    category: 'Administration',
    area: 'Expense Management',
    description: 'I connected petty cash transactions with vendor histories, expense categories, and supporting records, making office spending easier to trace, verify, and review.',
    tags: ['Expense Tracking', 'Financial Records'],
  },
  'payroll-control': {
    title: 'Executive Reporting & Action Tracking',
    category: 'Assistance',
    area: 'Management Reporting',
    description: 'I consolidated administrative updates, pending approvals, and follow-up actions into clear reports, giving leadership better visibility into priorities, responsibilities, and matters requiring attention.',
    tags: ['Executive Support', 'Management Reporting'],
  },
  'trade-finance': {
    title: 'Office Inventory & Asset Records',
    category: 'Administration',
    area: 'Resource Management',
    description: 'I tracked office equipment, consumables, and stock movements in one register, making inventory records easier to maintain and replenishment needs easier to identify.',
    tags: ['Inventory Management', 'Asset Tracking'],
  },
};

const Work: React.FC = () => {
  return (
    <>
      <section id="work" className="gitlab-built-copy" aria-labelledby="gitlab-built-title">
        <div className="gitlab-built-container">
          <div className="gitlab-built-copy__header">
            <div className="gitlab-built-copy__heading-wrap">
              <div className="gitlab-built-copy__eyebrow-wrap">
                <div className="gitlab-built-copy__eyebrow">
                  <img src={subtitleLogoUrl} loading="lazy" alt="" className="gitlab-built-copy__eyebrow-icon" />
                  <div className="gitlab-built-copy__eyebrow-text">Selected Work</div>
                </div>
              </div>
              <h2 id="gitlab-built-title" className="gitlab-built-copy__title">
                Administration in Action.
              </h2>
              <p className="gitlab-built-copy__description">
                Practical work across executive support, office management, procurement, reporting, and administrative operations.
              </p>
              <div className="gitlab-built-copy__button-wrap">
                <a className="gitlab-built-copy__primary-button" href="#work-cards" aria-label="Explore my work">
                  <span className="gitlab-built-copy__primary-button-inner">
                    <span className="gitlab-built-copy__primary-button-text-wrap">
                      <span className="gitlab-built-copy__primary-button-text-block">Explore My Work</span>
                      <span className="gitlab-built-copy__primary-button-text-block is-text-absolute">Explore My Work</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work-cards" className="gitlab-built-stacking" aria-label="Administration in Action cards">
        <div className="gitlab-built-container">
          <ul className="gitlab-built-stacking__container">
            {PROJECTS.map((project, index) => {
              const copy = workCardCopy[project.id];

              return (
                <li
                  key={project.id}
                  className="gitlab-built-stacking__card"
                  style={{ '--index': index + 1 } as React.CSSProperties}
                >
                  <div className="gitlab-built-stacking__card-left-side">
                    <div>
                      <span className="gitlab-built-icon" aria-hidden="true">
                        {getCardIcon(project.category)}
                      </span>

                      <div className="gitlab-built-work-meta">
                        <span className="gitlab-built-work-pill">{copy.category}</span>
                        <span className="gitlab-built-work-client">{copy.area}</span>
                      </div>

                      <h3
                        className={`gitlab-built-stacking__card-title${copy.title === 'Vendor Sourcing & Office Procurement' ? ' gitlab-built-stacking__card-title--single-line' : ''}`}
                      >
                        {copy.title}
                      </h3>
                      <p className="gitlab-built-stacking__card-description">{copy.description}</p>

                      {copy.tags.length > 0 && (
                        <div className="gitlab-built-work-tags" aria-label="Project tags">
                          {copy.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>

                  <div className="gitlab-built-stacking__card-right-side">
                    <img
                      src={project.image}
                      alt={copy.title}
                      width="800"
                      height="600"
                      loading="lazy"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Work;
