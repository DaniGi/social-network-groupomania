import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import { UserContext } from '../contexts/UserContext';
// import { CommentsContext } from '../contexts/CommentsContext';
// import { usePosts } from '../contexts/PostsContext';

import { SearchContext } from '../contexts/SearchContext';

export function useLogout() {
  const history = useHistory();
  // user global state, user = { Id, name, isLogged, isAdmin}
  const { setUser } = useContext(UserContext);
  // const { setComments } = useContext(CommentsContext);
  // const { state } = usePosts();
  const { setSearchValue } = useContext(SearchContext);

  // when user click Log Out button, clear localStorage, unset global state user
  function logOut() {
    localStorage.clear();
    // setComments([]);
    // setPosts([]);
    setUser({ Id: '', name: '', isLogged: false, isAdmin: '' });
    setSearchValue('');
    history.push('/login');
  }

  return logOut;
}
