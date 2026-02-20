// ===========================
// ADMIN MODULE
// ===========================
// This module contains all admin dashboard functionality

const AdminModule = {
    /**
     * Initialize admin dashboard
     */
    init() {
        this.setupNavigation();
        this.setupEventListeners();
        this.loadAllData();
        this.setDefaultDates();
    },

    /**
     * Setup admin section navigation
     */
    setupNavigation() {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(item.dataset.section);
            });
        });
    },

    /**
     * Switch between admin sections
     * @param {string} sectionId - Section ID to show
     */
    switchSection(sectionId) {
        document.querySelectorAll('.admin-section').forEach(s => 
            s.classList.remove('active')
        );
        document.querySelectorAll('.nav-item').forEach(n => 
            n.classList.remove('active')
        );

        const section = document.getElementById(sectionId);
        if (section) section.classList.add('active');

        const navItem = document.querySelector(`[data-section="${sectionId}"]`);
        if (navItem) navItem.classList.add('active');
    },

    /**
     * Set up all event listeners for forms
     */
    setupEventListeners() {
        // Fixture form
        const fixtureForm = document.getElementById('fixtureForm');
        if (fixtureForm) {
            fixtureForm.addEventListener('submit', (e) => this.addFixture(e));
        }

        // Result form
        const resultForm = document.getElementById('resultForm');
        if (resultForm) {
            resultForm.addEventListener('submit', (e) => this.addResult(e));
        }

        // Player form
        const playerForm = document.getElementById('playerForm');
        if (playerForm) {
            playerForm.addEventListener('submit', (e) => this.addPlayer(e));
        }

        // News form
        const newsForm = document.getElementById('newsForm');
        if (newsForm) {
            newsForm.addEventListener('submit', (e) => this.addNews(e));
        }

        // Media form
        const mediaForm = document.getElementById('mediaForm');
        if (mediaForm) {
            mediaForm.addEventListener('submit', (e) => this.addMedia(e));
        }

        // Clear data button
        const clearBtn = document.getElementById('clearDataBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearAllData());
        }
    },

    /**
     * Set today's date as default for date inputs
     */
    setDefaultDates() {
        const today = new Date().toISOString().split('T')[0];
        document.querySelectorAll('input[type="date"]').forEach(input => {
            if (!input.value) input.value = today;
        });
    },

    /**
     * Load and display all data
     */
    loadAllData() {
        const data = StorageManager.loadAll();
        this.displayFixtures(data.fixtures);
        this.displayResults(data.results);
        this.displayPlayers(data.players);
        this.displayNews(data.news);
        this.displayMedia(data.media);
        this.displayApplications(StorageManager.load('applications'));
    },

    // ===========================
    // FIXTURE FUNCTIONS
    // ===========================

    addFixture(e) {
        e.preventDefault();

        const fixture = {
            type: document.getElementById('fixtureType').value,
            date: document.getElementById('fixtureDate').value,
            time: document.getElementById('fixtureTime').value,
            opponent: document.getElementById('fixtureOpponent').value,
            venue: document.getElementById('fixtureVenue').value,
            ageGroup: document.getElementById('fixtureAgeGroup').value,
            homeAway: document.getElementById('fixtureHomeAway').value
        };

        StorageManager.addItem('fixtures', fixture);
        document.getElementById('fixtureForm').reset();
        this.displayFixtures(StorageManager.load('fixtures'));
        alert('Fixture added successfully!');
    },

    displayFixtures(fixtures) {
        const container = document.getElementById('fixturesList');
        if (!container) return;

        if (fixtures.length === 0) {
            container.innerHTML = '<p class="no-data">No fixtures added yet.</p>';
            return;
        }

        const html = fixtures
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map(fixture => `
                <div class="data-item">
                    <div class="item-info">
                        <strong>${fixture.type}</strong> - ${formatDate(fixture.date)} @ ${fixture.time}
                        <br/>
                        <small>KTM vs ${fixture.opponent} (${fixture.homeAway}) - ${fixture.venue}</small>
                    </div>
                    <button class="delete-btn" onclick="AdminModule.deleteFixture(${fixture.id})">Delete</button>
                </div>
            `).join('');

        container.innerHTML = html;
    },

    deleteFixture(id) {
        if (confirm('Delete this fixture?')) {
            StorageManager.removeItem('fixtures', id);
            this.displayFixtures(StorageManager.load('fixtures'));
        }
    },

    // ===========================
    // RESULT FUNCTIONS
    // ===========================

    addResult(e) {
        e.preventDefault();

        const result = {
            date: document.getElementById('resultDate').value,
            competition: document.getElementById('resultCompetition').value,
            opponent: document.getElementById('resultOpponent').value,
            ktmGoals: parseInt(document.getElementById('resultKTMGoals').value),
            opponentGoals: parseInt(document.getElementById('resultOpponentGoals').value),
            info: document.getElementById('resultInfo').value
        };

        StorageManager.addItem('results', result);
        document.getElementById('resultForm').reset();
        this.displayResults(StorageManager.load('results'));
        alert('Result added successfully!');
    },

    displayResults(results) {
        const container = document.getElementById('resultsList');
        if (!container) return;

        if (results.length === 0) {
            container.innerHTML = '<p class="no-data">No results added yet.</p>';
            return;
        }

        const html = results
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(result => `
                <div class="data-item">
                    <div class="item-info">
                        <strong>${formatDate(result.date)}</strong> - ${result.competition}
                        <br/>
                        <small>KTM ${result.ktmGoals} - ${result.opponentGoals} ${result.opponent}</small>
                        ${result.info ? `<br/><small>${result.info}</small>` : ''}
                    </div>
                    <button class="delete-btn" onclick="AdminModule.deleteResult(${result.id})">Delete</button>
                </div>
            `).join('');

        container.innerHTML = html;
    },

    deleteResult(id) {
        if (confirm('Delete this result?')) {
            StorageManager.removeItem('results', id);
            this.displayResults(StorageManager.load('results'));
        }
    },

    // ===========================
    // PLAYER FUNCTIONS
    // ===========================

    addPlayer(e) {
        e.preventDefault();

        const player = {
            name: document.getElementById('playerName').value,
            jersey: parseInt(document.getElementById('playerJersey').value),
            position: document.getElementById('playerPosition').value,
            age: parseInt(document.getElementById('playerAge').value),
            ageGroup: document.getElementById('playerAgeGroup').value
        };

        StorageManager.addItem('players', player);
        document.getElementById('playerForm').reset();
        this.displayPlayers(StorageManager.load('players'));
        alert('Player added successfully!');
    },

    displayPlayers(players) {
        const container = document.getElementById('playersList');
        if (!container) return;

        if (players.length === 0) {
            container.innerHTML = '<p class="no-data">No players added yet.</p>';
            return;
        }

        const html = players
            .sort((a, b) => a.jersey - b.jersey)
            .map(player => `
                <div class="data-item">
                    <div class="item-info">
                        <strong>#${player.jersey} - ${player.name}</strong>
                        <br/>
                        <small>${player.position} | Age: ${player.age} | Group: ${player.ageGroup}</small>
                    </div>
                    <button class="delete-btn" onclick="AdminModule.deletePlayer(${player.id})">Delete</button>
                </div>
            `).join('');

        container.innerHTML = html;
    },

    deletePlayer(id) {
        if (confirm('Delete this player?')) {
            StorageManager.removeItem('players', id);
            this.displayPlayers(StorageManager.load('players'));
        }
    },

    // ===========================
    // NEWS FUNCTIONS
    // ===========================

    addNews(e) {
        e.preventDefault();

        // Verify user is authenticated staff
        try {
            const staff = AuthService.verifyAccess();
            
            const news = {
                date: document.getElementById('newsDate').value,
                title: document.getElementById('newsTitle').value,
                content: document.getElementById('newsContent').value,
                category: document.getElementById('newsCategory').value,
                postedBy: staff.name,
                postedRole: staff.role,
                timestamp: new Date().toLocaleString()
            };

            StorageManager.addItem('news', news);
            document.getElementById('newsForm').reset();
            this.displayNews(StorageManager.load('news'));
            alert('✅ News posted successfully by ' + staff.name + '!');
        } catch (error) {
            alert('❌ ' + error.message);
        }
    },

    displayNews(newsItems) {
        const container = document.getElementById('newsList');
        if (!container) return;

        if (newsItems.length === 0) {
            container.innerHTML = '<p class="no-data">No news added yet.</p>';
            return;
        }

        const html = newsItems
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(item => `
                <div class="data-item">
                    <div class="item-info">
                        <strong>${item.title}</strong>
                        <br/>
                        <small>${formatDate(item.date)} | Category: ${item.category}</small>
                        <br/>
                        <small>Posted by: <strong>${item.postedBy}</strong> (${item.postedRole})</small>
                        <br/>
                        <small>${item.content.substring(0, 100)}...</small>
                    </div>
                    <button class="delete-btn" onclick="AdminModule.deleteNews(${item.id})">Delete</button>
                </div>
            `).join('');

        container.innerHTML = html;
    },

    deleteNews(id) {
        if (confirm('Delete this news?')) {
            StorageManager.removeItem('news', id);
            this.displayNews(StorageManager.load('news'));
        }
    },

    // ===========================
    // MEDIA FUNCTIONS
    // ===========================

    addMedia(e) {
        e.preventDefault();

        // Verify user is authenticated staff
        try {
            const staff = AuthService.verifyAccess();
            const mediaType = document.getElementById('mediaType').value;
            
            const media = {
                title: document.getElementById('mediaTitle').value,
                date: document.getElementById('mediaDate').value,
                type: mediaType,
                duration: document.getElementById('mediaDuration').value,
                uploadedBy: staff.name,
                uploadedRole: staff.role,
                timestamp: new Date().toLocaleString()
            };

            // Handle video file upload
            if (mediaType === 'video') {
                const fileInput = document.getElementById('mediaVideoFile');
                if (!fileInput.files || fileInput.files.length === 0) {
                    alert('❌ Please select an MP4 video file.');
                    return;
                }

                const file = fileInput.files[0];
                if (!file.name.toLowerCase().endsWith('.mp4')) {
                    alert('❌ Only MP4 files are supported.');
                    return;
                }

                if (file.size > 100 * 1024 * 1024) {
                    alert('❌ File size must be less than 100MB.');
                    return;
                }

                // Convert file to base64
                const reader = new FileReader();
                reader.onload = (event) => {
                    media.videoData = event.target.result;
                    media.fileName = file.name;
                    media.fileSize = file.size;
                    
                    StorageManager.addItem('media', media);
                    document.getElementById('mediaForm').reset();
                    document.getElementById('videoFileName').textContent = 'No file selected';
                    this.displayMedia(StorageManager.load('media'));
                    alert('✅ Video uploaded successfully by ' + staff.name + '!');
                };
                reader.readAsDataURL(file);
            } else {
                // Handle URL-based media (photos, interviews, etc.)
                media.url = document.getElementById('mediaUrl').value;
                if (!media.url && mediaType !== 'video') {
                    alert('❌ Please provide a URL for this media type.');
                    return;
                }

                StorageManager.addItem('media', media);
                document.getElementById('mediaForm').reset();
                this.displayMedia(StorageManager.load('media'));
                alert('✅ Media uploaded successfully by ' + staff.name + '!');
            }
        } catch (error) {
            alert('❌ ' + error.message);
        }
    },

    displayMedia(medias) {
        const container = document.getElementById('mediaList');
        if (!container) return;

        if (medias.length === 0) {
            container.innerHTML = '<p class="no-data">No media added yet.</p>';
            return;
        }

        const html = medias
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map(item => {
                let mediaContent = '';
                
                if (item.type === 'video' && item.videoData) {
                    mediaContent = `
                        <div style="margin-bottom: 1rem;">
                            <video width="100%" height="300" controls style="border-radius: 8px; background: #000;">
                                <source src="${item.videoData}" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    `;
                } else if (item.url) {
                    mediaContent = `<small><a href="${item.url}" target="_blank">View →</a></small>`;
                }

                return `
                    <div class="data-item">
                        <div class="item-info">
                            ${mediaContent}
                            <strong>${item.title}</strong>
                            <br/>
                            <small>${item.type.toUpperCase()} | ${formatDate(item.date)}</small>
                            ${item.duration ? `<br/><small>Duration: ${item.duration}</small>` : ''}
                            <br/>
                            <small>Uploaded by: <strong>${item.uploadedBy}</strong> (${item.uploadedRole})</small>
                        </div>
                        <button class="delete-btn" onclick="AdminModule.deleteMedia(${item.id})">Delete</button>
                    </div>
                `;
            }).join('');

        container.innerHTML = html;
    },

    deleteMedia(id) {
        if (confirm('Delete this media?')) {
            StorageManager.removeItem('media', id);
            this.displayMedia(StorageManager.load('media'));
        }
    },

    // ===========================
    // PROGRAM APPLICATIONS
    // ===========================

    displayApplications(applications) {
        const container = document.getElementById('applicationsList');
        if (!container) return;

        if (applications.length === 0) {
            container.innerHTML = '<p class="no-data">No applications submitted yet.</p>';
            return;
        }

        const html = applications
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(app => `
                <div class="data-item" style="padding: 1.5rem; margin-bottom: 1rem; background-color: #f9f9f9; border-left: 4px solid ${app.role === 'coach' ? '#a855f7' : '#0052a3'}; border-radius: 5px;">
                    <div class="item-info" style="flex: 1;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <strong style="font-size: 1.1rem;">${app.name}</strong>
                            <span style="background-color: ${app.role === 'coach' ? '#a855f7' : '#0052a3'}; color: white; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.85rem; font-weight: bold;">${app.role === 'coach' ? 'COACH' : 'PARTICIPANT'}</span>
                        </div>
                        <small style="color: #666; display: block; margin-bottom: 0.5rem;"><strong>Program:</strong> ${app.program}</small>
                        <small style="color: #666; display: block; margin-bottom: 0.5rem;"><strong>Email:</strong> ${app.email}</small>
                        <small style="color: #666; display: block; margin-bottom: 0.5rem;"><strong>Phone:</strong> ${app.phone}</small>
                        ${app.age ? `<small style="color: #666; display: block; margin-bottom: 0.5rem;"><strong>Age:</strong> ${app.age}</small>` : ''}
                        ${app.experience ? `<small style="color: #666; display: block; margin-bottom: 0.5rem;"><strong>Experience:</strong> ${app.experience}</small>` : ''}
                        ${app.message ? `<small style="color: #666; display: block; margin-bottom: 0.5rem;"><strong>Message:</strong> ${app.message}</small>` : ''}
                        <small style="color: #999;"><strong>Applied:</strong> ${formatDate(app.timestamp.split('T')[0])}</small>
                    </div>
                    <button class="delete-btn" onclick="AdminModule.deleteApplication(${app.id})">Remove</button>
                </div>
            `).join('');

        container.innerHTML = html;
    },

    filterApplications(role) {
        const allApplications = StorageManager.load('applications');
        const filtered = role === 'all' ? allApplications : allApplications.filter(app => app.role === role);
        this.displayApplications(filtered);
    },

    deleteApplication(id) {
        if (confirm('Remove this application?')) {
            StorageManager.removeItem('applications', id);
            this.displayApplications(StorageManager.load('applications'));
        }
    },

    exportApplications() {
        const applications = StorageManager.load('applications');
        if (applications.length === 0) {
            alert('No applications to export.');
            return;
        }

        let csv = 'Name,Email,Phone,Program,Role,Age,Experience,Message,Date Applied\n';
        applications.forEach(app => {
            csv += `"${app.name}","${app.email}","${app.phone}","${app.program}","${app.role}","${app.age || 'N/A'}","${(app.experience || 'N/A').replace(/"/g, '""')}","${(app.message || 'N/A').replace(/"/g, '""')}","${formatDate(app.timestamp.split('T')[0])}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `Club_KTM_Applications_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert('✅ Applications exported successfully!');
    },

    // ===========================
    // DATA MANAGEMENT
    // ===========================

    clearAllData() {
        if (confirm('Are you sure you want to delete ALL data? This cannot be undone!')) {
            StorageManager.clearAll();
            location.reload();
        }
    }
};

// Initialize admin when page loads
document.addEventListener('DOMContentLoaded', () => {
    AdminModule.init();
});
