import * as request from "./requester";

const BASE_URL = 'http://localhost:3030/data/likes';

export const getAll = async (commentId) => {
    const query = new URLSearchParams({
        where: `commentId="${commentId}"`
    });

    const result = await request.get(`${BASE_URL}?${query}`);

    return result;
};

export const likeCreate = async (commentId, _ownerId, _ownerUsername) => {
    const result = await request.post(BASE_URL, { commentId, _ownerId, _ownerUsername });

    return result;
};