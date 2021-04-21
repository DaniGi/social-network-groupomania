import { useState, useEffect } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import LoginSignupForm from '../components/LoginSignupForm';
import { useUser } from '../contexts/UserContext';
import { usePOSTRequest } from '../utils/usePOSTRequest';

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
  const [failedDBConnection, setFailedDBConnection] = useState(false);

  // signup POST request
  const { data, isLoading, error, hadleSubmit } = usePOSTRequest(SIGNUP_URL);

  // update global state posts when data change
  useEffect(() => {
    setIsEmailUnique(true);
    setIsUsernameUnique(true);
    setFailedDBConnection(false);
    if (data.message === 'Added User') {
      history.push('/login');
    } else if (data.errors && data.errors[0].message === 'email must be unique') {
      setIsEmailUnique(false);
    } else if (data.errors && data.errors[0].message === 'username must be unique') {
      setIsUsernameUnique(false);
    } else if (data.error) {
      setFailedDBConnection(true);
    }
  }, [data, history]);

  return (
    <>
      <LoginSignupForm
        page={PAGE}
        onSubmit={hadleSubmit}
        emailCheck={isEmailUnique}
        usernameCheck={isUsernameUnique}
        failedDBConnection={failedDBConnection}
        error={error}
        loading={isLoading}
      />
      {user.isLogged && <Redirect to="/" />}
    </>
  );
}
