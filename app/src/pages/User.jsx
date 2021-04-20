import { useState, useContext, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import PostCard from '../components/PostCard';
import ModifyCardProfilePicture from '../components/ModifyCardProfilePicture';

import { UserContext } from '../contexts/UserContext';
import { usePosts } from '../contexts/PostsContext';

import { CommentsContext } from '../contexts/CommentsContext';
import { SearchContext } from '../contexts/SearchContext';

import DeleteUserCard from '../components/DeleteUserCard';

export default function User() {
  // Global states
  const { user } = useContext(UserContext);
  const { state } = usePosts();
  const { setComments } = useContext(CommentsContext);
  const { setSearchValue } = useContext(SearchContext);

  // hook
  const [isDeletingUser, setIsDeletingUser] = useState(false);
  const [isModifyingProfilePicture, setIsModifyingProfilePicture] = useState(false);

  useEffect(() => {
    setComments([]);
    setSearchValue('');
  }, [setComments]);

  const userPosts = state.posts.filter((post) => post.username === user.name);

  return (
    <>
      {isDeletingUser && <DeleteUserCard setIsDeletingUser={setIsDeletingUser} />}

      {isModifyingProfilePicture && (
        <ModifyCardProfilePicture
          setIsModifying={setIsModifyingProfilePicture}
          title="profile picture"
          modifyURL="http://localhost:5000/auth/picture"
        />
      )}

      <Card className="mb-3 rounded-4">
        <Card.Body>
          <div className="d-flex flex-column flex-md-row align-items-center">
            <div className="d-flex flex-row align-items-center">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 0, hide: 0 }}
                overlay={<Tooltip className="tooltip">Modify</Tooltip>}
              >
                <button
                  type="button"
                  onClick={() => setIsModifyingProfilePicture(true)}
                  className="bg-primary me-2 profile-picture rounded-circle"
                  style={
                    user.profilePicture && {
                      backgroundImage: `url(${user.profilePicture})`,
                    }
                  }
                >
                  {!user.profilePicture && <i className="icon icon-profile fas fa-user fa-lg" />}
                </button>
              </OverlayTrigger>
              <div>
                <Card.Title className="mb-1">{user.name}</Card.Title>
                <Card.Subtitle>
                  {userPosts.length ? (
                    <div className="text-muted">
                      You have posted{' '}
                      <span className="fw-bold text-primary">{userPosts.length}</span> time
                      {userPosts.length > 1 && 's'}
                    </div>
                  ) : (
                    <div>No posts yet.</div>
                  )}
                </Card.Subtitle>
              </div>
            </div>
            <div className="ms-md-auto align-self-center mt-3 mt-md-0">
              <Button variant="outline-danger" onClick={() => setIsDeletingUser(true)}>
                <i className="fas fa-trash-alt fa-lg text-danger me-1" />
                DELETE ACCOUNT
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>

      {userPosts.map((post) => (
        <PostCard post={post} key={post.id} />
      ))}
    </>
  );
}
