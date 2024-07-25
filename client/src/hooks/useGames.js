import { useEffect, useState } from "react";

import * as gamesAPI from "../api/games-api";

export function useGetAllGames() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        (async () => {
            const result = await gamesAPI.getAll();

            setGames(result);
        })();
    }, []);

    return [games, setGames]
}

