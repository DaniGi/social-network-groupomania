import { useContext } from 'react';

import PostCard from '../components/PostCard';

import { usePosts } from '../contexts/PostsContext';
import { SearchContext } from '../contexts/SearchContext';

import { filterPosts } from '../utils/filterPosts';

export default function Home() {
  // Global states
  const { postsState } = usePosts();
  const { searchValue } = useContext(SearchContext);

  const filteredPost = filterPosts(postsState.posts, searchValue);

  return (
    <>
      {postsState.posts.length && filteredPost.length === 0 ? (
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
