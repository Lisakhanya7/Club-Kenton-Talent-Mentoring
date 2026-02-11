// ===========================
// ADMIN DASHBOARD FUNCTIONALITY
// ===========================

// Data Management
const DataManager = {
    // Load all data from localStorage
    load() {
        return {
            fixtures: JSON.parse(localStorage.getItem('fixtures')) || [],
            results: JSON.parse(localStorage.getItem('results')) || [],
            players: JSON.parse(localStorage.getItem('players')) || [],
            news: JSON.parse(localStorage.getItem('news')) || [],
            media: JSON.parse(localStorage.getItem('media')) || []
        };
    },

    // Save specific data
    save(type, data) {
        localStorage.setItem(type, JSON.stringify(data));
    },

    // Get next ID
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
    document.getElementById('clearDataBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
            localStorage.clear();
            location.reload();
        }
    });
}

// Switch between sections
function switchSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Attach event listeners
function attachEventListeners() {
    document.getElementById('fixtureForm').addEventListener('submit', addFixture);
    document.getElementById('resultForm').addEventListener('submit', addResult);
    document.getElementById('playerForm').addEventListener('submit', addPlayer);
    document.getElementById('newsForm').addEventListener('submit', addNews);
    document.getElementById('mediaForm').addEventListener('submit', addMedia);
}

// ===========================
// FIXTURES & RESULTS FUNCTIONS
// ===========================

function addFixture(e) {
    e.preventDefault();

    const fixture = {
        id: DataManager.getNextId('fixtures'),
        type: document.getElementById('fixtureType').value,
        date: document.getElementById('fixtureDate').value,
        time: document.getElementById('fixtureTime').value,
        opponent: document.getElementById('fixtureOpponent').value,
        venue: document.getElementById('fixtureVenue').value,
        ageGroup: document.getElementById('fixtureAgeGroup').value,
        homeAway: document.getElementById('fixtureHomeAway').value
    };

    const fixtures = DataManager.load().fixtures;
    fixtures.push(fixture);
    DataManager.save('fixtures', fixtures);

    renderFixtures();
    e.target.reset();
    document.getElementById('fixtureDate').value = new Date().toISOString().split('T')[0];
    alert('Fixture added successfully!');
}

function addResult(e) {
    e.preventDefault();

    const result = {
        id: DataManager.getNextId('results'),
        competition: document.getElementById('resultCompetition').value,
        date: document.getElementById('resultDate').value,
        opponent: document.getElementById('resultOpponent').value,
        ktmGoals: parseInt(document.getElementById('ktmGoals').value),
        opponentGoals: parseInt(document.getElementById('opponentGoals').value),
        info: document.getElementById('resultInfo').value
    };

    const results = DataManager.load().results;
    results.push(result);
    DataManager.save('results', results);

    renderResults();
    e.target.reset();
    document.getElementById('resultDate').value = new Date().toISOString().split('T')[0];
    alert('Result added successfully!');
}

function renderFixtures() {
    const fixtures = DataManager.load().fixtures;
    const container = document.getElementById('fixturesList');

    if (fixtures.length === 0) {
        container.innerHTML = '<p class="empty-state">No fixtures added yet</p>';
        return;
    }

    container.innerHTML = fixtures
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map(fixture => `
            <div class="data-item fixture-item">
                <div class="item-info">
                    <div class="fixture-date-time">
                        ${formatDate(fixture.date)} at ${formatTime(fixture.time)}
                    </div>
                    <h4>KTM vs ${fixture.opponent}</h4>
                    <p><strong>Competition:</strong> ${fixture.type}</p>
                    <p><strong>Venue:</strong> ${fixture.venue} (${fixture.homeAway})</p>
                    ${fixture.ageGroup ? `<p><strong>Age Group:</strong> ${fixture.ageGroup}</p>` : ''}
                </div>
                <div class="item-actions">
                    <button class="btn btn-delete btn-small" onclick="deleteFixture(${fixture.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
}

function renderResults() {
    const results = DataManager.load().results;
    const container = document.getElementById('resultsList');

    if (results.length === 0) {
        container.innerHTML = '<p class="empty-state">No results added yet</p>';
        return;
    }

    container.innerHTML = results
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(result => {
            const ktmWon = result.ktmGoals > result.opponentGoals;
            return `
                <div class="data-item">
                    <div class="item-info">
                        <p>${formatDate(result.date)}</p>
                        <div class="result-score">
                            KTM <span style="color: ${ktmWon ? '#22c55e' : '#666'};">${result.ktmGoals}</span> - 
                            <span style="color: ${!ktmWon ? '#22c55e' : '#666'};">${result.opponentGoals}</span> ${result.opponent}
                        </div>
                        <p><strong>Competition:</strong> ${result.competition}</p>
                        ${result.info ? `<p><strong>Goalscorers:</strong> ${result.info}</p>` : ''}
                    </div>
                    <div class="item-actions">
                        <button class="btn btn-delete btn-small" onclick="deleteResult(${result.id})">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `;
        }).join('');
}

function deleteFixture(id) {
    if (confirm('Delete this fixture?')) {
        const fixtures = DataManager.load().fixtures.filter(f => f.id !== id);
        DataManager.save('fixtures', fixtures);
        renderFixtures();
    }
}

function deleteResult(id) {
    if (confirm('Delete this result?')) {
        const results = DataManager.load().results.filter(r => r.id !== id);
        DataManager.save('results', results);
        renderResults();
    }
}

// ===========================
// SQUAD MANAGEMENT FUNCTIONS
// ===========================

function addPlayer(e) {
    e.preventDefault();

    const player = {
        id: DataManager.getNextId('players'),
        name: document.getElementById('playerName').value,
        position: document.getElementById('playerPosition').value,
        age: parseInt(document.getElementById('playerAge').value),
        jersey: parseInt(document.getElementById('playerJersey').value),
        goals: parseInt(document.getElementById('playerGoals').value),
        assists: parseInt(document.getElementById('playerAssists').value),
        appearances: parseInt(document.getElementById('playerApps').value)
    };

    const players = DataManager.load().players;
    players.push(player);
    DataManager.save('players', players);

    renderPlayers();
    e.target.reset();
    alert('Player added successfully!');
}

function renderPlayers() {
    const players = DataManager.load().players;
    const container = document.getElementById('playersList');

    if (players.length === 0) {
        container.innerHTML = '<p class="empty-state">No players added yet</p>';
        return;
    }

    container.innerHTML = players
        .sort((a, b) => a.jersey - b.jersey)
        .map(player => `
            <div class="data-item">
                <div class="item-info">
                    <h4>#${player.jersey} ${player.name}</h4>
                    <p><strong>Position:</strong> ${player.position}</p>
                    <p><strong>Age:</strong> ${player.age} years</p>
                    <div class="player-stats">
                        <span><strong>Goals:</strong> ${player.goals}</span>
                        <span><strong>Assists:</strong> ${player.assists}</span>
                        <span><strong>Apps:</strong> ${player.appearances}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-delete btn-small" onclick="deletePlayer(${player.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
}

function deletePlayer(id) {
    if (confirm('Delete this player?')) {
        const players = DataManager.load().players.filter(p => p.id !== id);
        DataManager.save('players', players);
        renderPlayers();
    }
}

// ===========================
// NEWS & UPDATES FUNCTIONS
// ===========================

function addNews(e) {
    e.preventDefault();

    const news = {
        id: DataManager.getNextId('news'),
        category: document.getElementById('newsCategory').value,
        date: document.getElementById('newsDate').value,
        title: document.getElementById('newsTitle').value,
        content: document.getElementById('newsContent').value
    };

    const newsItems = DataManager.load().news;
    newsItems.push(news);
    DataManager.save('news', newsItems);

    renderNews();
    e.target.reset();
    document.getElementById('newsDate').value = new Date().toISOString().split('T')[0];
    alert('Article published successfully!');
}

function renderNews() {
    const newsItems = DataManager.load().news;
    const container = document.getElementById('newsList');

    if (newsItems.length === 0) {
        container.innerHTML = '<p class="empty-state">No articles published yet</p>';
        return;
    }

    container.innerHTML = newsItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(news => `
            <div class="data-item">
                <div class="news-item-content">
                    <div class="news-title">${news.title}</div>
                    <div class="news-meta">
                        <span class="badge">${news.category}</span>
                        <span>${formatDate(news.date)}</span>
                    </div>
                    <div class="news-excerpt">${truncateText(news.content, 150)}</div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-delete btn-small" onclick="deleteNews(${news.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
}

function deleteNews(id) {
    if (confirm('Delete this article?')) {
        const newsItems = DataManager.load().news.filter(n => n.id !== id);
        DataManager.save('news', newsItems);
        renderNews();
    }
}

// ===========================
// MEDIA FUNCTIONS
// ===========================

function addMedia(e) {
    e.preventDefault();

    const media = {
        id: DataManager.getNextId('media'),
        type: document.getElementById('mediaType').value,
        date: document.getElementById('mediaDate').value,
        title: document.getElementById('mediaTitle').value,
        duration: document.getElementById('mediaDuration').value
    };

    const mediaItems = DataManager.load().media;
    mediaItems.push(media);
    DataManager.save('media', mediaItems);

    renderMedia();
    e.target.reset();
    document.getElementById('mediaDate').value = new Date().toISOString().split('T')[0];
    alert('Media item added successfully!');
}

function renderMedia() {
    const mediaItems = DataManager.load().media;
    const container = document.getElementById('mediaList');

    if (mediaItems.length === 0) {
        container.innerHTML = '<p class="empty-state">No media items added yet</p>';
        return;
    }

    container.innerHTML = mediaItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(media => `
            <div class="data-item">
                <div class="media-item-content">
                    <div class="media-type-badge ${media.type}">${media.type}</div>
                    <h4>${media.title}</h4>
                    <p class="news-meta">
                        <span>${formatDate(media.date)}</span>
                        ${media.duration ? `<span>• ${media.duration}</span>` : ''}
                    </p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-delete btn-small" onclick="deleteMedia(${media.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
}

function deleteMedia(id) {
    if (confirm('Delete this media item?')) {
        const mediaItems = DataManager.load().media.filter(m => m.id !== id);
        DataManager.save('media', mediaItems);
        renderMedia();
    }
}

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
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatTime(timeString) {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}
