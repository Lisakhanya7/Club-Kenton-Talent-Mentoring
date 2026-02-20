// ===========================
// MAIN APPLICATION
// ===========================
// This file coordinates all components and initializes the website

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

/**
 * Initialize the entire application
 */
function initializeApp() {
    // Initialize navbar functionality
    NavbarComponent.init();

    // Load and display all data from storage
    loadAndDisplayContent();
}

/**
 * Load all data from storage and display on page
 */
function loadAndDisplayContent() {
    const data = StorageManager.loadAll();

    // Display fixtures and results if data exists
    if (data.fixtures.length > 0) {
        FixturesComponent.displayUpcoming(data.fixtures);
    }

    if (data.results.length > 0) {
        FixturesComponent.displayResults(data.results);
    }

    // Display squad/players if data exists
    if (data.players.length > 0) {
        SquadComponent.display(data.players);
    }

    // Display news if data exists
    if (data.news.length > 0) {
        NewsComponent.display(data.news);
    }
}

/**
 * Refresh all displayed content (useful after data changes)
 */
function refreshContent() {
    loadAndDisplayContent();
}
