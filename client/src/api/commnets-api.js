import * as request from "./requester";

const BASE_URL = 'http://localhost:3030/data/comments';

export const getAll = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `author=_ownerId:users`
    });

    const result = await request.get(`${BASE_URL}?${query}`);

    return result;
};

export const commentCreate = async (commentData) => {

    const result = await request.post(BASE_URL, commentData);

    return result;
};

export const commentDelete = async (commentId) => request.del(`${BASE_URL}/${commentId}`);