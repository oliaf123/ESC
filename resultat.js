const API_URL = "https://sheetdb.io/api/v1/kspn2f0xcnhid";

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("results-container");
    container.innerHTML = "";

    // Gruppera per användare
    const grouped = {};
    data.forEach(row => {
      if (!grouped[row.namn]) grouped[row.namn] = [];
      grouped[row.namn].push(row);
    });

    // Sortera och visa varje användares röster
    Object.keys(grouped).forEach(namn => {
      const userDiv = document.createElement("div");
      userDiv.style.marginBottom = "30px";
      userDiv.innerHTML = `<h3>👤 ${namn}</h3><ul></ul>`;

      const ul = userDiv.querySelector("ul");

      grouped[namn].forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.låt} – ${entry.poäng} poäng (gissning: ${entry.gissning})`;
        ul.appendChild(li);
      });

      container.appendChild(userDiv);
    });
  })
  .catch(err => {
    document.getElementById("results-container").textContent =
      "Kunde inte hämta data 😢";
    console.error(err);
  });
