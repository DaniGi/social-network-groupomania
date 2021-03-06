import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Loader from './Loader';

import { useUser } from '../contexts/UserContext';
import { usePosts } from '../contexts/PostsContext';

import { GETRequest } from '../API/API';

const GET_ALL_POSTS_URL = 'http://localhost:5000/posts';

export default function PageWrapper(props) {
  // Hooks
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Global states
  const { userState } = useUser();
  const { postsState, postsDispatch } = usePosts();

  // Getting all posts
  useEffect(() => {
    async function fetchData() {
      const response = await GETRequest(GET_ALL_POSTS_URL);
      setIsLoading(false);
      if (response.error || response.message === 'Failed to fetch') {
        setHasError(true);
      } else {
        postsDispatch({ type: 'get-all-posts', payload: { response } });
      }
    }
    setIsLoading(true);
    setHasError(false);
    fetchData();
  }, [postsDispatch]);

  return (
    <>
      <Container fluid className="py-4 py-xxl-6">
        <Row className="d-flex justify-content-center">
          <Col sm={10} md={8} lg={6} xl={6} className="col-xxl-4">
            {(isLoading || (postsState.posts.length === 0 && !hasError)) && <Loader />}
            {!isLoading && hasError && (
              <div className="text-danger text-center pt-3 fw-bold">
                <i className="fas fa-exclamation rounded-circle border border-2 border-danger py-2 px-25" />{' '}
                <br />
                Something went wrong... <br />
                Sorry, try again later.
              </div>
            )}
            {!isLoading && !hasError && props.children}
          </Col>
        </Row>
      </Container>
      {!userState.user.isLogged && !userState.isLoading && <Redirect to="/login" />}
    </>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
