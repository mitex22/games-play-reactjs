import React, { useContext, useEffect, useState } from 'react'

import * as likesAPI from "../../api/likes-api";
import AuthContext from '../../contexts/authContext';

const Comment = ({
    _ownerId,
    _id,
    comment,
    author,
    userId,
    isAuthenticated,
    delteCommentHandler
}) => {

    const { username } = useContext(AuthContext);

    const [likes, setLikes] = useState([]);

    useEffect(() => {
        likesAPI.getAll(_id)
            .then((likes) => {
                setLikes(likes);
            })

    }, [_id]);

    const likeItem = likes.find(like => like._ownerUsername === username);

    const deleteCommentButtonClickHandler = async (commentId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete this comment?`);

        if (hasConfirmed) {
            delteCommentHandler(commentId);
        }
    }

    const likeCommentButtonClickHandler = async (commentId) => {
        const newLike = await likesAPI.likeCreate(commentId, userId, username);

        setLikes(likes => [...likes, newLike]);
    }

    const dislikeCommentButtonClickHandler = async (likeItem) => {
        await likesAPI.likeRemove(likeItem._id);

        setLikes(likes => [...likes].filter((like) => (like._id !== likeItem._id)));
    }

    return (
        <li className="comment">
            <p>{author.username}: {comment}</p>
            {_ownerId === userId && <button className="button" onClick={() => deleteCommentButtonClickHandler(_id)}>Delete</button>}
            {_ownerId !== userId && isAuthenticated && !likeItem &&<button className="button" onClick={() => likeCommentButtonClickHandler(_id)}>Like</button>}
            {_ownerId !== userId && isAuthenticated && likeItem && <button className="button" onClick={() => dislikeCommentButtonClickHandler(likeItem)}>Dislike</button>}
        </li>
    )
}

export default Comment;