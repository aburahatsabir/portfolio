import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { trackFormSubmission, trackCustomEvent } from '../utils/analytics';
import { resolveEmailJsConfig } from '../config/contact-env.js';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

const CONTACT_EMAIL = 'aburahatsabir178@gmail.com';

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [errors, setErrors] = useState<Partial<ContactFormData>>({});
    const [formStarted, setFormStarted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const emailJsConfig = resolveEmailJsConfig(import.meta.env);

    const validateForm = (): boolean => {
        const newErrors: Partial<ContactFormData> = {};
        if (!formData.name.trim()) newErrors.name = 'Required';
        if (!formData.email.trim()) {
            newErrors.email = 'Required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid format';
        }
        if (!formData.subject.trim()) newErrors.subject = 'Required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormStart = () => {
        if (!formStarted) {
            setFormStarted(true);
            trackCustomEvent('form_start', { event_category: 'Conversion Funnel', form_type: 'contact' });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            requestAnimationFrame(() => {
                document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
            });
            return;
        }

        if (!emailJsConfig) {
            setSubmitError(`The secure form is temporarily unavailable. Please email ${CONTACT_EMAIL}.`);
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
            await emailjs.send(emailJsConfig.serviceId, emailJsConfig.templateId, {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message || 'No additional details provided.'
            }, emailJsConfig.publicKey);

            trackFormSubmission({
                formType: 'contact',
                subject: formData.subject
            });

            setIsSent(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSent(false), 6000);
        } catch (error) {
            console.error('Submission failed:', error);
            setSubmitError(`Your message could not be sent. Please try again or email ${CONTACT_EMAIL}.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: undefined });
        if (submitError) setSubmitError(null);
    };

    const formDescriptionIds = [
        !emailJsConfig ? 'contact-form-availability' : null,
        submitError ? 'contact-submit-error' : null,
    ].filter(Boolean).join(' ') || undefined;

    return (
        <div className="bg-white border border-slate-200/60 rounded-2xl p-8 executive-shadow relative overflow-hidden noise-bg">
            {/* Architectural Background Atmospherics */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/50 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-50 blur-[80px] rounded-full pointer-events-none" />

            <div className="relative z-10">
                <AnimatePresence mode="wait">
                    {isSent ? (
                        <motion.div
                            key="sent"
                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -10 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col items-center justify-center text-center py-20 px-6"
                            role="status"
                            aria-live="polite"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 12 }}
                                className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-slate-200 mb-8"
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                            <h3 className="text-3xl font-[900] text-slate-900 tracking-tighter leading-none mb-4">Message Sent.</h3>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
                                Your communication has been received. Expect a response within the next business cycle.
                            </p>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            onSubmit={handleSubmit}
                            className="space-y-8"
                            onFocus={handleFormStart}
                            aria-describedby={formDescriptionIds}
                            aria-busy={isSubmitting}
                        >
                            <div className="mb-10">
                                <h3 className="text-3xl md:text-4xl font-[900] text-slate-900 tracking-tighter leading-none">Send a Message</h3>
                            </div>

                            {!emailJsConfig && (
                                <p id="contact-form-availability" role="status" className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm font-medium text-amber-900">
                                    The secure form is temporarily unavailable. Email{' '}
                                    <a className="font-bold underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
                                </p>
                            )}

                            {submitError && (
                                <p id="contact-submit-error" role="alert" aria-live="assertive" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">
                                    {submitError}
                                </p>
                            )}

                            {/* Name and Email Row */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Name Field */}
                                <div className="relative group">
                                    <label htmlFor="contact-name" className="sr-only">
                                        Your Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        aria-invalid={Boolean(errors.name)}
                                        aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                        className={`w-full rounded-none border-0 border-b bg-transparent py-4 ${errors.name ? 'border-red-300' : 'border-slate-200'} text-base font-medium tracking-tight text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-200`}
                                        placeholder="Name"
                                    />
                                    {errors.name && (
                                        <motion.p
                                            id="contact-name-error"
                                            role="alert"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest"
                                        >
                                            {errors.name}
                                        </motion.p>
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="relative group">
                                    <label htmlFor="contact-email" className="sr-only">
                                        Email Address
                                    </label>
                                    <input
                                        id="contact-email"
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        aria-invalid={Boolean(errors.email)}
                                        aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                        className={`w-full rounded-none border-0 border-b bg-transparent py-4 ${errors.email ? 'border-red-300' : 'border-slate-200'} text-base font-medium tracking-tight text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-200`}
                                        placeholder="Email"
                                    />
                                    {errors.email && (
                                        <motion.p
                                            id="contact-email-error"
                                            role="alert"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest"
                                        >
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>
                            </div>

                            {/* Subject Field */}
                            <div className="relative group">
                                <label htmlFor="contact-subject" className="sr-only">
                                    Subject Line
                                </label>
                                <input
                                    id="contact-subject"
                                    required
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                    aria-invalid={Boolean(errors.subject)}
                                    aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                                    className={`w-full rounded-none border-0 border-b bg-transparent py-4 ${errors.subject ? 'border-red-300' : 'border-slate-200'} text-base font-medium tracking-tight text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-200`}
                                    placeholder="What’s this about?"
                                />
                                {errors.subject && (
                                    <motion.p
                                        id="contact-subject-error"
                                        role="alert"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest"
                                    >
                                        {errors.subject}
                                    </motion.p>
                                )}
                            </div>

                            {/* Message Field */}
                            <div className="relative group">
                                <label htmlFor="contact-message" className="sr-only">
                                    Detailed Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    className="w-full resize-none rounded-none border-0 border-b border-slate-200 bg-transparent py-4 text-base font-medium tracking-tight text-slate-900 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-900 focus-visible:outline-none focus-visible:ring-0 transition-colors duration-200"
                                    placeholder="Tell me about the role or support you need"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !emailJsConfig}
                                    className="group/btn flex min-h-16 w-full items-center justify-between rounded-lg bg-slate-900 px-6 py-4 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span aria-live="polite" aria-atomic="true">{isSubmitting ? 'Sending...' : emailJsConfig ? 'Send Message' : 'Form Unavailable'}</span>
                                    <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10" aria-hidden="true">
                                        <svg className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </span>
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ContactForm;
