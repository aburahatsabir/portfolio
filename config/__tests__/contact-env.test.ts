import { describe, expect, it } from 'vitest';
import {
  assertProductionContactConfig,
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

  it('blocks a Vercel production build when required configuration is missing', () => {
    expect(() => assertProductionContactConfig({
      VERCEL_ENV: 'production',
      VITE_EMAILJS_SERVICE_ID: '',
      VITE_EMAILJS_TEMPLATE_ID: '',
      VITE_EMAILJS_PUBLIC_KEY: '',
    })).toThrow(/VITE_EMAILJS_SERVICE_ID.*VITE_EMAILJS_TEMPLATE_ID.*VITE_EMAILJS_PUBLIC_KEY/);
  });

  it('allows non-production builds to show the fail-closed fallback', () => {
    expect(() => assertProductionContactConfig({ VERCEL_ENV: 'preview' })).not.toThrow();
  });
});
