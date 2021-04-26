import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useUser } from '../contexts/UserContext';

import ModifyDeleteDropdown from './ModifyDeleteDropdown';
import ModifyCard from './ModifyCard';

import { getDateFormatted } from '../utils/dateFormatting';

export default function CommentBox({ comment, postId, setHasError }) {
  const { userState } = useUser();
  const [isModifyingComment, setIsModifyingComment] = useState(false);

  return (
    <>
      {isModifyingComment && (
        <ModifyCard
          setIsModifying={setIsModifyingComment}
          element={comment}
          title="comment"
          modifyURL={`http://localhost:5000/comments/${comment.id}`}
        />
      )}

      <div className="post-comment d-flex justify-content-between align-items-center mt-2 px-3 py-2 rounded-4">
        <div className="mw-90">
          <h6 className="mb-1">
            {comment.username}&nbsp;·&nbsp;
            <span className="text-muted">{getDateFormatted(comment.created_at)}</span>
          </h6>

          <p className="m-0">{comment.content}</p>
        </div>

        {(comment.username === userState.user.name || userState.user.isAdmin) && (
          <ModifyDeleteDropdown
            postId={postId}
            commentId={comment.id}
            setHasError={setHasError}
            setIsModifying={setIsModifyingComment}
            deleteURL={`http://localhost:5000/comments/${comment.id}`}
          />
        )}
      </div>
    </>
  );
}

CommentBox.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  postId: PropTypes.number.isRequired,
  setHasError: PropTypes.func.isRequired,
};
