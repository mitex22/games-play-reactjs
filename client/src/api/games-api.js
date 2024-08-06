import * as request from "./requester";

const BASE_URL = 'http://localhost:3030/data/games';

export const getAll = async () => {
    const result = await request.get(BASE_URL);

    const games = result;

    return games;
};

export const getPortfolio = async (username) => {
    const query = new URLSearchParams({
        where: `_ownerUsername="${username}"`,
        load: `game=gameId:games`
    });

    const result = await request.get(`http://localhost:3030/data/portfolio?` + query);

    const games = result;

    return games;
};

export const getOne = (gameId) => request.get(`${BASE_URL}/${gameId}`);

export const getLatest = async () => {
    const result = await request.get(`${BASE_URL}?sortBy=_createdOn%20desc&pageSize=3`);

    const games = result;

    return games;
}

export const gameCreate = async (gameData) => {
    const result = await request.post(BASE_URL, gameData);

    return result;
};

export const gameEdit = async (gameId, gameData) => {
    const result = await request.put(`${BASE_URL}/${gameId}`, gameData);

    return result;
};

export const gameBuy = async (gameId, _ownerId, _ownerUsername) => {
    const result = await request.post('http://localhost:3030/data/portfolio', { gameId, _ownerId, _ownerUsername });

    return result;
};

export const gameSell = async (transactionId) => request.del(`http://localhost:3030/data/portfolio/${transactionId}`)

export const gameDelete = async (gameId) => request.del(`${BASE_URL}/${gameId}`);