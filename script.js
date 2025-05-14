const songs = [
    { title: "Låt 1 - Sverige" },
    { title: "Låt 2 - Italien" },
    { title: "Låt 3 - Frankrike" },
    { title: "Låt 4 - Norge" },
    { title: "Låt 5 - Spanien" }
];

let currentIndex = 0;
let username = "";
let ratings = [];

function startApp() {
    username = document.getElementById("username").value.trim();
    if (!username) {
        alert("Fyll i ditt namn!");
        return;
    }

    document.getElementById("name-section").classList.add("hidden");
    document.getElementById("rating-section").classList.remove("hidden");

    showSong();
}

function showSong() {
    if (currentIndex >= songs.length) {
        showResults();
        return;
    }

    document.getElementById("song-title").textContent = songs[currentIndex].title;
    document.getElementById("rating").value = "";
    document.getElementById("guess").value = "";
}

function submitRating() {
    const rating = parseInt(document.getElementById("rating").value);
    const guess = parseInt(document.getElementById("guess").value);

    if (!rating || rating < 1 || rating > 10 || !guess || guess < 1) {
        alert("Ange både betyg (1–10) och gissad placering!");
        return;
    }

    ratings.push({
        song: songs[currentIndex].title,
        rating: rating,
        guess: guess
    });

    currentIndex++;
    showSong();
}

function showResults() {
    document.getElementById("rating-section").classList.add("hidden");
    document.getElementById("result-section").classList.remove("hidden");
    document.getElementById("display-name").textContent = username;

    // Sortera efter rating
    const sortedByRating = [...ratings].sort((a, b) => b.rating - a.rating);
    const toplist = document.getElementById("toplist");
    sortedByRating.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.song} (betyg: ${item.rating})`;
        toplist.appendChild(li);
    });

    // Sortera efter gissad placering (1 bäst)
    const sortedByGuess = [...ratings].sort((a, b) => a.guess - b.guess);
    const guesslist = document.getElementById("guesslist");
    sortedByGuess.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.song} (gissning: ${item.guess})`;
        guesslist.appendChild(li);
    });
}
