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
    default:
      return state;
  }
}
