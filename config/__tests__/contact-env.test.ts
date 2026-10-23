import { describe, expect, it, vi } from 'vitest';
import {
  reportProductionContactConfig,
  resolveEmailJsConfig,
} from '../contact-env.js';

describe('contact environment', () => {
  it('resolves a complete EmailJS configuration', () => {
    expect(resolveEmailJsConfig({
      VITE_EMAILJS_SERVICE_ID: ' service_live ',
      VITE_EMAILJS_TEMPLATE_ID: 'template_live',
      VITE_EMAILJS_PUBLIC_KEY: 'public_live',
    })).toEqual({
      serviceId: 'service_live',
      templateId: 'template_live',
      publicKey: 'public_live',
    });
  });

  it('returns null instead of placeholder credentials when configuration is incomplete', () => {
    expect(resolveEmailJsConfig({
      VITE_EMAILJS_SERVICE_ID: '',
      VITE_EMAILJS_TEMPLATE_ID: 'template_live',
      VITE_EMAILJS_PUBLIC_KEY: 'public_live',
    })).toBeNull();
  });

  it('reports missing production configuration so the form can fail closed', () => {
    const warn = vi.fn();
    const missing = reportProductionContactConfig({
      VERCEL_ENV: 'production',
      VITE_EMAILJS_SERVICE_ID: '',
      VITE_EMAILJS_TEMPLATE_ID: '',
      VITE_EMAILJS_PUBLIC_KEY: '',
    }, warn);

    expect(missing).toEqual([
      'VITE_EMAILJS_SERVICE_ID',
      'VITE_EMAILJS_TEMPLATE_ID',
      'VITE_EMAILJS_PUBLIC_KEY',
    ]);
    expect(warn).toHaveBeenCalledWith(
      expect.stringMatching(/VITE_EMAILJS_SERVICE_ID.*VITE_EMAILJS_TEMPLATE_ID.*VITE_EMAILJS_PUBLIC_KEY/),
    );
  });

  it('does not report configuration for non-production builds', () => {
    const warn = vi.fn();

    expect(reportProductionContactConfig({ VERCEL_ENV: 'preview' }, warn)).toEqual([]);
    expect(warn).not.toHaveBeenCalled();
  });
});
