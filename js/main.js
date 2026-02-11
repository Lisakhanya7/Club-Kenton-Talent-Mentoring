// ===========================
// MAIN WEBSITE - LOAD ADMIN DATA
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
    const container = document.querySelector('.fixtures-column:has(h3:contains("Upcoming"))');
    if (!container) return;

    const list = container.querySelector('.fixture-card');
    if (!list || fixtures.length === 0) return;

    const fixturesHtml = fixtures
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

    const firstFixture = container.querySelector('.fixture-card');
    firstFixture.parentNode.insertAdjacentHTML('afterend', fixturesHtml);
}

// ===========================
// RESULTS DISPLAY
// ===========================

function displayResults(results) {
    const container = document.querySelector('.fixtures-column:has(h3:contains("Latest"))');
    if (!container) return;

    const list = container.querySelector('.result-card');
    if (!list || results.length === 0) return;

    const resultsHtml = results
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3)
        .map(result => `
            <div class="result-card">
                <div class="result-date">${formatDate(result.date)}</div>
                <div class="result-details">
                    <p class="result-competition">${result.competition}</p>
                    <p class="result-score">
                        <span class="winner" style="color: ${result.ktmGoals > result.opponentGoals ? '#22c55e' : '#666'};">
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

    const firstResult = container.querySelector('.result-card');
    firstResult.parentNode.insertAdjacentHTML('afterend', resultsHtml);
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
                <div class="player-image">
                    <i class="fas fa-user-circle"></i>
                </div>
                <h4>${player.name}</h4>
                <p class="player-position">${player.position}</p>
                <div class="player-stats">
                    <div class="stat">
                        <span class="stat-label">Goals</span>
                        <span class="stat-value">${player.goals}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Assists</span>
                        <span class="stat-value">${player.assists}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Apps</span>
                        <span class="stat-value">${player.appearances}</span>
                    </div>
                </div>
                <p class="player-info">Age: ${player.age} | Jersey: ${player.jersey}</p>
            </div>
        `).join('');

    container.innerHTML = playersHtml;
}

// ===========================
// NEWS DISPLAY
// ===========================

function displayNews(newsItems) {
    const container = document.querySelector('.news-grid');
    if (!container || newsItems.length === 0) return;

    const newsHtml = newsItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(news => `
            <article class="news-card">
                <div class="news-category">${news.category}</div>
                <h3>${news.title}</h3>
                <p class="news-date"><i class="fas fa-calendar"></i> ${formatDate(news.date)}</p>
                <p class="news-excerpt">${truncateText(news.content, 200)}</p>
                <a href="#" class="read-more">Read Full Report →</a>
            </article>
        `).join('');

    container.innerHTML = newsHtml;
}

// ===========================
// MEDIA DISPLAY
// ===========================

function displayMedia(mediaItems) {
    const container = document.querySelector('.media-grid');
    if (!container || mediaItems.length === 0) return;

    const mediaHtml = mediaItems
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(media => `
            <div class="media-item ${media.type}">
                <div class="media-thumbnail">
                    <i class="fas ${getMediaIcon(media.type)}"></i>
                    <span class="media-label">${capitalizeFirst(media.type)}</span>
                </div>
                <h4>${media.title}</h4>
                <p class="media-meta">
                    ${media.duration ? `<span>${media.duration}</span>` : ''}
                    ${media.duration ? `<span>|</span>` : ''}
                    <span>${formatDate(media.date)}</span>
                </p>
            </div>
        `).join('');

    container.innerHTML = mediaHtml;
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

function getDateDay(dateString) {
    return new Date(dateString).getDate();
}

function getMonth(dateString) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[new Date(dateString).getMonth()];
}

function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function capitalizeFirst(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function getMediaIcon(type) {
    const icons = {
        'video': 'fa-play-circle',
        'photo': 'fa-image',
        'interview': 'fa-microphone'
    };
    return icons[type] || 'fa-image';
}

// Keep existing script functionality
// (Mobile menu toggle, smooth scrolling, etc.)

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// Scroll to top button
const scrollUpBtn = document.querySelector('.scroll-up');
if (scrollUpBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollUpBtn.classList.add('active');
        } else {
            scrollUpBtn.classList.remove('active');
        }
    });

    scrollUpBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}
