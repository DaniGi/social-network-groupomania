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

const deleteComment = (state, APIresponse, id) => {
  if (!APIresponse || APIresponse.error) {
    const error = APIresponse.error ? APIresponse.error : 'Error deleting post';
    return { ...state, error, isLoading: false };
  }
  const filteredComments = state.comments.filter((comment) => comment.id !== id);
  return { ...state, comments: [...filteredComments], isLoading: false };
};

const modifyComment = (state, APIresponse, id, content) => {
  // update modified comment's properties
  const comments = state.comments.map((comment) => {
    if (comment.id !== id) return comment;
    comment.content = content;
    return comment;
  });

  return { ...state, comments, isLoading: false };
};

export const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

export function CommentsReducer(state, action) {
  switch (action.type) {
    case 'get-post-comments':
      return getPostComments(state, action.payload.response);
    case 'add-comment':
      return addComment(state, action.payload.response);
    case 'delete-comment':
      return deleteComment(state, action.payload.response, action.payload.commentId);
    case 'modify-comment': {
      const { response, id, content } = action.payload;
      return modifyComment(state, response, id, content);
    }
    case 'is-loading':
      return { ...state, isLoading: true };
    case 'action-completed':
      return { ...state, isLoading: false };
    default:
      throw new Error();
  }
}
