import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CommentsContext = createContext({
  comments: [],
  setComments: () => {},
});

const CommentsContextProvider = (props) => {
  const [comments, setComments] = useState([]);

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {props.children}
    </CommentsContext.Provider>
  );
};

CommentsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommentsContextProvider;
