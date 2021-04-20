import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { UserContext } from '../contexts/UserContext';

import Loader from './Loader';

import { useScrollBlock } from '../utils/useScrollBlock'; // hook to allow/block scrolling
import { usePOSTFormRequest } from '../utils/usePOSTFormRequest';
import { fileValidationSchema } from '../utils/fileValidation';

// eslint-disable-next-line import/no-extraneous-dependencies
const capitalize = require('lodash/capitalize');

// Modify post or comment card that is displayed when user click on modify button
export default function ModifyCard({ setIsModifying, title, modifyURL }) {
  const [blockScroll, allowScroll] = useScrollBlock();

  // when scroll is blocked, the width of the home page changes, and so does the width of the card (width: 100%).
  // To avoid seeing the card changing width when it becomes visible this state block its first rendering
  const [isScrollBlocked, SetIsScrollBlocked] = useState(false);

  // Blocking scroll on component mount, allowing scroll on component unmount
  useEffect(() => {
    blockScroll();
    SetIsScrollBlocked(true);
    return () => {
      allowScroll();
      SetIsScrollBlocked(false);
    };
  }, [blockScroll, allowScroll]);

  // Global States, user = { id, username, isLogged, isAdmin}
  const { user } = useContext(UserContext);

  // Form hooks
  const { watch, errors, register, handleSubmit } = useForm({
    resolver: yupResolver(fileValidationSchema),
  });

  const watchPicture = watch('picture', '');

  // Local Hooks
  const [failedDBRequest, setFailedDBRequest] = useState(false);

  // Requests Hook
  const { data, error, isLoading, hadleSubmit } = usePOSTFormRequest(modifyURL);

  // update post or comments content
  useEffect(() => {
    if (data.error) {
      setFailedDBRequest(true);
    } else if (data.message === 'User updated') {
      user.profilePicture = data.profile_picture;
      setIsModifying(false);
    }
  }, [data]);

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
                  onSubmit={handleSubmit(hadleSubmit)}
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

                {(failedDBRequest || error) && (
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
