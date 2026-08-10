
// Global Lenis instance type (exposed by SmoothScroll component)
declare global { interface Window { __lenis?: import('lenis').default; } }

import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './components/NotFoundPage';
import PersonaCTA from './components/PersonaCTA';
import PersonaBanner from './components/PersonaBanner';
import BottomCTA from './components/BottomCTA';
import { lazyLoadPage, lazyLoad, PageLoadingFallback, LoadingFallback } from './utils/lazy-loading';

// Route-based code splitting - lazy load page components
const BlogSeries = lazyLoadPage(() => import('./components/BlogSeries'));
const PersonaSpecificContent = lazyLoadPage(() => import('./components/PersonaSpecificContent'));
const PersonaDirectory = lazyLoadPage(() => import('./components/PersonaDirectory'));
const FMCGCaseStudy = lazyLoadPage(() => import('./components/FMCGCaseStudy'));
const MocsCaseStudy = lazyLoadPage(() => import('./components/MocsCaseStudy'));
const HRDocsCaseStudy = lazyLoadPage(() => import('./components/HRDocsCaseStudy'));
const PrivacyPolicy = lazyLoadPage(() => import('./components/PrivacyPolicy'));
const CookiePolicy = lazyLoadPage(() => import('./components/CookiePolicy'));
const AccessibilityStatement = lazyLoadPage(() => import('./components/AccessibilityStatement'));
const CodeOfConduct = lazyLoadPage(() => import('./components/CodeOfConduct'));
const DataSecurityStandards = lazyLoadPage(() => import('./components/DataSecurityStandards'));
const Certifications = lazyLoadPage(() => import('./components/Certifications'));

// Below-the-fold components - lazy load for better initial load
const ExperienceTimeline = lazyLoad(() => import('./components/ExperienceTimeline'));
const AdministrativeRoiFramework = lazyLoad(() => import('./components/AdministrativeRoiFramework'));
const Contact = lazyLoad(() => import('./components/Contact'));
const HomeBlogPreview = lazyLoad(() => import('./components/HomeBlogPreview'));
const Endorsements = lazyLoad(() => import('./components/Endorsements'));
const Work = lazyLoad(() => import('./components/Work'));
import { motion, AnimatePresence } from 'framer-motion';
import { updatePageMetadata, generateWebSiteSchema, generateFAQSchema, generateBreadcrumbSchema, injectSchema, removeSchema } from './utils/seo-utils';

import { trackPageView, trackNavigation, trackError } from './utils/analytics';
import { useScrollDepth } from './hooks/useScrollDepth';
import { useEngagementTime } from './hooks/useEngagementTime';
import { useExitIntent } from './hooks/useExitIntent';
import { getWorkProjectIdFromRouteSegment, getWorkRoutePath, getWorkRouteTitle, normalizeWorkRoutePath } from './content/work-route-titles';
import CookieConsent from './components/CookieConsent';
import OfflineIndicator from './components/OfflineIndicator';



/**
 * Generate breadcrumb items for current route
 */
function getBreadcrumbsForRoute(currentPath: string): Array<{ name: string; url: string }> {
    const baseUrl = window.location.origin;
    const breadcrumbs = [{ name: 'Home', url: `${baseUrl}/` }];

    if (currentPath === '/' || !currentPath) {
        return breadcrumbs;
    }

    // Handle case study routes
    if (currentPath.startsWith('/work/')) {
        breadcrumbs.push({ name: 'Work', url: `${baseUrl}/work` });
        const routeSegment = currentPath.replace('/work/', '');
        const projectId = getWorkProjectIdFromRouteSegment(routeSegment) ?? routeSegment;
        const project = {
            id: projectId,
            title: getWorkRouteTitle(projectId) ?? projectId.replace(/-/g, ' '),
        };
        const projectPath = getWorkRoutePath(projectId) ?? currentPath;
        breadcrumbs.push({ name: project.title, url: `${baseUrl}${projectPath}` });
        return breadcrumbs;
    }

    // Handle blog routes
    if (currentPath.startsWith('/blog/')) {
        breadcrumbs.push({ name: 'Blog', url: `${baseUrl}/blog` });
        const postId = currentPath.replace('/blog/', '');
        breadcrumbs.push({ name: postId.replace(/-/g, ' '), url: `${baseUrl}${currentPath}` });
        return breadcrumbs;
    }

    // Handle persona routes
    if (currentPath.startsWith('/persona/')) {
        breadcrumbs.push({ name: 'For', url: `${baseUrl}/for` });
        const personaId = currentPath.replace('/persona/', '');
        const personaName = personaId.replace(/-/g, ' ');
        breadcrumbs.push({ name: personaName, url: `${baseUrl}${currentPath}` });
        return breadcrumbs;
    }

    // Simple routes
    const routeNames: Record<string, string> = {
        '/work': 'Work',
        '/about': 'About',
        '/contact': 'Contact',
        '/solutions': 'Solutions',
        '/governance': 'Governance',
        '/blog': 'Blog',
        '/for': 'For',
        // '/certifications': 'Certifications',
        '/privacy': 'Privacy Policy',
        '/cookies': 'Cookie Policy'
    };

    if (routeNames[currentPath]) {
        breadcrumbs.push({ name: routeNames[currentPath], url: `${baseUrl}${currentPath}` });
    }

    return breadcrumbs;
}

import SmoothScroll from './components/shared/SmoothScroll';

function App() {
    const [currentPath, setCurrentPath] = useState(() => normalizeWorkRoutePath(window.location.pathname || '/'));
    const [previousPath, setPreviousPath] = useState(() => normalizeWorkRoutePath(window.location.pathname || '/'));

    // Track scroll depth for the current page
    useScrollDepth(currentPath);

    // Track engagement time for the current page
    useEngagementTime(currentPath);

    // Track exit intent
    useExitIntent(true);


    useEffect(() => {
        const browserPath = window.location.pathname || '/';
        const normalizedBrowserPath = normalizeWorkRoutePath(browserPath);

        if (normalizedBrowserPath !== browserPath) {
            window.history.replaceState(window.history.state, '', normalizedBrowserPath);
        }

        // Update metadata on initial load and path change
        updatePageMetadata(currentPath);

        // Track page view for current route (runs on mount + change)
        trackPageView({
            route: currentPath,
            title: document.title
        });

        // Track navigation pattern if path changed
        if (previousPath !== currentPath) {
            trackNavigation(previousPath, currentPath);
            setPreviousPath(currentPath);
        }

        // Inject/remove FAQ schema based on route
        if (currentPath === '/about') {
            const faqSchema = generateFAQSchema();
            injectSchema(faqSchema, 'faq-schema');
        } else {
            removeSchema('faq-schema');
        }

        // Inject WebSite schema on homepage
        if (currentPath === '/') {
            const websiteSchema = generateWebSiteSchema();
            injectSchema(websiteSchema, 'website-schema');
        } else {
            removeSchema('website-schema');
        }

        // Inject breadcrumb schema for all routes
        const breadcrumbs = getBreadcrumbsForRoute(currentPath);
        if (breadcrumbs.length > 0) {
            const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
            injectSchema(breadcrumbSchema, 'breadcrumb-schema');
        } else {
            removeSchema('breadcrumb-schema');
        }

        const handlePopState = () => {
            const newPath = normalizeWorkRoutePath(window.location.pathname || '/');
            if (newPath !== (window.location.pathname || '/')) {
                window.history.replaceState(window.history.state, '', newPath);
            }
            setCurrentPath(newPath);
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [currentPath, previousPath]);

    const renderContent = () => {
        const workRouteSegment = currentPath.startsWith('/work/')
            ? currentPath.replace('/work/', '')
            : null;
        const workProjectId = workRouteSegment
            ? getWorkProjectIdFromRouteSegment(workRouteSegment)
            : undefined;

        if (currentPath.startsWith('/blog/')) {
            // CRITICAL FIX: The unique key forces React to fully unmount and remount
            // the component when transitioning between the list (/blog) and a post (/blog/id).
            // Without this, React recycles the DOM nodes mid-animation, stripping all CSS context!
            return <React.Fragment key={currentPath}><ErrorBoundary><BlogSeries /></ErrorBoundary></React.Fragment>;
        }

        if (workProjectId === 'fmcg-erp') {
            return <ErrorBoundary><FMCGCaseStudy /></ErrorBoundary>;
        }

        if (workProjectId === 'mocs') {
            return <ErrorBoundary><MocsCaseStudy /></ErrorBoundary>;
        }

        if (workProjectId === 'hr-docs') {
            return <ErrorBoundary><HRDocsCaseStudy /></ErrorBoundary>;
        }

        if (currentPath.startsWith('/work/')) {
            return (
                <ErrorBoundary>
                    <NotFoundPage
                        title="Case Study Not Found"
                        message="This case study URL is not available. Browse the work library for current project pages."
                    />
                </ErrorBoundary>
            );
        }

        if (currentPath.startsWith('/persona/')) {
            const personaId = currentPath.replace('/persona/', '');
            return <ErrorBoundary><PersonaSpecificContent personaId={personaId} /></ErrorBoundary>;
        }

        switch (currentPath) {
            case '/for':
                return <div className="pt-20"><ErrorBoundary><PersonaDirectory /></ErrorBoundary></div>;
            case '/work':
                return <div className="pt-20"><ErrorBoundary><Work /></ErrorBoundary></div>;

            case '/governance':
                return <ErrorBoundary><DataSecurityStandards /></ErrorBoundary>;
            case '/blog':
                return <React.Fragment key={currentPath}><div className="pt-20"><ErrorBoundary><BlogSeries /></ErrorBoundary></div></React.Fragment>;
            case '/solutions':
                return (
                    <div className="pt-20">
                        <ErrorBoundary><PersonaDirectory /></ErrorBoundary>
                    </div>
                );
            case '/about':
                return (
                    <div className="pt-20">
                        <ErrorBoundary><About showStrategicPillars={true} /></ErrorBoundary>
                        <ErrorBoundary><ExperienceTimeline /></ErrorBoundary>
                        <PersonaBanner />
                    </div>
                );
            case '/contact':
                return <div className="pt-20"><ErrorBoundary><Contact /></ErrorBoundary></div>;
            case '/certifications':
                return <div className="pt-20"><ErrorBoundary><Certifications /></ErrorBoundary></div>;
            case '/privacy':
                return <ErrorBoundary><PrivacyPolicy /></ErrorBoundary>;
            case '/cookies':
                return <ErrorBoundary><CookiePolicy /></ErrorBoundary>;
            case '/accessibility':
                return <ErrorBoundary><AccessibilityStatement /></ErrorBoundary>;
            case '/conduct':
                return <ErrorBoundary><CodeOfConduct /></ErrorBoundary>;
            case '/':
                return (
                    <>
                        <ErrorBoundary><Hero /></ErrorBoundary>
                        <ErrorBoundary><About showStrategicPillars={false} /></ErrorBoundary>
                        <ErrorBoundary><ExperienceTimeline /></ErrorBoundary>
                        <ErrorBoundary><Endorsements /></ErrorBoundary>
                        <ErrorBoundary><Work /></ErrorBoundary>
                        <ErrorBoundary><AdministrativeRoiFramework /></ErrorBoundary>
                        <ErrorBoundary><Contact /></ErrorBoundary>
                        <ErrorBoundary><HomeBlogPreview /></ErrorBoundary>
                    </>
                );
            default:
                return (
                    <ErrorBoundary>
                        <NotFoundPage />
                    </ErrorBoundary>
                );
        }
    };

    return (
        <SmoothScroll>
            <div className="min-h-screen bg-white">
                {/* Skip to content link for screen readers */}
                <a
                    href="#main-content"
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-blue-600 focus:text-white focus:px-6 focus:py-3 focus:rounded-lg focus:outline-2 focus:outline-white focus:outline-offset-2 focus:shadow-xl focus:font-semibold"
                >
                    Skip to main content
                </a>

                {/* Network offline indicator - shows banner when user is offline */}
                <OfflineIndicator />

                {/* Granular error boundary for Navbar - prevents nav crashes from taking down entire page */}
                <ErrorBoundary>
                    <Navbar />
                </ErrorBoundary>

                <ErrorBoundary>
                    <main id="main-content">
                        <AnimatePresence 
                            mode="wait"
                            onExitComplete={() => {
                                // Force hard scroll reset at the DOM level
                                document.documentElement.scrollTop = 0;
                                document.body.scrollTop = 0;
                                if (window.__lenis) {
                                    window.__lenis.scrollTo(0, { immediate: true });
                                } else {
                                    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                                }
                            }}
                        >
                            <motion.div
                                key={currentPath}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </ErrorBoundary>

                <ScrollToTop />

                {/* Granular error boundary for Footer */}
                <ErrorBoundary>
                    <Footer />
                </ErrorBoundary>

                {/* Granular error boundary for Cookie Consent */}
                <ErrorBoundary>
                    <CookieConsent />
                </ErrorBoundary>
            </div>
        </SmoothScroll>
    );
}

export default App;
