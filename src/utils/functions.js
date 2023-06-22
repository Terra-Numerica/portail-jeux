const APIBaseURL = process.env.API_BASE_URL;

export async function getGames(params = "") {
    return await fetch(params === "" ? APIBaseURL : APIBaseURL + params).then((res) => res.json());
};

export async function getGame(jeuId) {
    return (await getJeux()).find((jeu) => jeu.id === jeuId);
};