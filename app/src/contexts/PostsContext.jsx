import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { PostsReducer, initialState } from '../reducers/PostsReducer';
import { GETRequest } from '../API/API';

const GET_ALL_POSTS_URL = 'http://localhost:5000/posts';

const PostsContext = createContext();

export const usePosts = () => {
  return useContext(PostsContext);
};

const PostsContextProvider = (props) => {
  const [state, dispatch] = useReducer(PostsReducer, initialState);

  // Getting all posts
  useEffect(() => {
    async function fetchData() {
      const response = await GETRequest(GET_ALL_POSTS_URL);
      dispatch({ type: 'get-all-posts', payload: { response } });
    }
    dispatch({ type: 'is-loading' });
    fetchData();
  }, [dispatch]);

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
