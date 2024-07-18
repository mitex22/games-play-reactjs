import * as request from "./requester";

const BASE_URL = 'http://localhost:3030/jsonstore/games';

export const getAll = async () => {
    const result = await request.get(BASE_URL);
    
    const games = Object.values(result);

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
    
    const games = Object.values(result).reverse().slice(0, 3);

    return games;
}