import { useEffect, useState } from "react";
import * as gamesAPI from "../../api/games-api";
import GameListItem from "./game-list-item/GameListItem";

const GameList = () => {

    const [games, setGames] = useState([]);

    useEffect(() => {
        gamesAPI.getAll()
            .then((games) => setGames(games))
    }, []);

    return (
        // < !--Catalogue -- >
        <section id="catalog-page">
            <h1>All Games</h1>
            
            {/* <!-- Display div: with information about every game (if any) --> */}
            {games.map((game) => (
                <GameListItem
                    key={game._id}
                    {...game}
                />
            ))}

            {/* <!-- Display paragraph: If there is no games  --> */}
            <h3 className="no-articles">No articles yet</h3>
        </section>
    )
}

export default GameList;