import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { CommentsReducer, initialState } from '../reducers/CommentsReducer';

const CommentsContext = createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

const CommentsContextProvider = (props) => {
  const [commentsState, commentsDispatch] = useReducer(CommentsReducer, initialState);
  const value = {
    commentsState,
    commentsDispatch,
  };

  return <CommentsContext.Provider value={value}>{props.children}</CommentsContext.Provider>;
};

CommentsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommentsContextProvider;
