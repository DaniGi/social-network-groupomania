import { useHistory } from 'react-router-dom';
import { useContext } from 'react';

import { useUser } from '../contexts/UserContext';
import { useComments } from '../contexts/CommentsContext';
import { usePosts } from '../contexts/PostsContext';

import { SearchContext } from '../contexts/SearchContext';

export function useLogout() {
  const history = useHistory();
  const { userDispatch } = useUser();
  const { commentsDispatch } = useComments();
  const { dispatch } = usePosts();
  const { setSearchValue } = useContext(SearchContext);

  // when user click Log Out button, clear localStorage, user, comments and posts
  function logOut() {
    localStorage.clear();
    userDispatch({ type: 'clear-user' });
    commentsDispatch({ type: 'clear-comments' });
    dispatch({ type: 'clear-posts' });
    setSearchValue('');
    history.push('/login');
  }

  return logOut;
}
