import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

export const UserContext = createContext({
  user: {
    Id: '',
    name: '',
    IsLogged: '',
    isAdmin: false,
    likes: [],
  },
  setUser: () => {},
});

const VERIFY_TOKEN_URL = 'http://localhost:5000/auth/verify';

const UserContextProvider = (props) => {
  const [user, setUser] = useState({
    Id: localStorage.getItem('userId') || '',
    name: '',
    isLogged: localStorage.getItem('token'),
    isAdmin: false,
    likes: [],
    profilePicture: null,
  });

  // Set global user data
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token) {
      return {
        Id: '',
        name: '',
        isLogged: false,
        isAdmin: false,
      };
    }

    // POST verify token data
    const verifyTokenData = fetch(VERIFY_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId }),
    });

    verifyTokenData
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          <Redirect to="/login" />;
        } else if (response.userName) {
          setUser({
            Id: userId,
            name: response.userName,
            isLogged: true,
            isAdmin: response.isAdmin,
            likes: response.likes,
            profilePicture: response.profilePicture,
          });
        }
      });
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>;
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContextProvider;
