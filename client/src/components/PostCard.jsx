import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { useUser } from '../contexts/UserContext';
import { useComments } from '../contexts/CommentsContext';
import { usePosts } from '../contexts/PostsContext';

import AutogrowTextarea from './AutogrowTextarea';
import ModifyDeleteDropdown from './ModifyDeleteDropdown';
import AlertDismissible from './AlertDismissable';
import CommentBox from './CommentBox';
import ModifyCard from './ModifyCard';
import Loader from './Loader';
import LikeButton from './LikeButton';

import { getDateFormatted } from '../utils/dateFormatting';
import { GETRequest, POSTRequest } from '../API/API';

export default function PostCard({ post }) {
  // Hooks
  const [hasError, setHasError] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isModifyingPost, setIsModifyingPost] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form hooks
  const { handleSubmit, register } = useForm();

  // Global states
  const { userState, userDispatch } = useUser();
  const { commentsState, commentsDispatch } = useComments();
  const { postsDispatch } = usePosts();

  // GETting post's comments
  useEffect(() => {
    async function fetchData() {
      const response = await GETRequest(`http://localhost:5000/posts/${post.id}/comments`);
      if (response.error || response.message === 'Failed to fetch') {
        setHasError(true);
      } else {
        commentsDispatch({ type: 'get-post-comments', payload: { response } });
      }
    }
    setIsLoading(true);
    setHasError(false);
    fetchData();
    setIsLoading(false);
  }, [commentsDispatch, post.id]);

  const handleAddComment = async (data, e) => {
    e.preventDefault();
    setIsLoading(true);
    setHasError(false);
    const response = await POSTRequest(
      `http://localhost:5000/posts/${post.id}/comments`,
      data,
      userState.user.Id,
    );
    if (response.error || response.message === 'Failed to fetch') {
      setHasError(true);
    } else {
      commentsDispatch({ type: 'add-comment', payload: { response } });
      postsDispatch({ type: 'increase-comments-count', payload: { id: post.id } });
    }

    setIsLoading(false);
  };

  const toggleLike = async (data) => {
    setHasError(false);

    const response = await POSTRequest(
      `http://localhost:5000/posts/${post.id}/likes`,
      data,
      userState.user.Id,
    );

    if (response.error || response.message === 'Failed to fetch') {
      setHasError(true);
      return;
    }

    if (response.message === 'Liked') {
      userDispatch({ type: 'add-like', payload: { postId: post.id } });
      postsDispatch({ type: 'increase-likes-count', payload: { id: post.id } });
    } else if (response.message === 'Unliked') {
      userDispatch({ type: 'remove-like', payload: { postId: post.id } });
      postsDispatch({ type: 'decrease-likes-count', payload: { id: post.id } });
    }
  };

  return (
    <>
      {isModifyingPost && (
        <ModifyCard
          element={post}
          title="post"
          modifyURL={`http://localhost:5000/posts/${post.id}`}
          setIsModifying={setIsModifyingPost}
        />
      )}

      <Card className="mb-3 rounded-4">
        <Card.Body>
          {hasError && <AlertDismissible setHasError={setHasError} />}

          <div className="d-flex justify-content-between mb-1">
            <div className="d-flex flex-row align-items-center ">
              <div
                className="bg-primary rounded-circle me-2 profile-picture"
                style={
                  post.profilePicture && {
                    backgroundImage: `url(${post.profilePicture})`,
                  }
                }
              >
                {!post.profilePicture && <i className="icon icon-profile fas fa-user fa-lg" />}
              </div>

              <div>
                <Card.Title className="mb-1">{post.username}</Card.Title>
                <Card.Subtitle className="mb-1 text-muted">
                  {getDateFormatted(post.created_at)}
                </Card.Subtitle>
              </div>
            </div>

            {(post.username === userState.user.name || userState.user.isAdmin) && (
              <ModifyDeleteDropdown
                postId={post.id}
                setHasError={setHasError}
                setIsModifying={setIsModifyingPost}
                deleteURL={`http://localhost:5000/posts/${post.id}`}
              />
            )}
          </div>

          <Card.Text className="mb-1">{post.content}</Card.Text>

          {post.imageUrl && <Card.Img variant="top" src={post.imageUrl} />}

          {post.likesCount > 0 && (
            <Card.Text className="my-1">
              <i className="post-likes far fa-thumbs-up rounded-circle bg-secondary text-white" />{' '}
              <span className="text-muted">{post.likesCount}</span>
            </Card.Text>
          )}

          <hr className="my-2" />

          <div className="d-flex justify-content-around">
            <LikeButton
              userLiked={userState.user.likes.includes(post.id)}
              toggleLike={toggleLike}
            />
            <button type="button" className="post-btn w-49 p-1 rounded text-muted">
              <i className="fas fa-share" /> Share
            </button>
          </div>

          <hr className="my-2" />

          {post.commentsCount > 0 && (
            <Card.Subtitle className="mb-2 text-muted" onClick={() => setToggle(!toggle)}>
              <div className="post-view">
                {toggle ? 'Hide' : 'View'} {post.commentsCount}{' '}
                {post.commentsCount === 1 ? 'comment' : 'comments'}
              </div>
            </Card.Subtitle>
          )}

          {isLoading ? (
            <Loader />
          ) : (
            <Form
              inline
              className="post-form d-flex align-items-center rounded-4 overflow-hidden p-1"
              onSubmit={handleSubmit(handleAddComment)}
            >
              <AutogrowTextarea
                message="Write a comment..."
                bgColor="transparent"
                register={register}
                validationRules={{
                  required: true,
                }}
              />

              <button type="submit" className="post-btn post-btn__send text-muted rounded-circle">
                <i className="far fa-paper-plane" />
              </button>
            </Form>
          )}

          {toggle &&
            commentsState.comments
              .filter((c) => c.postId === post.id)
              .map((comment) => {
                return (
                  <CommentBox
                    key={comment.id}
                    comment={comment}
                    postId={post.id}
                    setHasError={setHasError}
                  />
                );
              })}
        </Card.Body>
      </Card>
    </>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profilePicture: PropTypes.string,
    commentsCount: PropTypes.number.isRequired,
    likesCount: PropTypes.number.isRequired,
  }).isRequired,
};
