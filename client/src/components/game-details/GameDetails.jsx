import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";

import * as gamesAPI from "../../api/games-api";
import AuthContext from "../../contexts/authContext";
import { pathToUrl } from "../../utils/pathUtils";
import PATH from "../../paths/paths";
import * as commentsAPI from "../../api/commnets-api";
import * as likesAPI from "../../api/likes-api";
import { useGetOneGame } from "../../hooks/useGames";
import { useGetAllComments } from "../../hooks/useComments";
import useForm from "../../hooks/useForm";

const CREATE_COMMENT_FORM_KEYS = {
    COMMENT: 'comment',
}

const GameDetails = () => {
    const navigate = useNavigate();

    const { userId, username, isAuthenticated } = useContext(AuthContext);

    const { gameId } = useParams();

    const [game] = useGetOneGame(gameId);

    const [comments, dispatch] = useGetAllComments(gameId);

    const commentSubmitHandler = async (values) => {
        const newComment = await commentsAPI.commentCreate({ ...values, gameId });

        dispatch({ type: 'ADD_COMMENT', payload: { ...newComment, author: { username } } })
    }

    const { values, onChange, onSubmit } = useForm(commentSubmitHandler, {
        [CREATE_COMMENT_FORM_KEYS.COMMENT]: '',
    });

    const isGameOwner = userId === game._ownerId;

    const deleteGameButtonClickHandler = async () => {
        const hasConfirmed = confirm(`Are you sure you want to delete ${game.title}?`);

        if (hasConfirmed) {
            await gamesAPI.gameDelete(gameId);

            navigate('/games');
        }
    }

    const deleteCommentButtonClickHandler = async (commentId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete this comment?`);

        if (hasConfirmed) {
            await commentsAPI.commentDelete(commentId);

            dispatch({ type: 'DELETE_COMMENT', payload: commentId });
        }
    }

    const likeCommentButtonClickHandler = async (commentId) => {
        const newLike = await likesAPI.likeCreate(commentId, userId, username);

        console.log(newLike)
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
                        {comments.map(({ _id, comment, author, _ownerId }) => (
                            <li key={_id} className="comment">
                                <p>{author.username}: {comment}</p>
                                {_ownerId === userId && <button className="button" onClick={() => deleteCommentButtonClickHandler(_id)}>Delete</button>}
                                {_ownerId !== userId && isAuthenticated && <button className="button" onClick={() => likeCommentButtonClickHandler(_id)}>Like</button>}
                            </li>
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
                        <input className="btn submit" type="submit" value="Add Comment" />
                    </form>
                </article>
            )}

        </section>
    )
}

export default GameDetails;