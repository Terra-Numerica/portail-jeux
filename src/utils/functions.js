const APIBaseURL = process.env.API_BASE_URL;

export async function getGames(params = "") {
    return await fetch(params === "" ? APIBaseURL : APIBaseURL + params).then((res) => res.json());
};