/**
 * Component Rendering System
 * Loads templates and data, renders components dynamically
 */

class ComponentRenderer {
    constructor() {
        this.templates = {};
        this.data = {};
    }

    // Lightweight Mustache-style template engine
    render(template, data) {
        return template
            // Handle {{#array}} loops
            .replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (match, key, content) => {
                const value = data[key];
                if (Array.isArray(value)) {
                    return value.map(item =>
                        typeof item === 'object' ? this.render(content, item) :
                            content.replace(/\{\{\.\}\}/g, item)
                    ).join('');
                }
                return value ? this.render(content, data) : '';
            })
            // Handle {{variable}} replacements
            .replace(/\{\{(\w+)\}\}/g, (match, key) => data[key] || '');
    }

    async loadTemplate(name) {
        if (this.templates[name]) return this.templates[name];
        try {
            const response = await fetch(`partials/${name}.html`);
            if (!response.ok) throw new Error(`Template ${name} not found`);
            this.templates[name] = await response.text();
            return this.templates[name];
        } catch (error) {
            console.error(`Failed to load template ${name}:`, error);
            return '';
        }
    }

    async loadData(name) {
        if (this.data[name]) return this.data[name];
        try {
            const response = await fetch(`assets/data/${name}.json`);
            if (!response.ok) throw new Error(`Data ${name} not found`);
            this.data[name] = await response.json();
            return this.data[name];
        } catch (error) {
            console.error(`Failed to load data ${name}:`, error);
            return null;
        }
    }

    async renderProjects(containerId) {
        const template = await this.loadTemplate('project-card');
        const data = await this.loadData('projects');
        if (!data || !template) return;

        const container = document.getElementById(containerId);
        if (!container) return;

        // Preserve empty state element
        const emptyState = container.querySelector('.empty-state');

        container.innerHTML = data.projects
            .map(project => this.render(template, project))
            .join('');

        // Re-append empty state
        if (emptyState) {
            container.appendChild(emptyState);
        }
    }

    async renderTestimonials(containerSelector) {
        const template = await this.loadTemplate('testimonial-card');
        const data = await this.loadData('testimonials');
        if (!data || !template) return;

        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Render testimonials in order, preserving bento grid layout
        const html = data.testimonials.map(testimonial =>
            this.render(template, testimonial)
        ).join('');

        // For bento grid, we need to wrap bottom cards
        const cards = data.testimonials.map(t => this.render(template, t));
        const bentoHTML = `
      ${cards[0]}
      ${cards[1]}
      <div class="bento-bottom-cards">
        ${cards[2]}
        ${cards[3]}
      </div>
      ${cards[4]}
    `;

        container.innerHTML = bentoHTML;
    }

    async renderSkills(containerSelector) {
        const template = await this.loadTemplate('skill-card');
        const data = await this.loadData('skills');
        if (!data || !template) return;

        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Transform proficiency number to dots array
        const skillsWithDots = data.skills.map(skill => {
            const fullDots = Math.floor(skill.proficiency);
            const hasHalf = skill.proficiency % 1 !== 0;

            return {
                ...skill,
                proficiencyDots: Array.from({ length: 5 }, (_, i) => {
                    if (i < fullDots) return { active: 'active' };
                    if (i === fullDots && hasHalf) return { half: 'half' };
                    return {};
                })
            };
        });

        container.innerHTML = skillsWithDots
            .map(skill => this.render(template, skill))
            .join('');
    }

    async renderTimeline(containerSelector) {
        const template = await this.loadTemplate('timeline-item');
        const data = await this.loadData('timeline');
        if (!data || !template) return;

        const container = document.querySelector(containerSelector);
        if (!container) return;

        // Find the timeline items container (after header)
        const headerRow = container.querySelector('.exp-header-row');

        const timelineHTML = data.timeline
            .map(item => this.render(template, item))
            .join('');

        // Insert after header row
        if (headerRow) {
            headerRow.insertAdjacentHTML('afterend', timelineHTML);
        } else {
            container.innerHTML = timelineHTML;
        }
    }
}

// Initialize and expose globally
window.componentRenderer = new ComponentRenderer();

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    const renderer = window.componentRenderer;

    try {
        // Render based on page
        if (document.querySelector('#grid')) {
            await renderer.renderProjects('grid');
        }

        if (document.querySelector('.bento-grid')) {
            await renderer.renderTestimonials('.bento-grid');
        }

        if (document.querySelector('.skills-grid')) {
            await renderer.renderSkills('.skills-grid');
        }

        if (document.querySelector('.timeline-container')) {
            await renderer.renderTimeline('.timeline-container');
        }

        // Dispatch event for other scripts
        document.dispatchEvent(new CustomEvent('components-loaded'));
    } catch (error) {
        console.error('Component rendering failed:', error);
    }
});
