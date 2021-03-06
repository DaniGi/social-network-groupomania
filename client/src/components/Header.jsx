import { Link, withRouter } from 'react-router-dom';
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import { useUser } from '../contexts/UserContext';
import { SearchContext } from '../contexts/SearchContext';
import CreatePostCard from './CreatePostCard';
import { useLogout } from '../hooks/useLogout';

function Header({ location }) {
  // Local states
  const [isCreating, setIsCreating] = useState(false);

  // Global states
  const { userState } = useUser();
  const { setSearchValue } = useContext(SearchContext);
  // when user click Log Out button, clear localStorage, unset global state user
  const logOut = useLogout();

  return (
    <div className="bg-primary text-white">
      {isCreating && <CreatePostCard setIsCreating={setIsCreating} />}

      <Container fluid="md">
        <Navbar collapseOnSelect expand="md" bg="primary" variant="dark">
          <Link to="/">
            <Navbar.Brand>
              <img alt="groupomania logo" src="/logo.png" className="d-inline-block align-top" />
            </Navbar.Brand>
          </Link>

          {userState.user.isLogged && (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="w-100 pt-2 pt-md-0 align-items-end flex-column align-items-sm-center flex-sm-row justify-content-sm-end">
                  {location.pathname !== '/user' && (
                    <Nav.Item className="me-md-2 rounded-4 w-230">
                      <Form
                        inline
                        className="post-form d-flex align-items-center rounded-4 overflow-hidden p-1"
                      >
                        <Form.Control
                          type="text"
                          placeholder="Search post by username..."
                          className="post-form__input mr-sm-2 bg-transparent border-0 rounded-4 text-white"
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                          }}
                        />
                      </Form>
                    </Nav.Item>
                  )}

                  <div className="pt-2 pt-sm-0 d-flex flex-row">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 0, hide: 0 }}
                      overlay={<Tooltip className="tooltip">Create</Tooltip>}
                    >
                      <Nav.Item
                        className="d-flex align-items-center p-25 mx-2 rounded-circle"
                        onClick={() => setIsCreating(true)}
                      >
                        <i className="icon icon-add" />
                      </Nav.Item>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 0, hide: 0 }}
                      overlay={
                        <Tooltip className="tooltip">
                          {userState.user.name ? userState.user.name : 'User'}
                        </Tooltip>
                      }
                    >
                      <Link to="/user" className="me-2">
                        {userState.user.profilePicture ? (
                          <Nav.Item className="d-flex align-items-center rounded-circle">
                            <div
                              className="bg-primary rounded-circle profile-picture profile-picture-header"
                              style={
                                userState.user.profilePicture && {
                                  backgroundImage: `url(${userState.user.profilePicture})`,
                                }
                              }
                            />
                          </Nav.Item>
                        ) : (
                          <Nav.Item className="d-flex align-items-center p-25  rounded-circle">
                            <i className="icon icon-profile fas fa-user fa-lg" />
                          </Nav.Item>
                        )}
                      </Link>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 0, hide: 0 }}
                      overlay={<Tooltip className="tooltip">Log Out</Tooltip>}
                    >
                      <Nav.Item
                        className="d-flex align-items-center p-25 rounded-circle"
                        onClick={logOut}
                      >
                        <i className="icon icon-logout" />
                      </Nav.Item>
                    </OverlayTrigger>
                  </div>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
      </Container>
    </div>
  );
}

Header.defaultProps = {
  location: {
    pathname: '',
  },
};

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

export default withRouter(Header);
