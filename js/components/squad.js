// ===========================
// SQUAD/PLAYERS COMPONENT
// ===========================

const SquadComponent = {
    /**
     * Display player squad
     * @param {Array} players - Array of player objects
     */
    display(players) {
        const container = document.querySelector('.squad-grid');
        if (!container || players.length === 0) return;

        const html = players
            .sort((a, b) => a.jersey - b.jersey)
            .map(player => `
                <div class="player-card">
                    <div class="player-image">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h4>${player.name}</h4>
                    <p class="jersey-number">#${player.jersey}</p>
                    <p class="position">${player.position}</p>
                    <p class="age">${player.age} years</p>
                </div>
            `).join('');

        container.innerHTML = html;
    }
};
