const checkboxes = document.querySelectorAll("input[type='checkbox']");
const loadingMessage = document.getElementById('loading-message');
const errorMessage = document.getElementById('error-message');
const searchInput = document.querySelector("#search-bar");
const cards = document.querySelector(".cards");

let timer;

checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        clearTimeout(timer);
        timer = setTimeout(async () => await useSearcher(), 1000);
    });
});

searchInput.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(async () => await useSearcher(), 1000);
});

async function useSearcher() {

    const searchValues = Object.values(checkboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => `l=${checkbox.id.split('cycle')[1]}`);

    if (searchInput.value !== "") searchValues.push(`q=${searchInput.value.replaceAll(" ", "%20")}`);

    while (cards.firstChild) cards.removeChild(cards.firstChild);
    
    const jeux = await fetch("/jeux?" + searchValues.join("&")).then((res) => res.json());

    if (jeux.length === 0) return errorMessage.style.display = "flex";

    loadingMessage.style.display = "flex";
    errorMessage.style.display = "none";

    setTimeout(() => {
        loadingMessage.style.display = "none";
        jeux.forEach((jeu) => {
            cards.insertAdjacentHTML('beforeend', `
                        <div class="card">
                            <div class="card-top">
                                <img class="card-image" src="${jeu.illustration}" alt="${jeu.name}">
                                <h3 class="card-title">${jeu.name}</h3>
                                <p class="card-description">${jeu.description}</p>
                            </div>
                            <a href="${jeu.open_in_new_tab ? jeu.online_app_url : `/play/${jeu.id}`}" class="card-button" ${jeu.open_in_new_tab ? `target="_blank"` : ""}>Jouer</a>
                    </div>
                    `);
        });
    }, 1000);
};