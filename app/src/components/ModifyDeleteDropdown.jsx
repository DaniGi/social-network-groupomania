import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import Dropdown from 'react-bootstrap/Dropdown';

import { usePosts } from '../contexts/PostsContext';
// import { CommentsContext } from '../contexts/CommentsContext';
import { UserContext } from '../contexts/UserContext';

import Loader from './Loader';

import { DELETERequest } from '../API/API';
import { useComments } from '../contexts/CommentsContext';

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// eslint-disable-next-line react/prop-types
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="dropdown-btn rounded-circle d-block"
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {/* Render custom icon here */}
    <i className="icon icon-dropdown d-inline-block align-text-top" />
    {children}
  </a>
));

// custom card dropdown, it contains delete and modify actions
export default function ModifyDeleteDropdown({ postId, commentId, deleteURL, setIsModifying }) {
  // Global state
  const { state, dispatch } = usePosts();
  const { commentsDispatch } = useComments();
  const { user } = useContext(UserContext);

  // DELETE post or comment handler
  const handleDeleteElement = async (e) => {
    e.preventDefault();
    const response = await DELETERequest(deleteURL, e, user.Id);
    // if (response.error) --> setHasError(true);
    if (response.message === 'Post deleted') {
      dispatch({ type: 'delete-post', payload: { response, postId } });
    } else if (response.message === 'Comment deleted') {
      commentsDispatch({ type: 'delete-comment', payload: { response, commentId } });
      dispatch({ type: 'decrease-comments-count', payload: { id: postId } });
    }
  };

  return (
    <>
      {state.isLoading ? (
        <Loader iconNumber={1} />
      ) : (
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic" as={CustomToggle} />

          <Dropdown.Menu style={{ minWidth: '0' }}>
            <Dropdown.Item onClick={() => setIsModifying(true)}>
              <i className="fas fa-pen text-primary" />
            </Dropdown.Item>
            <Dropdown.Item style={{ zIndex: 1 }} onClick={(event) => handleDeleteElement(event)}>
              <i className="fas fa-trash-alt text-danger" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

ModifyDeleteDropdown.defaultProps = {
  commentId: null,
};

ModifyDeleteDropdown.propTypes = {
  postId: PropTypes.number.isRequired,
  deleteURL: PropTypes.string.isRequired,
  setIsModifying: PropTypes.func.isRequired,
  commentId: PropTypes.number,
};
