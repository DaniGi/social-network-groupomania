const getUser = (state, response, Id) => {
  return {
    ...state,
    user: {
      Id,
      name: response.userName,
      isLogged: true,
      isAdmin: response.isAdmin,
      likes: response.likes,
      profilePicture: response.profilePicture,
    },
  };
};

const addLike = (state, postId) => {
  const likes = [...state.user.likes, postId];
  const user = { ...state.user, likes };
  return {
    ...state,
    user,
  };
};

const removeLike = (state, postId) => {
  const likes = state.user.likes.filter((likeId) => likeId !== postId);
  const user = { ...state.user, likes };
  return {
    ...state,
    user,
  };
};

const modifyProfilePicture = (state, profilePicture) => {
  const user = { ...state.user, profilePicture };
  return {
    ...state,
    user,
  };
};

export const initialState = {
  user: {
    Id: '',
    name: '',
    IsLogged: false,
    isAdmin: false,
    likes: [],
    profilePicture: null,
  },
  isLoading: true,
};

export function UserReducer(state, action) {
  switch (action.type) {
    case 'get-user':
      return getUser(state, action.payload.response, action.payload.userId);
    case 'clear-user':
      return initialState;
    case 'toggle-is-loading':
      return { ...state, isLoading: !state.isLoading };
    case 'add-like':
      return addLike(state, action.payload.postId);
    case 'remove-like':
      return removeLike(state, action.payload.postId);
    case 'modify-profile-picture':
      return modifyProfilePicture(state, action.payload.profilePicture);
    default:
      return state;
  }
}
