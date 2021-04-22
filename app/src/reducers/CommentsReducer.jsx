const getPostComments = (state, APIresponse) => {
  // Checking duplicate comments
  const commentsIds = state.comments.map((comment) => comment.id);
  const newComments = APIresponse.comments.filter((comment) => !commentsIds.includes(comment.id));

  return { ...state, comments: [...state.comments, ...newComments] };
};

const addComment = (state, APIresponse) => {
  return {
    ...state,
    comments: [...state.comments, APIresponse.comment],
    isCreating: false,
  };
};

const deleteComment = (state, APIresponse, id) => {
  const filteredComments = state.comments.filter((comment) => comment.id !== id);
  return { ...state, comments: [...filteredComments] };
};

const modifyComment = (state, APIresponse, id, content) => {
  // update modified comment's properties
  const comments = state.comments.map((comment) => {
    if (comment.id !== id) return comment;
    comment.content = content;
    return comment;
  });

  return { ...state, comments };
};

export const initialState = {
  comments: [],
};

export function CommentsReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'get-post-comments':
      return getPostComments(state, payload.response);
    case 'add-comment':
      return addComment(state, payload.response);
    case 'delete-comment':
      return deleteComment(state, payload.response, payload.commentId);
    case 'modify-comment': {
      const { response, id, content } = payload;
      return modifyComment(state, response, id, content);
    }
    case 'clear-comments':
      return initialState;
    default:
      return state;
  }
}
