import React from 'react';
import SocialLinks from './shared/SocialLinks';
import './Footer.css';

const footerLogoUrl = `${import.meta.env.BASE_URL}Blue.png`;

type FooterLink = {
  name: string;
  path: string;
};

type FooterColumnProps = {
  title: string;
  links: FooterLink[];
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="portfolio-footer__column">
    <h4 className="portfolio-footer__heading">{title}</h4>
    <ul className="portfolio-footer__list">
      {links.map((link) => (
        <li key={link.name}>
          <a href={link.path} className="portfolio-footer__link">
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const footerLinks = {
    explore: [
      { name: 'About', path: '/about' },
      { name: 'Work', path: '/work' },
      { name: 'Solutions', path: '/solutions' },
      { name: 'Contact', path: '/contact' },
    ],
    whoThisHelps: [
      { name: 'Executive Assistants', path: '/persona/executive-assistants' },
      { name: 'Operations Leaders', path: '/persona/operations-leaders' },
      { name: 'Founders', path: '/persona/founders' },
      { name: 'Hiring Managers', path: '/persona/hiring-managers' },
    ],
    resources: [
      { name: 'Certifications', path: '/certifications' },
    ],
    evidence: [
      { name: 'Blog', path: '/blog' },
    ],
  };

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer__inner">
        <div className="portfolio-footer__grid">
          <div className="portfolio-footer__brand">
            <a href="/" className="portfolio-footer__brand-link" aria-label="Abu Rahat Sabir home">
              <img src={footerLogoUrl} alt="" width={714} height={630} className="portfolio-footer__logo" />
              <span className="portfolio-footer__wordmark">Rahat</span>
            </a>
          </div>

          <FooterColumn title="Explore" links={footerLinks.explore} />
          <FooterColumn title="Who This Helps" links={footerLinks.whoThisHelps} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
          <FooterColumn title="Evidence" links={footerLinks.evidence} />
        </div>

        <div className="portfolio-footer__bottom">
          <div className="portfolio-footer__copyright-social">
            <p className="portfolio-footer__copyright">&copy; 2026 Abu Rahat Sabir. All rights reserved</p>
            <SocialLinks variant="inline" size="sm" className="portfolio-footer__socials" />
          </div>

          <div className="portfolio-footer__legal">
            <a href="/privacy" className="portfolio-footer__legal-link">
              PRIVACY POLICY
            </a>
            <a href="/cookies" className="portfolio-footer__legal-link">
              COOKIE POLICY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
