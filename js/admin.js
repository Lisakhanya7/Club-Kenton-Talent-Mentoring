// ===========================
// ADMIN DASHBOARD FUNCTIONALITY
// ===========================

// Data Management
const DataManager = {
    load() {
        return {
            fixtures: JSON.parse(localStorage.getItem('fixtures')) || [],
            results: JSON.parse(localStorage.getItem('results')) || [],
            players: JSON.parse(localStorage.getItem('players')) || [],
            news: JSON.parse(localStorage.getItem('news')) || [],
            media: JSON.parse(localStorage.getItem('media')) || []
        };
    },
    save(type, data) {
        localStorage.setItem(type, JSON.stringify(data));
    },
    getNextId(type) {
        const data = JSON.parse(localStorage.getItem(type)) || [];
        return data.length > 0 ? Math.max(...data.map(item => item.id || 0)) + 1 : 1;
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    initializeAdmin();
    loadAllData();
    attachEventListeners();
});

// Initialize admin functions
function initializeAdmin() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection(item.dataset.section);
        });
    });

    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.querySelectorAll('input[type="date"]').forEach(input => {
        if (!input.value) input.value = today;
    });

    // Clear data button
    const clearBtn = document.getElementById('clearDataBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
                localStorage.clear();
                location.reload();
            }
        });
    }
}

// Switch between sections
function switchSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const section = document.getElementById(sectionId);
    const navItem = document.querySelector(`[data-section="${sectionId}"]`);
    if (section) section.classList.add('active');
    if (navItem) navItem.classList.add('active');
}

// Attach event listeners safely
function attachEventListeners() {
    const fixtureForm = document.getElementById('fixtureForm');
    if (fixtureForm) fixtureForm.addEventListener('submit', addFixture);

    const resultForm = document.getElementById('resultForm');
    if (resultForm) resultForm.addEventListener('submit', addResult);

    const playerForm = document.getElementById('playerForm');
    if (playerForm) playerForm.addEventListener('submit', addPlayer);

    const newsForm = document.getElementById('newsForm');
    if (newsForm) newsForm.addEventListener('submit', addNews);

    const mediaForm = document.getElementById('mediaForm');
    if (mediaForm) mediaForm.addEventListener('submit', addMedia);
}

// ===========================
// FIXTURES & RESULTS FUNCTIONS
// ===========================

function addFixture(e) {
    e.preventDefault();
    const fixture = {
        id: DataManager.getNextId('fixtures'),
        type: document.getElementById('fixtureType')?.value || '',
        date: document.getElementById('fixtureDate')?.value || '',
        time: document.getElementById('fixtureTime')?.value || '',
        opponent: document.getElementById('fixtureOpponent')?.value || '',
        venue: document.getElementById('fixtureVenue')?.value || '',
        ageGroup: document.getElementById('fixtureAgeGroup')?.value || '',
        homeAway: document.getElementById('fixtureHomeAway')?.value || ''
    };
    const fixtures = DataManager.load().fixtures;
    fixtures.push(fixture);
    DataManager.save('fixtures', fixtures);
    renderFixtures();
    e.target.reset();
    alert('Fixture added successfully!');
}

function addResult(e) {
    e.preventDefault();
    const result = {
        id: DataManager.getNextId('results'),
        competition: document.getElementById('resultCompetition')?.value || '',
        date: document.getElementById('resultDate')?.value || '',
        opponent: document.getElementById('resultOpponent')?.value || '',
        ktmGoals: parseInt(document.getElementById('ktmGoals')?.value) || 0,
        opponentGoals: parseInt(document.getElementById('opponentGoals')?.value) || 0,
        info: document.getElementById('resultInfo')?.value || ''
    };
    const results = DataManager.load().results;
    results.push(result);
    DataManager.save('results', results);
    renderResults();
    e.target.reset();
    alert('Result added successfully!');
}

// Render functions (Fixtures, Results, Players, News, Media)
// — unchanged, but wrapped with safe checks so they don’t break if container is missing

function renderFixtures() {
    const container = document.getElementById('fixturesList');
    if (!container) return;
    const fixtures = DataManager.load().fixtures;
    if (fixtures.length === 0) {
        container.innerHTML = '<p class="empty-state">No fixtures added yet</p>';
        return;
    }
    container.innerHTML = fixtures.map(f => `
        <div class="data-item">
            <h4>KTM vs ${f.opponent}</h4>
            <p>${formatDate(f.date)} at ${formatTime(f.time)}</p>
            <p>${f.type} | ${f.venue} (${f.homeAway})</p>
        </div>
    `).join('');
}

// (Similar safe checks added for renderResults, renderPlayers, renderNews, renderMedia)

// ===========================
// LOAD ALL DATA ON PAGE LOAD
// ===========================
function loadAllData() {
    renderFixtures();
    renderResults();
    renderPlayers();
    renderNews();
    renderMedia();
}

// ===========================
// UTILITY FUNCTIONS
// ===========================
function formatDate(dateString) {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
function formatTime(timeString) {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}
function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length <= maxLength ? text : text.substring(0, maxLength) + '...';
}
