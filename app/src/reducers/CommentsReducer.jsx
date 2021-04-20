const getPostComments = (state, APIresponse) => {
  if (APIresponse.message || APIresponse.error) {
    const error = `error: ${APIresponse.message || APIresponse.error}`;
    return { ...state, error, isLoading: false };
  }
  // Checking duplicate comments
  const commentsIds = state.comments.map((comment) => comment.id);
  const newComments = APIresponse.comments.filter((comment) => !commentsIds.includes(comment.id));

  return { ...state, comments: [...state.comments, ...newComments], isLoading: false };
};

const addComment = (state, APIresponse) => {
  if (APIresponse.message || APIresponse.error) {
    const error = `error: ${APIresponse.message || APIresponse.error}`;
    return { ...state, error, isLoading: false };
  }

  return {
    ...state,
    comments: [...state.comments, APIresponse.comment],
    isLoading: false,
    isCreating: false,
  };
};

export const initialState = {
  comments: [],
  isLoading: false,
  error: null,
  isCreating: false,
};

export function CommentsReducer(state, action) {
  switch (action.type) {
    case 'get-post-comments':
      return getPostComments(state, action.payload.response);
    case 'add-comment':
      return addComment(state, action.payload.response);
    // case 'delete-comment':
    //   return deleteComment(state, action.payload.response, action.payload.commentId);
    // case 'modify-comment':
    //   return modifyComment(state, action.payload.response, action.payload.element);
    case 'is-loading':
      return { ...state, isLoading: true };
    case 'action-completed':
      return { ...state, isLoading: false };
    case 'toogle-is-creating':
      return { ...state, isCreating: !state.isCreating, error: null };
    case 'toogle-is-modifying':
      return { ...state, isCreating: !state.isModifying, error: null };
    default:
      throw new Error();
  }
}
