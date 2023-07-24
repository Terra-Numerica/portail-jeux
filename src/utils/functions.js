const APIBaseURL = process.env.API_BASE_URL;

export async function getGames(params = "") {

    const jeux = await fetch(params === "" ? APIBaseURL : APIBaseURL + params)
        .then((res) => res.json())
        .catch((err) => console.log(err));

    return jeux.map((jeu) => {

        const illustration = jeu.illustration ? jeu.illustration : '/images/unknown_illustration.png';

        return {
            ...jeu,
            illustration
        }
    });
};

export async function getGame(jeuId) {
    return (await getJeux()).find((jeu) => jeu.id === jeuId);
};