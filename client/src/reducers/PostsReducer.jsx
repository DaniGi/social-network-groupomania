const getAllPosts = (state, APIresponse) => {
  return { ...state, posts: APIresponse.posts };
};

const addPost = (state, APIresponse, user) => {
  const newPost = {
    ...APIresponse.post,
    username: user.name,
    profilePicture: user.profilePicture,
    commentsCount: 0,
  };

  return { ...state, posts: [newPost, ...state.posts] };
};

const deletePost = (state, APIresponse, id) => {
  const filteredPosts = state.posts.filter((post) => post.id !== id);
  return { ...state, posts: [...filteredPosts] };
};

const modifyPost = (state, APIresponse, element) => {
  // update modified post's properties
  const posts = state.posts.map((post) => {
    if (post.id !== element.id) return post;
    post.content = APIresponse.newContent;
    post.imageUrl = APIresponse.imageUrl;
    return post;
  });

  return { ...state, posts };
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

const increaseLikesCount = (state, id) => {
  const posts = state.posts.map((post) => {
    if (post.id === id) post.likesCount += 1;
    return post;
  });
  return { ...state, posts };
};

const decreaseLikesCount = (state, id) => {
  const posts = state.posts.map((post) => {
    if (post.id === id) post.likesCount -= 1;
    return post;
  });
  return { ...state, posts };
};

export const initialState = {
  posts: [],
};

export function PostsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'get-all-posts':
      return getAllPosts(state, payload.response);
    case 'add-post':
      return addPost(state, payload.response, payload.user);
    case 'delete-post':
      return deletePost(state, payload.response, payload.postId);
    case 'modify-post':
      return modifyPost(state, payload.response, payload.element);
    case 'increase-comments-count':
      return increaseCommentsCount(state, payload.id);
    case 'decrease-comments-count':
      return decreaseCommentsCount(state, payload.id);
    case 'increase-likes-count':
      return increaseLikesCount(state, payload.id);
    case 'decrease-likes-count':
      return decreaseLikesCount(state, payload.id);
    case 'clear-posts':
      return initialState;
    default:
      return state;
  }
}
