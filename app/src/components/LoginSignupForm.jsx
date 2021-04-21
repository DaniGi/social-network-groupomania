import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import Loader from './Loader';

// eslint-disable-next-line import/no-extraneous-dependencies
const isEmpty = require('lodash/isEmpty');

const MIN_PSSWRD_LENGTH = 8;
const MAX_PSSWRD_LENGTH = 50;
const MIN_USERNAME_LENGTH = 5;
const MAX_USERNAME_LENGTH = 15;

// login and signup form, it checks input validity and displays errors if something wrong
export default function LoginSignupForm({
  page,
  onSubmit,
  emailCheck,
  usernameCheck,
  isPasswordCorrect,
  isUserActive,
  error,
  loading,
}) {
  const { register, errors, handleSubmit, watch } = useForm();
  const watchEmail = watch('email', '');
  const watchPassword = watch('password', '');

  return (
    <Container fluid className="background-groupomania py-5 py-xxl-6">
      <Row className="d-flex justify-content-center">
        <Col sm={8} md={6} lg={5} xl={4} className="col-xxl-3">
          <Form onSubmit={handleSubmit(onSubmit)} className="blur blur-white rounded p-4">
            <Form.Group controlId="formEmail" className="pb-2">
              <Form.Label className="lh-1">Email</Form.Label>
              <Form.Control
                className={!emailCheck && 'border-danger'}
                name="email"
                type="email"
                ref={register({
                  required: 'Email is required',
                  maxLength: { value: 100, message: 'Email too long' },
                  pattern: {
                    value: /[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[A-Za-z]{2,4}/,
                    message: 'Invalid email',
                  },
                })}
              />
              {errors.email && (
                <Form.Text className="text-danger">{errors.email.message}</Form.Text>
              )}
            </Form.Group>

            {page.name === 'signup' && (
              <Form.Group controlId="formUsername" className="pb-2">
                <Form.Label className="lh-1">Username</Form.Label>
                <Form.Control
                  className={!usernameCheck && 'border-danger'}
                  name="username"
                  type="username"
                  ref={register({
                    required: 'Username is required',
                    maxLength: { value: MAX_USERNAME_LENGTH, message: 'Username too long' },
                    minLength: { value: MIN_USERNAME_LENGTH, message: 'Username too short' },
                    pattern: {
                      value: /^\S*$/,
                      message: 'Spaces are not allowed',
                    },
                  })}
                />
                {errors.username && (
                  <Form.Text className="text-danger">{errors.username.message}</Form.Text>
                )}
              </Form.Group>
            )}

            <Form.Group controlId="formPassword" className="pb-2">
              <Form.Label className="lh-1">Password</Form.Label>
              <Form.Control
                className={!isPasswordCorrect && 'border-danger'}
                name="password"
                type="password"
                ref={register({
                  required: 'Password is required',
                  maxLength: { value: MAX_PSSWRD_LENGTH, message: 'Password too long' },
                  minLength: { value: MIN_PSSWRD_LENGTH, message: 'Password too short' },
                  pattern: {
                    value: /^\S*$/,
                    message: 'Spaces are not allowed',
                  },
                })}
              />
              {errors.password && (
                <Form.Text className="text-danger">{errors.password.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="pb-2">
              <Form.Text className="text-dark">
                {page.question}&nbsp;
                <Link to={`/${page.route}`} className="text-secondary text-decoration-none fw-bold">
                  {page.action}
                </Link>
              </Form.Text>
            </Form.Group>

            {loading ? (
              <Loader />
            ) : (
              <Button
                disabled={!watchEmail.length || !watchPassword.length || !isEmpty(errors)}
                variant="primary"
                type="submit"
                className="btn w-100"
              >
                {page.name === 'login' ? 'Log In' : 'Sign Up'}
              </Button>
            )}

            {!emailCheck && (
              <div className="text-danger text-center pt-3 fw-bold">
                {page.name === 'login' ? (
                  <p>
                    The email you entered doesn&#39;t belong to an account.
                    <br />
                    Please check your email and try again.
                  </p>
                ) : (
                  'Email already in use, choose another one.'
                )}
              </div>
            )}

            {!usernameCheck && (
              <div className="text-danger text-center pt-3 fw-bold">
                Username already in use, choose another one.
              </div>
            )}

            {!isPasswordCorrect && (
              <div className="text-danger text-center pt-3 fw-bold">
                Sorry, your password was incorrect. <br /> Please double-check your password.
              </div>
            )}

            {!isUserActive && (
              <div className="text-danger text-center pt-3 fw-bold">
                This account has been deleted. <br /> Please contact Support to reactivate it.
              </div>
            )}

            {error && (
              <div className="text-danger text-center pt-3 fw-bold">
                An error occurred. <br /> Please try again later.
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginSignupForm.defaultProps = {
  isPasswordCorrect: true,
  isUserActive: true,
  usernameCheck: true,
  error: false,
};

LoginSignupForm.propTypes = {
  loading: PropTypes.bool.isRequired,
  emailCheck: PropTypes.bool.isRequired,
  usernameCheck: PropTypes.bool,
  isPasswordCorrect: PropTypes.bool,
  isUserActive: PropTypes.bool,
  error: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  page: PropTypes.shape({
    name: PropTypes.oneOf(['login', 'signup']).isRequired,
    question: PropTypes.oneOf(["Don't have an account?", 'Have an account?']).isRequired,
    action: PropTypes.oneOf(['Sign Up', 'Log In']).isRequired,
    route: PropTypes.oneOf(['login', 'signup']).isRequired,
  }).isRequired,
};
