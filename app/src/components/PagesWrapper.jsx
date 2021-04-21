import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Loader from './Loader';

import { useUser } from '../contexts/UserContext';
import { usePosts } from '../contexts/PostsContext';
// import { CommentsContext } from '../contexts/CommentsContext';

export default function PageWrapper(props) {
  // Global states
  const { user } = useUser();
  const { state } = usePosts();
  // const { setComments } = useContext(CommentsContext);

  // useEffect(() => {
  //   setComments([]);
  // }, [setComments]);

  return (
    <>
      <Container fluid className="py-4 py-xxl-6">
        <Row className="d-flex justify-content-center">
          <Col sm={10} md={8} lg={6} xl={6} className="col-xxl-4">
            {state.isLoading && <Loader />}
            {!state.isLoading && state.error && (
              <div className="text-danger text-center pt-3 fw-bold">
                <i className="fas fa-exclamation rounded-circle border border-2 border-danger py-2 px-25" />{' '}
                <br />
                Something went wrong... <br />
                Sorry, try again later.
              </div>
            )}
            {!state.isLoading && !state.error && props.children}
          </Col>
        </Row>
      </Container>
      {!user.isLogged && <Redirect to="/login" />}
    </>
  );
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
