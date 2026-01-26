/**
 * Analytics Utility
 * Event tracking for Google Analytics 4
 */

// Type definitions for analytics events
export interface ContactCTAEvent {
    location: string;
    conversionType: 'contact_form' | 'email_click' | 'resume_download';
    label?: string;
}

export interface FormSubmissionEvent {
    role?: string;
    challenge?: string;
    timeline?: string;
    formType: 'contact' | 'qualification';
}

export interface EmailClickEvent {
    source: string;
    emailType: 'primary' | 'secondary';
}

export interface PageViewEvent {
    route: string;
    title: string;
}

export interface SocialClickEvent {
    platform: string;
    location: string;
}

export interface ProjectClickEvent {
    projectName: string;
    projectCategory: string;
}

export interface ScrollDepthEvent {
    depth: '25%' | '50%' | '75%' | '100%';
    page: string;
}

// Check if Google Analytics is loaded
const isGALoaded = (): boolean => {
    return typeof window !== 'undefined' && typeof (window as any).gtag === 'function';
};

/**
 * Track contact CTA clicks
 * @param event - Contact CTA event data
 */
export const trackContactCTA = (event: ContactCTAEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'contact_cta_click', {
        event_category: 'Conversion',
        event_label: event.label || event.location,
        location: event.location,
        conversion_type: event.conversionType,
    });
};

/**
 * Track form submissions
 * @param event - Form submission event data
 */
export const trackFormSubmission = (event: FormSubmissionEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'form_submission', {
        event_category: 'Conversion',
        form_type: event.formType,
        role: event.role,
        challenge: event.challenge,
        timeline: event.timeline,
    });
};

/**
 * Track email clicks
 * @param event - Email click event data
 */
export const trackEmailClick = (event: EmailClickEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'email_click', {
        event_category: 'Engagement',
        event_label: event.source,
        source: event.source,
        email_type: event.emailType,
    });
};

/**
 * Track page views (for hash routing)
 * @param event - Page view event data
 */
export const trackPageView = (event: PageViewEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'page_view', {
        page_path: event.route,
        page_title: event.title,
    });
};

/**
 * Track resume downloads
 * @param source - Where the download was initiated from
 */
export const trackResumeDownload = (source: string): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'resume_download', {
        event_category: 'Conversion',
        event_label: source,
        source: source,
    });
};

/**
 * Track outbound link clicks
 * @param url - The URL being clicked
 * @param label - Optional label for the link
 */
export const trackOutboundLink = (url: string, label?: string): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'click', {
        event_category: 'Outbound Link',
        event_label: label || url,
        url: url,
    });
};

/**
 * Track custom events
 * @param eventName - Name of the event
 * @param params - Event parameters
 */
export const trackCustomEvent = (eventName: string, params?: Record<string, any>): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', eventName, params);
};

/**
 * Track social link clicks
 * @param event - Social click event data
 */
export const trackSocialClick = (event: SocialClickEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'social_click', {
        event_category: 'Engagement',
        platform: event.platform,
        location: event.location,
    });
};

/**
 * Track scroll depth
 * @param event - Scroll depth event data
 */
export const trackScrollDepth = (event: ScrollDepthEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'scroll_depth', {
        event_category: 'Engagement',
        depth: event.depth,
        page: event.page,
    });
};
/**
 * Track project card clicks
 * @param event - Project click event data
 */
export const trackProjectClick = (event: ProjectClickEvent): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'project_click', {
        event_category: 'Engagement',
        project_name: event.projectName,
        project_category: event.projectCategory,
    });
};

/**
 * Track user engagement time on a page
 * @param page - Page identifier
 * @param timeInSeconds - Time spent on page in seconds
 */
export const trackEngagementTime = (page: string, timeInSeconds: number): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'user_engagement', {
        event_category: 'Engagement',
        engagement_time_msec: timeInSeconds * 1000,
        page_path: page,
    });
};

/**
 * Track navigation patterns (user journey)
 * @param from - Previous page
 * @param to - Current page
 */
export const trackNavigation = (from: string, to: string): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'navigation', {
        event_category: 'User Journey',
        from_page: from,
        to_page: to,
    });
};

/**
 * Track JavaScript errors
 * @param error - Error object or message
 * @param fatal - Whether the error is fatal
 */
export const trackError = (error: string | Error, fatal: boolean = false): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    const errorMessage = error instanceof Error ? error.message : error;

    (window as any).gtag('event', 'exception', {
        description: errorMessage,
        fatal: fatal,
    });
};

/**
 * Track media interactions (videos, images, carousels)
 * @param mediaType - Type of media
 * @param action - Action performed
 * @param mediaName - Name/identifier of the media
 */
export const trackMediaInteraction = (
    mediaType: 'video' | 'image' | 'carousel',
    action: 'play' | 'pause' | 'complete' | 'click',
    mediaName: string
): void => {
    if (!isGALoaded()) {
        console.warn('Google Analytics not loaded');
        return;
    }

    (window as any).gtag('event', 'media_interaction', {
        event_category: 'Engagement',
        media_type: mediaType,
        action: action,
        media_name: mediaName,
    });
};
