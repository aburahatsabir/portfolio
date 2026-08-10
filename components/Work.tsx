import React from 'react';
import { ArrowRight, Bot, Database, LineChart, ShieldCheck, Workflow } from 'lucide-react';
import { PROJECTS } from '../constants';
import { trackProjectClick } from '../utils/analytics';
import { getWorkRoutePath } from '../content/work-route-titles';
import './Work.css';

const subtitleLogoUrl = `${import.meta.env.BASE_URL}favicon-192.png`;

const cardIcons: Record<string, React.ReactNode> = {
  Systems: <Database size={22} strokeWidth={2.2} />,
  Governance: <ShieldCheck size={22} strokeWidth={2.2} />,
  Automation: <Bot size={22} strokeWidth={2.2} />,
  Finance: <LineChart size={22} strokeWidth={2.2} />,
};

const getCardIcon = (category: string) => cardIcons[category] ?? <Workflow size={22} strokeWidth={2.2} />;

const Work: React.FC = () => {
  const openProject = (event: React.MouseEvent<HTMLAnchorElement>, project: (typeof PROJECTS)[number]) => {
    event.preventDefault();

    const projectPath = getWorkRoutePath(project.id) ?? `/work/${project.id}`;

    trackProjectClick({
      projectName: project.title,
      projectCategory: project.category,
    });

    window.history.pushState({}, '', projectPath);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

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
                Built for how you work
              </h2>
              <p className="gitlab-built-copy__description">
                Systems, automation, governance, and finance work built around real operational constraints,
                measurable outcomes, and durable handoff.
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

      <section id="work-cards" className="gitlab-built-stacking" aria-label="Built for how you work cards">
        <div className="gitlab-built-container">
          <ul className="gitlab-built-stacking__container">
            {PROJECTS.map((project, index) => {
              const projectPath = getWorkRoutePath(project.id) ?? `/work/${project.id}`;
              const responsiveImage = project.image.replace('.webp', '');

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
                        <span className="gitlab-built-work-pill">{project.category}</span>
                        <span className="gitlab-built-work-client">{project.client}</span>
                      </div>

                      <h3 className="gitlab-built-stacking__card-title">{project.title}</h3>
                      <p className="gitlab-built-stacking__card-description">{project.description}</p>

                      {project.relevantFor && project.relevantFor.length > 0 && (
                        <div className="gitlab-built-work-tags" aria-label="Relevant audiences">
                          {project.relevantFor.slice(0, 3).map((persona) => (
                            <span key={persona}>{persona}</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <a
                      className="gitlab-built-btn gitlab-built-btn--outline"
                      href={projectPath}
                      onClick={(event) => openProject(event, project)}
                    >
                      <span>{project.impact}</span>
                      <span className="gitlab-built-btn__arrow" aria-hidden="true">
                        <ArrowRight size={16} strokeWidth={2.4} />
                      </span>
                    </a>
                  </div>

                  <div className="gitlab-built-stacking__card-right-side">
                    <img
                      src={project.image}
                      srcSet={`${responsiveImage}-600w.webp 600w, ${responsiveImage}-900w.webp 900w, ${responsiveImage}-1140w.webp 1140w, ${responsiveImage}-1920w.webp 1920w`}
                      sizes="(max-width: 768px) 200px, 600px"
                      alt={project.title}
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
