export const REQUIRED_CONTACT_ENV = Object.freeze([
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_PUBLIC_KEY',
]);

export function resolveEmailJsConfig(environment) {
  const serviceId = environment.VITE_EMAILJS_SERVICE_ID?.trim();
  const templateId = environment.VITE_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = environment.VITE_EMAILJS_PUBLIC_KEY?.trim();

  return serviceId && templateId && publicKey
    ? { serviceId, templateId, publicKey }
    : null;
}

export function reportProductionContactConfig(environment, warn = console.warn) {
  if (environment.VERCEL_ENV !== 'production') return [];

  const missing = REQUIRED_CONTACT_ENV.filter(
    (key) => !environment[key]?.trim(),
  );

  if (missing.length > 0) {
    warn(
      `Production contact form is disabled because configuration is missing: ${missing.join(', ')}`,
    );
  }

  return missing;
}
