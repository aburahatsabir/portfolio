
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from './shared/Button';
import { trackFormSubmission } from '../utils/analytics';

interface ContactFormData {
    name: string;
    email: string;
    role: string;
    challenge: string;
    timeline: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        role: '',
        challenge: '',
        timeline: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errors, setErrors] = useState<Partial<ContactFormData>>({});

    const roles = [
        { value: '', label: 'Select your role...' },
        { value: 'executive-assistant', label: 'Executive Assistant' },
        { value: 'finance-leader', label: 'Finance Leader' },
        { value: 'founder', label: 'Founder / CEO' },
        { value: 'hiring-manager', label: 'Hiring Manager' },
        { value: 'operations', label: 'Operations Manager' },
        { value: 'other', label: 'Other' }
    ];

    const challenges = [
        { value: '', label: 'Select primary challenge...' },
        { value: 'month-end-close', label: 'Month-end Close Process' },
        { value: 'manual-tasks', label: 'Manual Repetitive Tasks' },
        { value: 'systems-integration', label: 'Systems Integration' },
        { value: 'governance', label: 'Governance & Compliance' },
        { value: 'scaling', label: 'Scaling Operations' },
        { value: 'hiring', label: 'Hiring & Team Building' },
        { value: 'other', label: 'Other Challenge' }
    ];

    const timelines = [
        { value: '', label: 'Select timeline...' },
        { value: 'asap', label: 'ASAP (Urgent)' },
        { value: '30-days', label: 'Within 30 Days' },
        { value: 'q2', label: 'Planning for Q2' },
        { value: 'exploring', label: 'Just Exploring' }
    ];

    const validateForm = (): boolean => {
        const newErrors: Partial<ContactFormData> = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.role) newErrors.role = 'Please select your role';
        if (!formData.challenge) newErrors.challenge = 'Please select a challenge';
        if (!formData.timeline) newErrors.timeline = 'Please select a timeline';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;


        setIsSubmitting(true);

        try {
            // EmailJS configuration from environment variables
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            // Validate environment variables are configured
            if (!serviceId || !templateId || !publicKey) {
                console.error('EmailJS configuration missing. Please check environment variables.');
                alert('Email service is not properly configured. Please contact the administrator.');
                return;
            }

            // Prepare template parameters
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                name: formData.name,
                email: formData.email,
                subject: `Portfolio Contact: ${formData.name} - ${formData.role}`,
                role: formData.role,
                challenge: formData.challenge,
                timeline: formData.timeline,
                message: formData.message || 'No additional message'
            };

            // Send email using EmailJS
            await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );


            // Track successful form submission
            trackFormSubmission({
                formType: 'qualification',
                role: formData.role,
                challenge: formData.challenge,
                timeline: formData.timeline
            });

            // Show success message
            setIsSent(true);
            setFormData({ name: '', email: '', role: '', challenge: '', timeline: '', message: '' });
            setErrors({});
            setTimeout(() => setIsSent(false), 5000);

        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Please try again or email directly at aburahatsabir178@gmail.com');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) {
            setErrors({ ...errors, [field]: undefined });
        }
    };

    return (
        <div className="bg-slate-900 text-white rounded-[3.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden min-h-[700px] flex flex-col">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-12 border-b border-slate-800 pb-8">
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Lead Qualification</div>
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">CONTACT_FORM // V2</span>
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
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-3xl font-black">Message Sent Successfully.</h4>
                                <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
                                    Your inquiry has been received. I'll respond within 24 hours based on your timeline.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsSent(false)}
                                className="px-8 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all"
                            >
                                Submit Another Inquiry
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            onSubmit={handleSubmit}
                            className="space-y-8 flex-1 flex flex-col"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="qual-name" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                                        Full Name *
                                    </label>
                                    <input
                                        id="qual-name"
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        className={`w-full px-6 py-5 rounded-2xl bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-700'} focus:border-blue-500 outline-none transition-all placeholder:text-slate-600`}
                                        placeholder="e.g. Sarah Chen"
                                        aria-invalid={!!errors.name}
                                        aria-describedby={errors.name ? 'qual-name-error' : undefined}
                                    />
                                    {errors.name && (
                                        <p id="qual-name-error" className="text-red-400 text-xs ml-2" role="alert">{errors.name}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="qual-email" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                                        Email Address *
                                    </label>
                                    <input
                                        id="qual-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        className={`w-full px-6 py-5 rounded-2xl bg-slate-800 border ${errors.email ? 'border-red-500' : 'border-slate-700'} focus:border-blue-500 outline-none transition-all placeholder:text-slate-600`}
                                        placeholder="sarah@company.com"
                                        aria-invalid={!!errors.email}
                                        aria-describedby={errors.email ? 'qual-email-error' : undefined}
                                    />
                                    {errors.email && (
                                        <p id="qual-email-error" className="text-red-400 text-xs ml-2" role="alert">{errors.email}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="qual-role" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                                    Your Role *
                                </label>
                                <select
                                    id="qual-role"
                                    value={formData.role}
                                    onChange={(e) => handleChange('role', e.target.value)}
                                    className={`w-full px-6 py-5 rounded-2xl bg-slate-800 border ${errors.role ? 'border-red-500' : 'border-slate-700'} focus:border-blue-500 outline-none transition-all text-white`}
                                    aria-invalid={!!errors.role}
                                    aria-describedby={errors.role ? 'qual-role-error' : undefined}
                                >
                                    {roles.map(role => (
                                        <option key={role.value} value={role.value} disabled={!role.value}>
                                            {role.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.role && (
                                    <p id="qual-role-error" className="text-red-400 text-xs ml-2" role="alert">{errors.role}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="qual-challenge" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                                    Primary Challenge *
                                </label>
                                <select
                                    id="qual-challenge"
                                    value={formData.challenge}
                                    onChange={(e) => handleChange('challenge', e.target.value)}
                                    className={`w-full px-6 py-5 rounded-2xl bg-slate-800 border ${errors.challenge ? 'border-red-500' : 'border-slate-700'} focus:border-blue-500 outline-none transition-all text-white`}
                                    aria-invalid={!!errors.challenge}
                                    aria-describedby={errors.challenge ? 'qual-challenge-error' : undefined}
                                >
                                    {challenges.map(challenge => (
                                        <option key={challenge.value} value={challenge.value} disabled={!challenge.value}>
                                            {challenge.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.challenge && (
                                    <p id="qual-challenge-error" className="text-red-400 text-xs ml-2" role="alert">{errors.challenge}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="qual-timeline" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                                    Timeline *
                                </label>
                                <select
                                    id="qual-timeline"
                                    value={formData.timeline}
                                    onChange={(e) => handleChange('timeline', e.target.value)}
                                    className={`w-full px-6 py-5 rounded-2xl bg-slate-800 border ${errors.timeline ? 'border-red-500' : 'border-slate-700'} focus:border-blue-500 outline-none transition-all text-white`}
                                    aria-invalid={!!errors.timeline}
                                    aria-describedby={errors.timeline ? 'qual-timeline-error' : undefined}
                                >
                                    {timelines.map(timeline => (
                                        <option key={timeline.value} value={timeline.value} disabled={!timeline.value}>
                                            {timeline.label}
                                        </option>
                                    ))}
                                </select>
                                {errors.timeline && (
                                    <p id="qual-timeline-error" className="text-red-400 text-xs ml-2" role="alert">{errors.timeline}</p>
                                )}
                            </div>

                            <div className="space-y-2 flex-1 flex flex-col">
                                <label htmlFor="qual-message" className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">
                                    Additional Context (Optional)
                                </label>
                                <textarea
                                    id="qual-message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    className="w-full flex-1 px-6 py-5 rounded-2xl bg-slate-800 border border-slate-700 focus:border-blue-500 outline-none transition-all placeholder:text-slate-600 resize-none"
                                    placeholder="Tell us more about your specific needs..."
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
                                    {isSubmitting ? 'Sending...' : 'Submit Qualification Form'}
                                    <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ContactForm;
