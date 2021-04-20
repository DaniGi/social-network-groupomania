const getAllPosts = (state, APIresponse) => {
  if (!APIresponse) {
    return { ...state, error: APIresponse.response.error };
  }
  return { ...state, posts: APIresponse.posts, isLoading: false };
};

const addPost = (state, APIresponse) => {
  if (!APIresponse) {
    return { ...state, error: APIresponse.response.error };
  }
  return { ...state, posts: [APIresponse, ...state.posts], isLoading: false };
};

const deletePost = (state, APIresponse, id) => {
  if (!APIresponse) {
    return { ...state, error: APIresponse.response.error };
  }
  const filteredPosts = state.posts.filter((post) => post.id !== id);
  return { ...state, posts: [...filteredPosts], isLoading: false };
};

export const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

export function PostsReducer(state, action) {
  switch (action.type) {
    case 'get-all-posts':
      return getAllPosts(state, action.payload.response);
    case 'add-post':
      return addPost(state, action.payload.response);
    case 'delete-post': {
      return deletePost(state, action.payload.response, action.payload.id);
    }
    case 'modify-post':
      return {};
    case 'is-loading':
      return { ...state, isLoading: true };
    case 'action-completed':
      return { ...state, isLoading: false };
    default:
      throw new Error();
  }
}
