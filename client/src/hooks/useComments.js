import { useEffect, useState } from "react";

import * as commentsAPI from "../api/commnets-api";

export function useGetAllComments(gameId) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await commentsAPI.getAll(gameId);

            setComments(result);
        })();
    }, [gameId]);

    return [comments, setComments]
}
