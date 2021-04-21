import { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { POSTRequest } from '../API/API';

import LoginSignupForm from '../components/LoginSignupForm';
import { useUser } from '../contexts/UserContext';

const SIGNUP_URL = 'http://localhost:5000/auth/signup';

// signup page info passed to child component
const PAGE = {
  name: 'signup',
  question: 'Have an account?',
  action: 'Log In',
  route: 'login',
};

export default function SignUp() {
  const { user } = useUser();
  const history = useHistory();

  // States used to check all possible errors and to show custom error message
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUpUser = async (e) => {
    setIsEmailUnique(true);
    setIsUsernameUnique(true);
    setHasError(false);
    setIsLoading(true);

    const response = await POSTRequest(SIGNUP_URL, e, user.Id);

    if (response.message === 'Added User') {
      history.push('/login');
    } else if (response.errors && response.errors[0].message === 'email must be unique') {
      setIsEmailUnique(false);
    } else if (response.errors && response.errors[0].message === 'username must be unique') {
      setIsUsernameUnique(false);
    } else if (response.error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  return (
    <>
      <LoginSignupForm
        page={PAGE}
        onSubmit={handleSignUpUser}
        emailCheck={isEmailUnique}
        usernameCheck={isUsernameUnique}
        error={hasError}
        loading={isLoading}
      />
      {user.isLogged && <Redirect to="/" />}
    </>
  );
}
