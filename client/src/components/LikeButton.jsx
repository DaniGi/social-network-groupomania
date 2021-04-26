import PropTypes from 'prop-types';

export default function LikeButton({ userLiked, toggleLike }) {
  return (
    <button
      type="button"
      className={`post-btn w-49 p-1 rounded text-${userLiked ? 'secondary' : 'muted'}`}
      onClick={() => toggleLike(userLiked)}
    >
      {userLiked ? <i className="fas fa-thumbs-up p-1" /> : <i className="far fa-thumbs-up p-1" />}
      {userLiked ? 'Liked!' : 'Like'}
    </button>
  );
}

LikeButton.propTypes = {
  userLiked: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
};
