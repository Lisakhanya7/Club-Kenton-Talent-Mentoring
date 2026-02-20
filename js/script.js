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

function displayFixtures(fixtures) {
    const container = document.querySelector('.fixtures-wrapper');
    if (!container || fixtures.length === 0) return;

    const fixturesCol = container.querySelector('.fixtures-column:nth-child(1)');
    const fixturesList = fixturesCol.querySelector('.fixture-card').parentElement;
    
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
    
    if (fixturesHtml) {
        fixturesList.innerHTML = fixturesHtml;
    }
}

function displayResults(results) {
    const container = document.querySelector('.fixtures-wrapper');
    if (!container || results.length === 0) return;

    const resultsCol = container.querySelector('.fixtures-column:nth-child(2)');
    const resultsList = resultsCol.querySelector('.result-card').parentElement;
    
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
    
    if (resultsHtml) {
        resultsList.innerHTML = resultsHtml;
    }
}

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

    if (playersHtml) {
        container.innerHTML = playersHtml;
    }
}

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

    if (newsHtml) {
        container.innerHTML = newsHtml;
    }
}

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

    if (mediaHtml) {
        container.innerHTML = mediaHtml;
    }
}

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

// ===========================
// ORIGINAL SCRIPT FUNCTIONALITY
// ===========================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Here you would typically send the data to a backend service
        // For now, we'll show a success message
        showNotification('Message sent successfully! We will contact you soon.', 'success');
        
        // Reset the form
        this.reset();
    });
}

// Newsletter Subscription
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        showNotification('Thank you for subscribing!', 'success');
        this.reset();
    });
});

// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
            z-index: 10000;
            max-width: 400px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .notification-success {
            background-color: #22c55e;
        }

        .notification-error {
            background-color: #ef4444;
        }

        .notification-info {
            background-color: #3b82f6;
        }

        @keyframes slideIn {

            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll to Top Button
function createScrollToTopButton() {
    const btn = document.createElement('div');
    btn.className = 'scroll-up';
    btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTopButton();

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.program-card, .team-card, .testimonial-card, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// Counter Animation
function animateCounters() {
    const statBoxes = document.querySelectorAll('.stat-box h4');
    const speed = 200; // Adjust speed of animation

    statBoxes.forEach(box => {
        const target = parseInt(box.textContent);
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && current === 0) {
                const increment = target / speed;
                
                const timer = setInterval(() => {
                    current += increment;
                    
                    if (current >= target) {
                        box.textContent = box.textContent; // Keep original text
                        clearInterval(timer);
                    } else {
                        box.textContent = Math.floor(current) + '+';
                    }
                }, 10);
                
                observer.unobserve(box.parentElement);
            }
        }, { threshold: 0.5 });
        
        observer.observe(box.parentElement);
    });
}

// Call counter animation when page loads
window.addEventListener('load', animateCounters);

// Add loading state to form buttons
document.querySelectorAll('form button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        const originalText = this.textContent;
        
        // Add small delay to show feedback
        setTimeout(() => {
            this.textContent = originalText;
        }, 1000);
    });
});

// Lazy Loading Images (if images are added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Initialize all interactive elements
console.log('Kenton-On-Sea Football & Mentoring Club Website - Ready');
