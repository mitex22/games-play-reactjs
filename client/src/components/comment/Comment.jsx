import React, { useContext } from 'react'

import * as likesAPI from "../../api/likes-api";
import * as commentsAPI from "../../api/commnets-api";
import AuthContext from '../../contexts/authContext';
import { useGetAllComments } from '../../hooks/useComments';

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

    const deleteCommentButtonClickHandler = async (commentId) => {
        const hasConfirmed = confirm(`Are you sure you want to delete this comment?`);

        if (hasConfirmed) {
            delteCommentHandler(commentId);
        }
    }

    const likeCommentButtonClickHandler = async (commentId) => {
        const newLike = await likesAPI.likeCreate(commentId, userId, username);

        console.log(newLike)
    }

    return (
        <li className="comment">
            <p>{author.username}: {comment}</p>
            {_ownerId === userId && <button className="button" onClick={() => deleteCommentButtonClickHandler(_id)}>Delete</button>}
            {_ownerId !== userId && isAuthenticated && <button className="button" onClick={() => likeCommentButtonClickHandler(_id)}>Like</button>}
        </li>
    )
}

export default Comment