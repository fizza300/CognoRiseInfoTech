const highScoresList = document.getElementById("highScoresList");

fetch('http://localhost:5000/api/highscores')
    .then(response => response.json())
    .then(highScores => {
        highScoresList.innerHTML = highScores
            .map(score => {
                return `<li class="high-score">${score.name} - ${score.score}</li>`;
            })
            .join("");
    })
    .catch(err => console.log('Error:', err));
