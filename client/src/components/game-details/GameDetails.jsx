import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import { useGetOneGame } from "../../hooks/useGames";
import { useGetAllComments } from "../../hooks/useComments";
import useForm from "../../hooks/useForm";

import AuthContext from "../../contexts/authContext";
import * as gamesAPI from "../../api/games-api";
import * as commentsAPI from "../../api/commnets-api";

import { pathToUrl } from "../../utils/pathUtils";
import PATH from "../../paths/paths";
import Comment from "../comment/Comment";

const CREATE_COMMENT_FORM_KEYS = {
    COMMENT: 'comment',
}

const GameDetails = () => {
    const navigate = useNavigate();

    const { userId, username, isAuthenticated } = useContext(AuthContext);

    const { gameId } = useParams();

    const [game] = useGetOneGame(gameId);

    const [comments, dispatch] = useGetAllComments(gameId);

    const isGameOwner = userId === game._ownerId;

    const [error, setError] = useState('');

    const deleteGameButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}?`);

        if (hasConfirmed) {
            await gamesAPI.gameDelete(gameId);

            navigate('/games');
        }
    }

    const commentSubmitHandler = async (values) => {

        if (values.comment.trim() === '') {
            return setError('Cannot submit empty comment!');
        }

        const newComment = await commentsAPI.commentCreate({ ...values, gameId });

        dispatch({ type: 'ADD_COMMENT', payload: { ...newComment, author: { username } } });

        setError('');

        values.comment = '';
    }

    const { values, onChange, onSubmit } = useForm(commentSubmitHandler, {
        [CREATE_COMMENT_FORM_KEYS.COMMENT]: '',
    });

    const delteCommentHandler = async (commentId) => {
        await commentsAPI.commentDelete(commentId);

        dispatch({ type: 'DELETE_COMMENT', payload: commentId });
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
                        {comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                {...comment}
                                userId={userId}
                                isAuthenticated={isAuthenticated}
                                gameId={gameId}
                                delteCommentHandler={delteCommentHandler}
                            />
                        ))}
                    </ul>

                    {comments.length === 0 && (
                        <p className="no-comment">No comments.</p>
                    )}
                </div>

                {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
                {isGameOwner && (
                    <div className="buttons">
                        <Link to={pathToUrl(PATH.GAME_EDIT, { gameId })} className="button">Edit</Link>
                        <button className="button" onClick={deleteGameButtonClickHandler}>Delete</button>
                    </div>
                )}

            </div>

            {/* <!-- Bonus --> */}
            {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
            {isAuthenticated && (
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form className="form" onSubmit={onSubmit}>
                        <textarea
                            placeholder="Comment......"
                            name="comment"
                            onChange={onChange}
                            value={values[CREATE_COMMENT_FORM_KEYS.COMMENT]}
                        ></textarea>

                        {error &&
                            <p>
                                <span>{error}</span>
                            </p>
                        }

                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}

        </section>
    )
}

export default GameDetails;