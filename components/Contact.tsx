import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from './shared/Button';
import SocialLinks from './shared/SocialLinks';
import { trackEmailClick, trackContactCTA, trackFormSubmission } from '../utils/analytics';


const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration
      const serviceId = 'service_u2no92e';
      const templateId = 'template_e1t0cjg';
      const publicKey = 'OKdOWC7hUfHp8O3Un';

      // Send email using EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        publicKey
      );

      console.log('✅ EmailJS Success:', result);

      // Track form submission
      trackFormSubmission({
        formType: 'contact',
        role: undefined,
        challenge: undefined,
        timeline: undefined
      });

      setIsSent(true);

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error('❌ EmailJS Error:', error);
      alert('Failed to send message. Please try again or email directly at aburahatsabir178@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/aburahatsabir78',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      url: 'https://github.com/aburahatsabir',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      )
    },
    {
      name: 'X',
      url: 'https://x.com/AbuRahatsabir',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/aburahat.sabir/',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/aburahatsabir.178',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-12">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-blue-600 mb-6">Engagement Protocol</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 leading-tight">Let's discuss <br />your <span className="text-blue-600">next move.</span></h3>
            <p className="text-xl text-slate-600 mb-12 leading-relaxed">
              Whether you need to streamline operations or build reliable systems, I'm here to help you work smarter.
              Direct consultation for organizations scaling beyond manual capabilities.
            </p>
          </div>

          <div className="grid gap-6">
            <a
              href="mailto:aburahatsabir178@gmail.com"
              onClick={() => trackEmailClick({ source: 'contact_page', emailType: 'primary' })}
              className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group"
            >

              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</p>
                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">aburahatsabir178@gmail.com</p>
              </div>
            </a>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+8801317874581"
                onClick={() => trackContactCTA({ location: 'contact_page', conversionType: 'email_click', label: 'phone_click' })}
                className="flex-1 flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group"
              >

                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone</p>
                  <p className="font-bold text-slate-900">+880 1317-874581</p>
                </div>
              </a>
              <a
                href="https://wa.me/8801946734566"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactCTA({
                  location: 'contact_page',
                  conversionType: 'email_click',
                  label: 'whatsapp_click'
                })}
                className="flex-1 flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group"
              >

                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">WhatsApp</p>
                  <p className="font-bold text-slate-900">+880 1946-734566</p>
                </div>
              </a>
            </div>

            <div className="flex gap-6 p-6 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Location</p>
                <p className="font-bold text-slate-900">Gulshan, Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Connect with me</p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-[1.25rem] bg-[#f8fafc] border border-[#f1f5f9] flex items-center justify-center text-slate-600 hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm group"
                  title={link.name}
                >
                  <div className="transition-transform group-hover:scale-110">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden min-h-[600px] flex flex-col">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-8">
              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Secure Channel</div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">ENGAGEMENT_FORM // INFRA_V1</span>
            </div>

            <AnimatePresence mode="wait">
              {isSent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
                >
                  <div className="w-24 h-24 bg-emerald-500/20 text-emerald-500 rounded-[2.5rem] flex items-center justify-center border border-emerald-500/30">
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-3xl font-black">Transmission Received.</h4>
                    <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                      Your inquiry has been successfully logged into our governance queue. A tactical response will be initiated within 24 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-8 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 flex-1"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Identity</label>
                      <input
                        id="contact-name"
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-6 py-5 rounded-2xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="e.g. David Richardson"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Strategic Email</label>
                      <input
                        id="contact-email"
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-5 rounded-2xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                        placeholder="david@enterprise.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact-subject" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Subject / Audit Scope</label>
                    <input
                      id="contact-subject"
                      required
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-6 py-5 rounded-2xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600"
                      placeholder="e.g. Workflow Automation Inquiry"
                    />
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col">
                    <label htmlFor="contact-message" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Inquiry Telemetry / Message</label>
                    <textarea
                      id="contact-message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full flex-1 px-6 py-5 rounded-2xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 resize-none"
                      placeholder="Detail your organizational friction points..."
                    />
                  </div>

                  <div className="pt-8 mt-auto border-t border-slate-800 flex gap-4">
                    <Button
                      variant="accent"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                      loading={isSubmitting}
                      className="flex-1"
                    >
                      Initialize Discovery Session
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
