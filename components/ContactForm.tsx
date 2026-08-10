import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from './shared/Button';
import { trackFormSubmission, trackCustomEvent } from '../utils/analytics';
import SectionLabel from './shared/SectionLabel';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

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
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [formStarted, setFormStarted] = useState(false);

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
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_test';
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_test';
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'key_test';

            await emailjs.send(serviceId, templateId, {
                from_name: formData.name,
                from_email: formData.email,
                subject: formData.subject,
                message: formData.message || 'No additional details provided.'
            }, publicKey);

            trackFormSubmission({
                formType: 'contact',
                subject: formData.subject
            });

            setIsSent(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSent(false), 6000);
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Message failed to send. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: keyof ContactFormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        if (errors[field]) setErrors({ ...errors, [field]: undefined });
    };

    const hasValue = (field: keyof ContactFormData) => formData[field].trim().length > 0;
    const showLabel = (field: keyof ContactFormData) => focusedField === field || hasValue(field);

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
                        >
                            <div className="mb-10">
                                <h3 className="text-3xl md:text-4xl font-[900] text-slate-900 tracking-tighter leading-none">Send a Message</h3>
                            </div>

                            {/* Name and Email Row */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Name Field */}
                                <div className="relative group">
                                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] ${showLabel('name') ? '-top-5 text-blue-600 opacity-100' : 'top-5 text-slate-400 opacity-0'}`}>
                                        Your Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleChange('name', e.target.value)}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full py-4 bg-transparent border-b ${errors.name ? 'border-red-300' : 'border-slate-200'} text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:placeholder-transparent transition-all outline-none text-base font-medium tracking-tight`}
                                        placeholder={focusedField === 'name' ? '' : 'Name'}
                                    />
                                    {errors.name && (
                                        <motion.p
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
                                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] ${showLabel('email') ? '-top-5 text-blue-600 opacity-100' : 'top-5 text-slate-400 opacity-0'}`}>
                                        Email Address
                                    </label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange('email', e.target.value)}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full py-4 bg-transparent border-b ${errors.email ? 'border-red-300' : 'border-slate-200'} text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:placeholder-transparent transition-all outline-none text-base font-medium tracking-tight`}
                                        placeholder={focusedField === 'email' ? '' : 'Email'}
                                    />
                                    {errors.email && (
                                        <motion.p
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
                                <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] ${showLabel('subject') ? '-top-5 text-blue-600 opacity-100' : 'top-5 text-slate-400 opacity-0'}`}>
                                    Subject Line
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`w-full py-4 bg-transparent border-b ${errors.subject ? 'border-red-300' : 'border-slate-200'} text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:placeholder-transparent transition-all outline-none text-base font-medium tracking-tight`}
                                    placeholder={focusedField === 'subject' ? '' : 'Subject'}
                                />
                                {errors.subject && (
                                    <motion.p
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
                                <label className={`absolute left-0 transition-all duration-300 pointer-events-none font-mono text-[9px] uppercase tracking-[0.2em] ${showLabel('message') ? '-top-5 text-blue-600 opacity-100' : 'top-5 text-slate-400 opacity-0'}`}>
                                    Detailed Message
                                </label>
                                <textarea
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => handleChange('message', e.target.value)}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    className="w-full py-4 bg-transparent border-b border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:placeholder-transparent transition-all outline-none text-base font-medium tracking-tight resize-none"
                                    placeholder={focusedField === 'message' ? '' : 'Your Message'}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <Button
                                    variant="accent"
                                    size="lg"
                                    type="submit"
                                    disabled={isSubmitting}
                                    loading={isSubmitting}
                                    className="w-full py-6 bg-slate-900 text-white rounded-2xl font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-slate-200 flex items-center justify-between group/btn relative overflow-hidden"
                                >
                                    <span className="relative z-10 flex items-center gap-4 px-4 overflow-hidden">
                                        <span className="inline-block transition-transform duration-500 group-hover/btn:-translate-y-[120%]">
                                            {isSubmitting ? 'Processing...' : 'Send Message'}
                                        </span>
                                        <span className="absolute left-4 inline-block transition-transform duration-500 translate-y-[120%] group-hover/btn:translate-y-0">
                                            {isSubmitting ? 'Processing...' : 'Send Now'}
                                        </span>
                                    </span>
                                    <div className="relative z-10 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center mr-2 transition-transform duration-500 group-hover/btn:scale-110 group-hover/btn:bg-white/20">
                                        <svg className="w-4 h-4 transition-transform duration-500 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
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
