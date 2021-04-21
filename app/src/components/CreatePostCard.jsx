import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { usePosts } from '../contexts/PostsContext';
import { UserContext } from '../contexts/UserContext';

import AutogrowTextarea from './AutogrowTextarea';
import Loader from './Loader';

import { useScrollBlock } from '../hooks/useScrollBlock'; // hook to allow/block scrolling
import { fileValidationSchema } from '../utils/fileValidation';
import { POSTRequest } from '../API/API';

const CREATE_POST_URL = 'http://localhost:5000/posts';

// Create post card that is displayed when user click on add button
export default function CreatePostCard() {
  const isScrollBlocked = useScrollBlock();

  // Global states
  const { user } = useContext(UserContext);
  const { state, dispatch } = usePosts();

  const { register, errors, watch, handleSubmit } = useForm({
    resolver: yupResolver(fileValidationSchema),
  });
  const watchTextarea = watch('textarea', '');

  const handleCreatePost = async (data, e) => {
    e.preventDefault();
    dispatch({ type: 'is-loading' });
    const response = await POSTRequest(CREATE_POST_URL, data, user.Id, true);
    dispatch({ type: 'add-post', payload: { response, user } });
  };

  return (
    <div className="create-post blur blur-blue" style={{ zIndex: '1' }}>
      <Row className="create-post__row">
        <Col sm={9} md={7} lg={6} xl={5} className="col-xxl-4">
          {isScrollBlocked && (
            <Card className="mb-3 h-50">
              <Card.Header className="d-flex justify-content-between align-items-center text-dark fw-bold">
                <div>Create Post</div>
                <button
                  type="button"
                  className="post-btn post-btn__close text-muted rounded-circle"
                  onClick={() => dispatch({ type: 'toogle-is-creating' })}
                >
                  <i className="fas fa-times fa-lg" />
                </button>
              </Card.Header>

              <Card.Body>
                <Form
                  onSubmit={handleSubmit(handleCreatePost)}
                  className="
                  d-flex
                  flex-column
                  rounded-4
                  overflow-hidden p-1"
                >
                  <Form.Group>
                    <AutogrowTextarea
                      message={`What's on your mind, ${user.name}?`}
                      bgColor="textarea"
                      register={register}
                      validationRules={{
                        required: true,
                      }}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.File className="text-dark mt-2" name="picture" ref={register({})} />
                    {errors.picture && (
                      <Form.Text className="text-danger">{errors.picture.message}</Form.Text>
                    )}
                  </Form.Group>

                  {state.isLoading ? (
                    <Loader />
                  ) : (
                    <Button
                      disabled={!watchTextarea.length}
                      variant="secondary"
                      type="submit"
                      className="border-0 w-100 my-2 text-white rounded-2"
                    >
                      Post
                    </Button>
                  )}
                </Form>

                {state.error && (
                  <div className="text-danger text-center fw-bold">
                    Sorry, there was an error creating your post. <br /> Please try again later.
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
