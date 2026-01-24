
import React from 'react';
import SocialLinks from './shared/SocialLinks';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    core: [
      { name: 'About Sabir', path: '#/about' },
      { name: 'Portfolio / Work', path: '#/work' },
      { name: 'Contact & Briefing', path: '#/contact' },
    ],
    personas: [
      { name: 'Executive Assistants', path: '#/persona/executive-assistants' },
      { name: 'Operations Leaders', path: '#/persona/operations-leaders' },
      { name: 'Founders & CEOs', path: '#/persona/founders' },
      { name: 'Hiring Managers', path: '#/persona/hiring-managers' },
    ],
    solutions: [
      { name: 'Operational Solutions', path: '#/solutions' },
      { name: 'Systems Audit', path: '#/diagnostic' },
    ],
    governance: [
      { name: 'Reliability Standards', path: '#/governance' },
      { name: 'Documentation Wiki', path: '#/governance' },
    ],
    proof: [
      { name: 'Success Stories', path: '#/success-stories' },
      { name: 'System Post-Mortems', path: '#/post-mortems' },
      { name: 'Insights / Blog', path: '#/blog' },
    ]
  };

  return (
    <footer className="bg-white border-t border-slate-100 pt-32 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
          <div className="lg:col-span-1 space-y-8">
            <div className="flex flex-col gap-4">
              <a href="#/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black group-hover:bg-blue-600 transition-colors shadow-lg">AR</div>
                <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">ABU RAHAT SABIR</span>
              </a>
              <p className="text-slate-500 leading-relaxed text-sm font-medium pr-4">
                Executive – Administration & Workflow Automation Specialist based in Gulshan, Dhaka.
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Core Navigation</h5>
            <ul className="space-y-4">
              {footerLinks.core.map(link => (
                <li key={link.name}>
                  <a href={link.path} className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors block py-0.5">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-blue-600 mb-8">Solutions For</h5>
            <ul className="space-y-4">
              {footerLinks.personas.map(link => (
                <li key={link.name}>
                  <a href={link.path} className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors block py-0.5">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Solutions</h5>
            <ul className="space-y-4">
              {footerLinks.solutions.map(link => (
                <li key={link.name}>
                  <a href={link.path} className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors block py-0.5">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Governance</h5>
            <ul className="space-y-4">
              {footerLinks.governance.map(link => (
                <li key={link.name}>
                  <a href={link.path} className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors block py-0.5">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-black text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-8">Proof</h5>
            <ul className="space-y-4">
              {footerLinks.proof.map(link => (
                <li key={link.name}>
                  <a href={link.path} className="text-slate-600 hover:text-blue-600 font-bold text-sm transition-colors block py-0.5">{link.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row gap-6 items-center text-center md:text-left">
            <p>© {currentYear} Abu Rahat Sabir</p>
            <SocialLinks variant="inline" size="sm" className="text-slate-400" />
          </div>

          <div className="flex gap-8 items-center">
            <a href="#/privacy" className="hover:text-blue-600 transition-colors">Privacy Protocol</a>
            <a href="#/cookies" className="hover:text-blue-600 transition-colors">Cookie Audit</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
