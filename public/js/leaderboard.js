export function updateLeaderboard(players) {
    const leaderboardDiv = document.getElementById('leaderboard');
    if (!leaderboardDiv) {
        console.error('Leaderboard div not found.');
        return;
    }

    // Create a fragment to minimize reflows
    const fragment = document.createDocumentFragment();

    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'leaderboard-entry';
        const roundedSize = Math.round(player.size);
        playerDiv.textContent = `${player.name}: ${roundedSize}`;
        
        // Add highlight effect for new or updated entries
        if (!leaderboardDiv.querySelector(`[data-id="${player.name}"]`)) {
            playerDiv.classList.add('highlight');
            setTimeout(() => playerDiv.classList.remove('highlight'), 800); // Remove highlight after animation
        }
        
        playerDiv.setAttribute('data-id', player.name); // Track entries by name
        fragment.appendChild(playerDiv);
    });

    // Clear and update leaderboard
    leaderboardDiv.innerHTML = '';
    leaderboardDiv.appendChild(fragment);

    console.log('Leaderboard updated with dynamic effects.');
}

export function drawLeaderboard() {
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.id = 'leaderboard';
    leaderboardDiv.className = 'leaderboard';

    document.body.appendChild(leaderboardDiv);

    console.log('Leaderboard drawn on the screen.');
}