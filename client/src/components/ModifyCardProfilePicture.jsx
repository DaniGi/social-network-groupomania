import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useUser } from '../contexts/UserContext';
import { usePosts } from '../contexts/PostsContext';

import Loader from './Loader';

import { useScrollBlock } from '../hooks/useScrollBlock'; // hook to allow/block scrolling
import { fileValidationSchema } from '../utils/fileValidation';
import { POSTRequest } from '../API/API';

// eslint-disable-next-line import/no-extraneous-dependencies
const capitalize = require('lodash/capitalize');

// Modify post or comment card that is displayed when user click on modify button
export default function ModifyCard({ setIsModifying, title, modifyURL }) {
  const isScrollBlocked = useScrollBlock();

  // Global States
  const { userState, userDispatch } = useUser();
  const { postsDispatch } = usePosts();

  // Form hooks
  const { watch, errors, register, handleSubmit } = useForm({
    resolver: yupResolver(fileValidationSchema),
  });

  const watchPicture = watch('picture', '');

  // Local states
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleModifyProfilePicture = async (data, e) => {
    e.preventDefault();
    setHasError(false);

    setIsLoading(true);
    const response = await POSTRequest(modifyURL, data, userState.user.Id, true);
    setIsLoading(false);

    if (response.error || response.message === 'Failed to fetch') {
      setHasError(true);
    } else if (response.message === 'User updated') {
      userDispatch({
        type: 'modify-profile-picture',
        payload: { profilePicture: response.profile_picture },
      });
      postsDispatch({
        type: 'modify-profile-picture',
        payload: { profilePicture: response.profile_picture, username: userState.user.name },
      });
      setIsModifying(false);
    }
  };

  return (
    <div className="create-post blur blur-blue" style={{ zIndex: '1' }}>
      <Row className="create-post__row">
        <Col sm={9} md={7} lg={6} xl={5} className="col-xxl-4">
          {isScrollBlocked && (
            <Card className="mb-3 h-50">
              <Card.Header className="d-flex justify-content-between align-items-center text-dark fw-bold">
                <div>Modify {title}</div>
                <button
                  type="button"
                  className="post-btn post-btn__close text-muted rounded-circle"
                  onClick={() => setIsModifying(false)}
                >
                  <i className="fas fa-times fa-lg" />
                </button>
              </Card.Header>

              <Card.Body>
                <Form
                  onSubmit={handleSubmit(handleModifyProfilePicture)}
                  className="
                  d-flex
                  flex-column
                  overflow-hidden"
                >
                  <Form.Group>
                    <Form.File className="text-dark" name="picture" ref={register({})} />
                    {errors.picture && (
                      <Form.Text className="text-danger">{errors.picture.message}</Form.Text>
                    )}
                  </Form.Group>

                  {isLoading ? (
                    <Loader />
                  ) : (
                    <Button
                      disabled={!watchPicture.length}
                      variant="secondary"
                      type="submit"
                      className="border-0 w-100 my-2 text-white rounded-2"
                    >
                      {capitalize('modify')}
                    </Button>
                  )}
                </Form>

                {hasError && (
                  <div className="text-danger text-center fw-bold">
                    Sorry, there was an error updating your {capitalize(title)}. <br /> Please try
                    again later.
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
}

ModifyCard.propTypes = {
  setIsModifying: PropTypes.func.isRequired,
  modifyURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
