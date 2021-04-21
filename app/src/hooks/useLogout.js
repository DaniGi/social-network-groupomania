import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import { useUser } from '../contexts/UserContext';
// import { CommentsContext } from '../contexts/CommentsContext';
// import { usePosts } from '../contexts/PostsContext';

import { SearchContext } from '../contexts/SearchContext';

export function useLogout() {
  const history = useHistory();
  const { dispatchUser } = useUser();
  // const { setComments } = useContext(CommentsContext);
  // const { state } = usePosts();
  const { setSearchValue } = useContext(SearchContext);

  // when user click Log Out button, clear localStorage, unset global state user
  function logOut() {
    localStorage.clear();
    dispatchUser({ type: 'clear-user' });
    setSearchValue('');
    history.push('/login');
  }

  return logOut;
}
