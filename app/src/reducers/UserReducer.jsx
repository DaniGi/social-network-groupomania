const getUser = (state, response, Id) => {
  return {
    Id,
    name: response.userName,
    isLogged: true,
    isAdmin: response.isAdmin,
    likes: response.likes,
    profilePicture: response.profilePicture,
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
};

export function UserReducer(state, action) {
  switch (action.type) {
    case 'get-user':
      return getUser(state, action.payload.response, action.payload.userId);
    case 'clear-user':
      return initialState;
    default:
      throw new Error();
  }
}
