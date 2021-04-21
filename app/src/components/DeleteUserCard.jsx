import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import { useScrollBlock } from '../hooks/useScrollBlock';
import { useUser } from '../contexts/UserContext';
import Loader from './Loader';
import { useLogout } from '../hooks/useLogout';
import { DELETERequest } from '../API/API';

export default function DeleteUserCard({ setIsDeletingUser }) {
  const isScrollBlocked = useScrollBlock();

  // when user click Log Out button, clear localStorage, unset global state user
  const logOut = useLogout();

  // Global states
  const { userState } = useUser();

  // Local hooks
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);
  const [sayGoodbye, setSayGoodbye] = useState(false);

  // Form hooks
  const { watch, register, handleSubmit } = useForm();
  const watchPassword = watch('password', '');

  const handleDeleteUser = async (data, e) => {
    e.preventDefault();
    setHasError(false);
    setIsPasswordCorrect(true);

    setIsLoading(true);
    const response = await DELETERequest(
      `http://localhost:5000/auth/${userState.user.id}`,
      data,
      userState.user.Id,
    );
    setIsLoading(false);

    if (response.error === 'Wrong password') {
      setIsPasswordCorrect(false);
    } else if (response.error || response.message === 'Failed to fetch') {
      setHasError(true);
    } else if (response.message === 'User deleted') {
      setSayGoodbye(true);
      setTimeout(() => {
        setSayGoodbye(false);
        setIsDeletingUser(false);
        logOut();
      }, 4000);
    }
  };

  return (
    <div className="create-post blur blur-blue" style={{ zIndex: '1' }}>
      <Row className="create-post__row">
        <Col sm={9} md={7} lg={6} xl={5} className="col-xxl-4">
          {isScrollBlocked && (
            <Card className="mb-3 h-50">
              {sayGoodbye ? (
                <Card.Body>
                  <Card.Text className="text-primary text-center fw-bold">
                    You are being redirected to the <span className="fw-bold">Log In</span> page..{' '}
                    <span className="text-secondary">Goodbye !</span>
                  </Card.Text>
                  <Loader />
                </Card.Body>
              ) : (
                <>
                  <Card.Header className="d-flex justify-content-between align-items-center text-dark fw-bold">
                    <div className="text-danger">ARE YOU SURE ?</div>
                    <button
                      type="button"
                      className="post-btn post-btn__close text-muted rounded-circle"
                      onClick={() => setIsDeletingUser(false)}
                    >
                      <i className="fas fa-times fa-lg" />
                    </button>
                  </Card.Header>

                  <Card.Body>
                    <Card.Text className="mb-2 text-center fw-bold">
                      Once you delete you account, there is no getting it back.
                      <br />
                      Make sure you want to do this.
                    </Card.Text>
                    <Form onSubmit={handleSubmit(handleDeleteUser)}>
                      <Form.Group controlId="formPassword" className="pb-2">
                        <Form.Control
                          aria-label="confirm password"
                          name="password"
                          type="password"
                          ref={register()}
                          placeholder="Enter your password to confirm"
                        />
                      </Form.Group>

                      {isLoading ? (
                        <Loader />
                      ) : (
                        <Button
                          disabled={!watchPassword.length}
                          variant="secondary"
                          type="submit"
                          className="border-0 w-100 my-2 text-white rounded-2"
                        >
                          <i className="fas fa-trash-alt fa-lg me-1" />
                          DELETE ACCOUNT
                        </Button>
                      )}
                    </Form>

                    {hasError && (
                      <div className="text-danger text-center fw-bold">
                        Sorry, there was an error deleting your account. <br /> Please try again
                        later.
                      </div>
                    )}

                    {!isPasswordCorrect && (
                      <div className="text-danger text-center fw-bold">
                        Your password was incorrect. <br /> Please double-check your password.
                      </div>
                    )}
                  </Card.Body>
                </>
              )}
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

DeleteUserCard.propTypes = {
  setIsDeletingUser: PropTypes.func.isRequired,
};
