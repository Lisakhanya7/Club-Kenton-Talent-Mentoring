// ===========================
// COMPONENT LOADER SYSTEM
// ===========================
// Dynamically loads HTML components and manages page structure

const ComponentLoader = {
    /**
     * List of components to load
     * Each component is a separate HTML file for easier maintenance
     */
    components: [
        { id: 'navbar-container', file: 'html-components/navbar.html' },
        { id: 'hero-container', file: 'html-components/hero.html' },
        { id: 'about-container', file: 'html-components/about.html' },
        // Add more components as needed
    ],

    /**
     * Initialize component loading
     */
    init() {
        console.log('ComponentLoader: Initializing...');
        // Components can be loaded here if needed
        // For now, index.html still contains all content
    }
};

/**
 * Load external HTML component into a container
 * @param {string} containerId - ID of container element
 * @param {string} filePath - Path to HTML component file
 */
function loadComponent(containerId, filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            return response.text();
        })
        .then(html => {
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = html;
                // Re-initialize any component-specific scripts
                initializeComponentScripts();
            }
        })
        .catch(error => console.error('ComponentLoader Error:', error));
}

/**
 * Re-initialize scripts after loading components
 * Call this after loading any dynamic components
 */
function initializeComponentScripts() {
    // Re-cache references to newly loaded elements
    if (typeof NavbarComponent !== 'undefined') {
        NavbarComponent.init();
    }
    if (typeof ProgramApplicationComponent !== 'undefined') {
        ProgramApplicationComponent.init();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.init();
});
