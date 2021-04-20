const getAllPosts = (state, APIresponse) => {
  if (APIresponse.message || APIresponse.error) {
    const error = `error: ${APIresponse.message || APIresponse.error}`;
    return { ...state, error, isLoading: false };
  }
  return { ...state, posts: APIresponse.posts, isLoading: false };
};

const addPost = (state, APIresponse, user) => {
  if (APIresponse.message || APIresponse.error) {
    const error = `error: ${APIresponse.message || APIresponse.error}`;
    return { ...state, error, isLoading: false };
  }
  const newPost = {
    ...APIresponse.post,
    username: user.name,
    profilePicture: user.profilePicture,
    commentsCount: 0,
  };

  return { ...state, posts: [newPost, ...state.posts], isLoading: false, isCreating: false };
};

const deletePost = (state, APIresponse, id) => {
  if (!APIresponse || APIresponse.error) {
    const error = APIresponse.error ? APIresponse.error : 'Error deleting post';
    return { ...state, error, isLoading: false };
  }
  const filteredPosts = state.posts.filter((post) => post.id !== id);
  return { ...state, posts: [...filteredPosts], isLoading: false };
};

const modifyPost = (state, APIresponse, element) => {
  if (APIresponse.error) {
    const error = `error: ${APIresponse.message || APIresponse.error}`;
    return { ...state, error, isLoading: false };
  }
  // update modified post's properties
  const posts = state.posts.map((post) => {
    if (post.id !== element.id) return post;
    post.content = APIresponse.newContent;
    post.imageUrl = APIresponse.imageUrl;
    return post;
  });

  return { posts, isLoading: false };
};

const increaseCommentsCount = (state, id) => {
  const posts = state.posts.map((post) => {
    if (post.id === id) post.commentsCount += 1;
    return post;
  });
  return { ...state, posts };
};

const decreaseCommentsCount = (state, id) => {
  const posts = state.posts.map((post) => {
    if (post.id === id) post.commentsCount -= 1;
    return post;
  });
  return { ...state, posts };
};

export const initialState = {
  posts: [],
  isLoading: false,
  error: null,
  isCreating: false,
};

export function PostsReducer(state, action) {
  switch (action.type) {
    case 'get-all-posts':
      return getAllPosts(state, action.payload.response);
    case 'add-post':
      return addPost(state, action.payload.response, action.payload.user);
    case 'delete-post':
      return deletePost(state, action.payload.response, action.payload.postId);
    case 'modify-post':
      return modifyPost(state, action.payload.response, action.payload.element);
    case 'increase-comments-count':
      return increaseCommentsCount(state, action.payload.id);
    case 'decrease-comments-count':
      return decreaseCommentsCount(state, action.payload.id);
    case 'is-loading':
      return { ...state, isLoading: true };
    case 'action-completed':
      return { ...state, isLoading: false };
    case 'toogle-is-creating':
      return { ...state, isCreating: !state.isCreating, error: null };
    default:
      throw new Error();
  }
}
