const songs = [
    { title: "1. Norge – Lighter" },
    { title: "2. Luxemburg – La Poupée Monte Le Son" },
    { title: "3. Estland – Espresso Macchiato" },
    { title: "4. Israel – New Day Will Rise" },
    { title: "5. Litauen – Tavo Akys" },
    { title: "6. Spanien – ESA DIVA" },
    { title: "7. Ukraina – Bird of Pray" },
    { title: "8. Storbritannien – What The Hell Just Happened?" },
    { title: "9. Österrike – Wasted Love" },
    { title: "10. Island – RÓA" },
    { title: "11. Lettland – Bur Man Laimi" },
    { title: "12. Nederländerna – C’est La Vie" },
    { title: "13. Finland – ICH KOMME" },
    { title: "14. Italien – Volevo Essere Un Duro" },
    { title: "15. Polen – GAJA" },
    { title: "16. Tyskland – Baller" },
    { title: "17. Grekland – Asteromáta" },
    { title: "18. Armenien – SURVIVOR" },
    { title: "19. Schweiz – Voyage" },
    { title: "20. Malta – SERVING" },
    { title: "21. Portugal – Deslocado" },
    { title: "22. Danmark – Hallucination" },
    { title: "23. Sverige – Bara Bada Bastu" },
    { title: "24. Frankrike – maman" },
    { title: "25. San Marino – Tutta L’Italia" },
    { title: "26. Albanien – Zjerm" }
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

    const buttons = document.querySelectorAll("#points-buttons button");
    buttons.forEach(btn => btn.classList.remove("selected"));
}

function setRating(value) {
    document.getElementById("rating").value = value;

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

    const currentSong = songs[currentIndex].title;

    // Skicka till SheetDB (Google Sheets via API)
    fetch("https://sheetdb.io/api/v1/kspn2f0xcnhid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data: [{
                namn: username,
                låt: currentSong,
                poäng: rating,
                gissning: guess
            }]
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Något gick fel vid uppladdning!");
        }
        return response.json();
    })
    .then(() => {
        ratings.push({
            song: currentSong,
            rating: rating,
            guess: guess
        });

        // 🎉 Konfetti efter varje låt
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.4 } });

        currentIndex++;
        showSong();
    })
    .catch(error => {
        alert("Fel vid uppladdning till molnet: " + error.message);
    });
}

function showResults() {
    document.getElementById("rating-section").classList.add("hidden");
    document.getElementById("result-section").classList.remove("hidden");

    const message = `Redo för Eurovision, ${username}!`;
    document.getElementById("final-message").textContent = message;

    // 🎉 Konfetti & 🎈 ballonger på slutet
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.4 } });
    createBalloons();

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

function createBalloons() {
    for (let i = 0; i < 10; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.left = `${Math.random() * 90 + 5}%`;
        balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 80%, 60%)`;
        document.body.appendChild(balloon);
        setTimeout(() => balloon.remove(), 6000);
    }
}
