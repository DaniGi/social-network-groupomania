import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { UserContext } from '../contexts/UserContext';
import { useComments } from '../contexts/CommentsContext';

import AutogrowTextarea from './AutogrowTextarea';
import ModifyDeleteDropdown from './ModifyDeleteDropdown';
import AlertDismissible from './AlertDismissable';
import CommentBox from './CommentBox';
import ModifyCard from './ModifyCard';
import Loader from './Loader';
import LikeButton from './LikeButton';

import { getDateFormatted } from '../utils/dateFormatting';
import { GETRequest } from '../API/API';

export default function PostCard({ post }) {
  // Hooks
  const [setHasError] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isModifyingPost, setIsModifyingPost] = useState(false);

  // Form hooks
  const { handleSubmit, register } = useForm();

  // Global states
  const { user } = useContext(UserContext);
  const { commentsState, commentsDispatch } = useComments();

  // GETting post's comments
  useEffect(() => {
    async function fetchData() {
      const response = await GETRequest(`http://localhost:5000/posts/${post.id}/comments`);
      commentsDispatch({ type: 'get-post-comments', payload: { response } });
    }
    commentsDispatch({ type: 'is-loading' });
    fetchData();
  }, [commentsDispatch, post.id]);

  // const {
  //   data: newComment,
  //   error: POSTerror,
  //   isLoading: isLoadingPOST,
  //   hadleSubmit,
  // } = usePOSTRequest(`http://localhost:5000/posts/${post.id}/comments`);

  // const { data: newLike, error: LikeError, hadleSubmit: toggleLike } = usePOSTRequest(
  //   `http://localhost:5000/posts/${post.id}/likes`,
  // );

  // update global state user and post when data change
  // useEffect(() => {
  //   if (newLike.error) {
  //     setFailedDBRequest(true);
  //     return;
  //   }
  //   if (newLike.message === 'Liked') {
  //     const { likes, ...others } = user;
  //     const newLikes = [...likes, post.id];
  //     setUser({ ...others, likes: newLikes });
  //   } else if (newLike.message === 'Unliked') {
  //     const { likes, ...others } = user;
  //     const newLikes = remove(likes, (like) => like !== post.id);
  //     setUser({ ...others, likes: newLikes });
  //   }
  // const newPostList = state.posts.map((p) => {
  //   if (p.id === post.id) {
  //     if (newLike.message === 'Liked') {
  //       p.likesCount += 1;
  //     } else if (newLike.message === 'Unliked') {
  //       p.likesCount -= 1;
  //     }
  //   }
  //   return p;
  // });
  // // Update global state posts
  // setPosts(newPostList);
  // }, [newLike]);

  // update global state posts and commets hook when newComment change
  // useEffect(() => {
  //   if (newComment.error) {
  //     setFailedDBRequest(true);
  //   } else if (newComment.comment) {
  // Update post commentsCount property
  // const newPostList = state.posts.map((p) => {
  //   if (p.id === newComment.comment.postId) {
  //     p.commentsCount += 1;
  //   }
  //   return p;
  // });
  // Update global state posts and comments
  // setComments([...comments, newComment.comment]);
  // setPosts(newPostList);
  // set textarea value to empty string
  //     reset();
  //   }
  // }, [newComment]);

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
          {commentsState.error && <AlertDismissible setHasError={setHasError} />}

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

            {(post.username === user.name || user.isAdmin) && (
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
            <LikeButton userLiked={user.likes.includes(post.id)} toggleLike={() => {}} />
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

          {commentsState.isLoading ? (
            <Loader />
          ) : (
            <Form
              inline
              className="post-form d-flex align-items-center rounded-4 overflow-hidden p-1"
              onSubmit={handleSubmit(() => {})}
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
