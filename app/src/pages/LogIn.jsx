import { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { useUser } from '../contexts/UserContext';
import LoginSignupForm from '../components/LoginSignupForm';
import { POSTRequest } from '../API/API';

const LOGIN_URL = 'http://localhost:5000/auth/login';

// login page info passed to child component
const PAGE = {
  name: 'login',
  question: "Don't have an account?",
  action: 'Sign Up',
  route: 'signup',
};

export default function LogIn() {
  // Global user state
  const { user, dispatchUser } = useUser();

  // States used to check all possible errors and to show custom error message
  const [userExists, setUserExists] = useState(true);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [failedDBConnection, setFailedDBConnection] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogInUser = async (e) => {
    setUserExists(true);
    setIsPasswordCorrect(true);
    setFailedDBConnection(false);
    setIsUserActive(true);
    setIsLoading(true);

    const response = await POSTRequest(LOGIN_URL, e, user.Id);

    switch (response.error) {
      case 'User not found':
        setUserExists(false);
        break;
      case 'Wrong password':
        setIsPasswordCorrect(false);
        break;
      case 'User account not active':
        setIsUserActive(false);
        break;
      case undefined:
        break;
      default:
        setFailedDBConnection(true);
    }
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      dispatchUser({ type: 'get-user', payload: { response } });
    }

    setIsLoading(false);
  };

  return (
    <>
      <LoginSignupForm
        page={PAGE}
        onSubmit={handleLogInUser}
        emailCheck={userExists}
        isPasswordCorrect={isPasswordCorrect}
        failedDBConnection={failedDBConnection}
        isUserActive={isUserActive}
        error={failedDBConnection}
        loading={isLoading}
      />
      {user.isLogged && <Redirect to="/" />}
    </>
  );
}
