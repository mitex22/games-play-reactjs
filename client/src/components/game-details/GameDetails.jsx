import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import * as gamesAPI from "../../api/games-api";
import AuthContext from "../../contexts/authContext";
import { pathToUrl } from "../../utils/pathUtils";
import PATH from "../../paths/paths";
import * as commentsAPI from "../../api/commnets-api";

const GameDetails = () => {
    const navigate = useNavigate();

    const { userId } = useContext(AuthContext);

    const { gameId } = useParams('game');

    const [game, setGame] = useState({});

    const [comments, setComments] = useState([]);

    const [comment, setComment] = useState('');
    const commentInputHandler = (e) => {
        setComment(e.target.value);
    }

    useEffect(() => {
        (async () => {
            const result = await gamesAPI.getOne(gameId);

            setGame(result);
        })();

        (async () => {
            const result = await commentsAPI.getAll(gameId);

            setComments(result);
        })();
    }, [gameId]);

    const isOwner = userId === game._ownerId;

    const deleteButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}`);

        if (hasConfirmed) {
            await gamesAPI.gameDelete(gameId);

            navigate('/games');
        }
    }

    const commentSubmitHandler = async (e) => {
        e.preventDefault();

        const newComment = await commentsAPI.commentCreate(comment, gameId, userId);

        setComments(state => [...state, newComment]);
    }

    return (
        // <!--Details Page-->
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">

                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>

                <p className="text">{game.summary}</p>

                {/* <!-- Bonus ( for Guests and Users ) --> */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        {comments.map(({ _id, content }) => (
                            <li key={_id} className="comment">
                                <p>{content}</p>
                            </li>
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isOwner && (
                    <div className="buttons">
                        <Link to={pathToUrl(PATH.GAME_EDIT, { gameId })} className="button">Edit</Link>
                        <button className="button" onClick={deleteButtonClickHandler}>Delete</button>
                    </div>
                )}

            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            <article className="create-comment">
                <label>Add new comment:</label>
                <form className="form" onSubmit={commentSubmitHandler}>
                    <textarea
                        placeholder="Comment......"
                        name="comment"
                        onChange={commentInputHandler}
                        value={comment}
                    ></textarea>
                    <input className="btn submit" type="submit" value="Add Comment" />
                </form>
            </article>

        </section>
    )
}

export default GameDetails;