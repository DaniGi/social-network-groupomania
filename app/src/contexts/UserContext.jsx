import { createContext, useContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { UserReducer, initialState } from '../reducers/UserReducer';
import { POSTRequest } from '../API/API';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

const VERIFY_TOKEN_URL = 'http://localhost:5000/auth/verify';

const UserContextProvider = (props) => {
  const [userState, userDispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    async function fetchData() {
      const userId = localStorage.getItem('userId') || '';
      const response = await POSTRequest(VERIFY_TOKEN_URL, {}, userId);
      if (response.error || response.message === 'Failed to fetch') {
        <Redirect to="/login" />;
      } else {
        userDispatch({ type: 'get-user', payload: { response, userId } });
      }
    }
    userDispatch({ type: 'toggle-is-loading' });
    const token = localStorage.getItem('token');
    if (!token) return;
    fetchData();
    userDispatch({ type: 'toggle-is-loading' });
  }, []);

  const value = {
    userState,
    userDispatch,
  };

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
