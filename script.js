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

    // Nollställ markerade knappar
    const buttons = document.querySelectorAll("#points-buttons button");
    buttons.forEach(btn => btn.classList.remove("selected"));
}

function setRating(value) {
    document.getElementById("rating").value = value;

    // Markera vald knapp visuellt
    const buttons = document.querySelectorAll("#points-buttons button");
    buttons.forEach(btn => {
        btn.classList.remove("selected");
        if (parseInt(btn.textContent) === value) {
            btn.classList.add("selected");
        }
    });
}

function submitRating() {
    const ratingValue = document.getElementById("rating").value;
    const rating = parseInt(ratingValue);
    const guess = parseInt(document.getElementById("guess").value);

    if (!ratingValue || isNaN(rating) || !guess || guess < 1) {
        alert("Välj ett giltigt poängvärde och gissad placering!");
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

    const sortedByRating = [...ratings].sort((a, b) => b.rating - a.rating);
    const toplist = document.getElementById("toplist");
    toplist.innerHTML = "";
    sortedByRating.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.song} – ${item.rating} poäng`;
        toplist.appendChild(li);
    });

    const sortedByGuess = [...ratings].sort((a, b) => a.guess - b.guess);
    const guesslist = document.getElementById("guesslist");
    guesslist.innerHTML = "";
    sortedByGuess.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.song} – Gissad placering: ${item.guess}`;
        guesslist.appendChild(li);
    });
}
