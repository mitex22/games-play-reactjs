import * as request from "./requester";

// const BASE_URL = 'http://localhost:3030/jsonstore/games';
const BASE_URL = 'http://localhost:3030/data/games';

export const getAll = async () => {
    const result = await request.get(BASE_URL);
    
    // 'http://localhost:3030/jsonstore/games'
    // const games = Object.values(result);

    // 'http://localhost:3030/data/games'
    const games = result;

    return games;
};

export const getOne = (gameId) => request.get(`${BASE_URL}/${gameId}`);

export const getLatest = async () => {
    // const query = new URLSearchParams({
    //     sortBy: `_createdOn desc`,
    //     offset: 0,
    //     pageSize: 3,
    // });

    // const query = encodeURIComponent(`offset=0&pageSize=3`);
    // console.log(query);
    // const result = await request.get(`${BASE_URL}?sortBy=_createdOn%20desc&${query}`);
    // return result;

    const result = await request.get(BASE_URL);
    
    // 'http://localhost:3030/jsonstore/games'
    // const games = Object.values(result).reverse().slice(0, 3);

    // 'http://localhost:3030/data/games'
    const games = result.reverse().slice(0, 3);

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

export const gameDelete = async (gameId) => request.del(`${BASE_URL}/${gameId}`);