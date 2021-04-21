import { useContext } from 'react';

import PostCard from '../components/PostCard';

import { usePosts } from '../contexts/PostsContext';
import { SearchContext } from '../contexts/SearchContext';

import { filterPosts } from '../utils/filterPosts';

export default function Home() {
  // Global states
  const { state } = usePosts();
  const { searchValue } = useContext(SearchContext);

  const filteredPost = filterPosts(state.posts, searchValue);

  return (
    <>
      {state.posts.length && filteredPost.length === 0 ? (
        <div className="text-muted">
          No posts found for your search:{' '}
          <span className="fw-bold text-primary">{searchValue}</span>
        </div>
      ) : (
        filteredPost.map((post) => <PostCard post={post} key={post.id} />)
      )}
    </>
  );
}
