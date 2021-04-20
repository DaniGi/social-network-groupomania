import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';
import LoginSignupForm from '../components/LoginSignupForm';
import { usePOSTRequest } from '../utils/usePOSTRequest';

const LOGIN_URL = 'http://localhost:5000/auth/login';

// login page info passed to child component
const PAGE = {
  name: 'login',
  question: "Don't have an account?",
  action: 'Sign Up',
  route: 'signup',
};

export default function LogIn() {
  const { user, setUser } = useContext(UserContext);

  // States used to check all possible errors and to show custom error message
  const [userExists, setUserExists] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [failedDBConnection, setFailedDBConnection] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);

  // login POST request
  const { data, isLoading, error, hadleSubmit } = usePOSTRequest(LOGIN_URL);

  // update global state posts when data change
  useEffect(() => {
    setUserExists(true);
    setIsPasswordCorrect(true);
    setFailedDBConnection(false);
    setIsUserActive(true);
    if (data.error === 'User not found') {
      setUserExists(false);
    } else if (data.error === 'Wrong password') {
      setIsPasswordCorrect(false);
    } else if (data.error === 'User account not active') {
      setIsUserActive(false);
    } else if (data.error) {
      setFailedDBConnection(true);
    } else if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);

      setUser({
        Id: data.userId,
        name: data.userName,
        isLogged: true,
        isAdmin: data.isAdmin,
        likes: data.likes,
        profilePicture: data.profilePicture,
      });
    }
  }, [data, setUser]);

  return (
    <>
      <LoginSignupForm
        page={PAGE}
        onSubmit={hadleSubmit}
        emailCheck={userExists}
        isPasswordCorrect={isPasswordCorrect}
        failedDBConnection={failedDBConnection}
        isUserActive={isUserActive}
        error={error}
        loading={isLoading}
      />
      {user.isLogged && <Redirect to="/" />}
    </>
  );
}
