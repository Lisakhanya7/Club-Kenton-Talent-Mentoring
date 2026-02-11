// ===========================
// LOAD ADMIN-MANAGED DATA
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    loadDashboardData();
});

function loadDashboardData() {
    const data = {
        fixtures: JSON.parse(localStorage.getItem('fixtures')) || [],
        results: JSON.parse(localStorage.getItem('results')) || [],
        players: JSON.parse(localStorage.getItem('players')) || [],
        news: JSON.parse(localStorage.getItem('news')) || [],
        media: JSON.parse(localStorage.getItem('media')) || []
    };

    displayFixtures(data.fixtures);
    displayResults(data.results);
    displayPlayers(data.players);
    displayNews(data.news);
    displayMedia(data.media);
}

// ===========================
// FIXTURES DISPLAY
// ===========================
function displayFixtures(fixtures) {
    const container = document.querySelector('.fixtures-wrapper .fixtures-column.upcoming');
    if (!container || fixtures.length === 0) return;

    const fixturesHtml = fixtures
        .filter(f => new Date(f.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3)
        .map(fixture => `
            <div class="fixture-card">
                <div class="fixture-date">
                    <span class="date">${getDateDay(fixture.date)}</span>
                    <span class="month">${getMonth(fixture.date)}</span>
                </div>
                <div class="fixture-details">
                    <h4>${fixture.type}</h4>
                    <p><strong>KTM vs ${fixture.opponent}</strong></p>
                    <p class="time"><i class="fas fa-clock"></i> ${formatTime(fixture.time)}</p>
                    <p class="venue"><i class="fas fa-map-marker-alt"></i> ${fixture.venue}</p>
                </div>
            </div>
        `).join('');

    container.innerHTML = fixturesHtml;
}

// ===========================
// RESULTS DISPLAY
// ===========================
function displayResults(results) {
    const container = document.querySelector('.fixtures-wrapper .fixtures-column.latest');
    if (!container || results.length === 0) return;

    const resultsHtml = results
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
        .map(result => `
            <div class="result-card">
                <div class="result-date">${formatDate(result.date)}</div>
                <div class="result-details">
                    <p class="result-competition">${result.competition}</p>
                    <p class="result-score">
                        <span style="color: ${result.ktmGoals > result.opponentGoals ? '#22c55e' : '#666'};">
                            KTM ${result.ktmGoals}
                        </span>
                        -
                        <span style="color: ${result.opponentGoals > result.ktmGoals ? '#22c55e' : '#666'};">
                            ${result.opponentGoals} ${result.opponent}
                        </span>
                    </p>
                    ${result.info ? `<p class="result-info">${result.info}</p>` : ''}
                </div>
            </div>
        `).join('');

    container.innerHTML = resultsHtml;
}

// ===========================
// PLAYERS DISPLAY
// ===========================
function displayPlayers(players) {
    const container = document.querySelector('.squad-grid');
    if (!container || players.length === 0) return;

    const playersHtml = players
        .sort((a, b) => a.jersey - b.jersey)
        .map(player => `
            <div class="player-card">
                <div class="player-image"><i class="fas fa-user-circle"></i></div>
                <h4>${player.name}</h4>
                <p class="player-position">${player.position}</p>
                <div class="player-stats">
                    <div class="stat">Jersey: ${player.jersey}</div>
                    ${player.goals ? `<div class="stat">Goals: ${player.goals}</div>` : ''}
                </div>
            </div>
        `).join('');

    container.innerHTML = playersHtml;
}

// ===========================
// NEWS DISPLAY
// ===========================
function displayNews(news) {
    const container = document.querySelector('.news-section');
    if (!container || news.length === 0) return;

    const newsHtml = news
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
        .map(item => `
            <div class="news-card">
                <h4>${item.title}</h4>
                <p>${item.content}</p>
                <small>${formatDate(item.date)}</small>
            </div>
        `).join('');

    container.innerHTML = newsHtml;
}

// ===========================
// MEDIA DISPLAY
// ===========================
function displayMedia(media) {
    const container = document.querySelector('.media-gallery');
    if (!container || media.length === 0) return;

    const mediaHtml = media
        .slice(0, 6)
        .map(item => `
            <div class="media-card">
                <img src="${item.url}" alt="${item.caption}">
                <p>${item.caption}</p>
            </div>
        `).join('');

    container.innerHTML = mediaHtml;
}

// ===========================
// HELPER FUNCTIONS
// ===========================
function getDateDay(dateStr) {
    return new Date(dateStr).getDate();
}

function getMonth(dateStr) {
    return new Date(dateStr).toLocaleString('default', { month: 'short' });
}

function formatTime(timeStr) {
    const [hour, minute] = timeStr.split(':');
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}
