// ===========================
// FIXTURES COMPONENT
// ===========================

const FixturesComponent = {
    /**
     * Display upcoming fixtures
     * @param {Array} fixtures - Array of fixture objects
     */
    displayUpcoming(fixtures) {
        const fixturesList = document.querySelector('.fixtures-column:nth-child(1)');
        if (!fixturesList) return;

        const container = fixturesList.querySelector('.fixture-card').parentElement;
        
        const upcomingFixtures = fixtures
            .filter(f => new Date(f.date) >= new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);

        if (upcomingFixtures.length === 0) return;

        const html = upcomingFixtures.map(fixture => `
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

        container.innerHTML = html;
    },

    /**
     * Display latest results
     * @param {Array} results - Array of result objects
     */
    displayResults(results) {
        const resultsList = document.querySelector('.fixtures-column:nth-child(2)');
        if (!resultsList) return;

        const container = resultsList.querySelector('.result-card').parentElement;
        
        const latestResults = results
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        if (latestResults.length === 0) return;

        const html = latestResults.map(result => `
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

        container.innerHTML = html;
    }
};
