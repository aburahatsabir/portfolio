/**
 * DEPRECATED: This file is kept for backward compatibility during migration
 * 
 * All constants have been moved to the /content directory for better organization.
 * Please update your imports to use the new structure:
 * 
 * OLD: import { PROJECTS } from './constants';
 * NEW: import { PROJECTS } from './content/projects';
 * 
 * Or use the barrel export:
 * NEW: import { PROJECTS } from './content';
 * 
 * This file will be removed in a future version.
 */

// Re-export everything from /content for backward compatibility
export * from './content';
