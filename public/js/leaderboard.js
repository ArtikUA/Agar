export function updateLeaderboard(players) {
    const leaderboardDiv = document.getElementById('leaderboard');
    if (!leaderboardDiv) {
        console.error('Leaderboard div not found.');
        return;
    }

    // Clear existing content
    leaderboardDiv.innerHTML = '';

    // Create and append player entries with rounded size values
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.className = 'leaderboard-entry';
        // Round the player's size to the nearest integer before displaying
        const roundedSize = Math.round(player.size);
        playerDiv.textContent = `${player.name}: ${roundedSize}`;
        leaderboardDiv.appendChild(playerDiv);
    });

    console.log('Leaderboard updated with rounded size values.');
}

export function drawLeaderboard() {
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.id = 'leaderboard';
    leaderboardDiv.className = 'leaderboard';

    document.body.appendChild(leaderboardDiv);

    console.log('Leaderboard drawn on the screen.');
}