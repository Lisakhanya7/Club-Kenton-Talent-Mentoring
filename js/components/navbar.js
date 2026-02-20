// ===========================
// NAVBAR COMPONENT
// ===========================

const NavbarComponent = {
    /**
     * Initialize navbar functionality
     */
    init() {
        this.setupHamburger();
        this.setupScrollListener();
        this.setupNavLinks();
    },

    /**
     * Setup hamburger menu toggle
     */
    setupHamburger() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (!hamburger) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when nav link is clicked
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    },

    /**
     * Setup scroll listener for navbar styling
     */
    setupScrollListener() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    },

    /**
     * Setup smooth scrolling for nav links
     */
    setupNavLinks() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
};
