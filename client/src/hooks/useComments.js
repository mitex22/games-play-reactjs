import { useEffect, useReducer } from "react";

import * as commentsAPI from "../api/commnets-api";

function commentsReducer(state, action) {
    switch (action.type) {
        case 'GET_ALL':
            return action.payload.slice();
        case 'ADD_COMMENT':
            return [...state, action.payload];
        case 'DELETE_COMMENT':
            return state.filter(comment => comment._id !== action.payload);
        default:
            return state;
    }
}

export function useGetAllComments(gameId) {
    const [comments, dispatch] = useReducer(commentsReducer, []);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(gameId);

            dispatch({ type: 'GET_ALL', payload: result });
        })();
    }, [gameId]);

    return [comments, dispatch]
}
