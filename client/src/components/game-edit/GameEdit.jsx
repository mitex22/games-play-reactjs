import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import * as gamesAPI from "../../api/games-api";

const GameEdit = () => {

    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: '',
    });

    useEffect(() => {
        gamesAPI.getOne(gameId)
            .then(result => {
                setGame(result);
            });
    }, [gameId]);

    const editGameSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await gamesAPI.gameEdit(gameId, values);

            navigate('/games');
        } catch (err) {
            // Error notification
            console.log(err);
        }
    }

    const onChange = (e) => {
        setGame(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    return (
        // <!-- Edit Page ( Only for the creator )-->
        <section id="edit-page" className="auth">
            <form id="edit" onSubmit={editGameSubmitHandler}>
                <div className="container">

                    <h1>Edit Game</h1>

                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" value={game.title} onChange={onChange} placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" value={game.category} onChange={onChange} placeholder="Enter game category..." />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" value={game.maxLevel} onChange={onChange} min="1" placeholder="1" />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" value={game.imageUrl} onChange={onChange} placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" value={game.summary} onChange={onChange} id="summary"></textarea>
                    <input className="btn submit" type="submit" value="Edit Game" />

                </div>
            </form>
        </section>
    )
}

export default GameEdit;