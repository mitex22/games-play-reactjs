import * as request from "./requester";

const BASE_URL = 'http://localhost:3030/data/comments';

export const getAll = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`
    });

    const result = await request.get(`${BASE_URL}?${query}`);

    return result;
};

export const commentCreate = async (content, gameId, userId) => {
    const result = await request.post(BASE_URL, { content, gameId, userId });

    return result;
};