import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { PostsReducer, initialState } from '../reducers/PostsReducer';

const PostsContext = createContext();

export const usePosts = () => {
  return useContext(PostsContext);
};

const PostsContextProvider = (props) => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <PostsContext.Provider value={value}>{props.children}</PostsContext.Provider>;
};

PostsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostsContextProvider;
