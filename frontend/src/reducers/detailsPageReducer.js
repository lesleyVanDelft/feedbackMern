import feedbackService from '../services/feedbacks';

const feedbackPageReducer = (state = null, action) => {
	switch (action.type) {
		case 'FETCH_FEEDBACK_COMMENTS':
			return action.payload;
		case 'CREATE_NEW_FEEDBACK':
			return action.payload;
		case 'UPDATE_FEEDBACK':
			return action.payload;
		case 'TOGGLE_VOTE':
			return { ...state, ...action.payload };
		case 'VOTE_COMMENT':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: { ...c, ...action.payload.data }
				),
			};
		case 'VOTE_REPLY':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: {
								...c,
								replies: c.replies.map(r =>
									r.id !== action.payload.replyId
										? r
										: { ...r, ...action.payload.data }
								),
						  }
				),
			};
		case 'ADD_COMMENT':
			return {
				...state,
				comments: [...state.comments, action.payload],
			};
		case 'ADD_REPLY':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: { ...c, replies: [...c.replies, action.payload.addedReply] }
				),
			};
		case 'EDIT_COMMENT':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: { ...c, ...action.payload.data }
				),
			};
		case 'DELETE_COMMENT':
			return {
				...state,
				comments: state.comments.filter(c => c.id !== action.payload),
			};
		case 'EDIT_REPLY':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: {
								...c,
								replies: c.replies.map(r =>
									r.id !== action.payload.replyId
										? r
										: { ...r, ...action.payload.data }
								),
						  }
				),
			};
		case 'DELETE_REPLY':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: {
								...c,
								replies: c.replies.filter(r => r.id !== action.payload.replyId),
						  }
				),
			};
		case 'SORT_COMMENTS':
			return {
				...state,
				comments: state.comments.sort((a, b) => {
					switch (action.payload) {
						case 'new':
							return new Date(b.createdAt) - new Date(a.createdAt);
						case 'upvoted':
							return b.pointsCount - a.pointsCount;
						case 'downvoted':
							return a.pointsCount - b.pointsCount;
						case 'replied':
							return b.replies.length - a.replies.length;
						default:
							return new Date(a.createdAt) - new Date(b.createdAt);
					}
				}),
			};
		default:
			return state;
	}
};

export const fetchFeedbackComments = id => {
	return async dispatch => {
		const fetchedPost = await feedbackService.getFeedbackComments(id);

		dispatch({
			type: 'FETCH_POST_COMMENTS',
			payload: fetchedPost,
		});
	};
};

export const createNewFeedback = postObject => {
	return async dispatch => {
		const addedFeedback = await feedbackService.addNew(postObject);

		dispatch({
			type: 'CREATE_NEW_FEEDBACK',
			payload: addedFeedback,
		});

		return addedFeedback.id;
	};
};

export const updateFeedback = (id, postObject) => {
	return async dispatch => {
		const updatedPost = await feedbackService.editFeedback(id, postObject);

		dispatch({
			type: 'UPDATE_POST',
			payload: updatedPost,
		});
	};
};

export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;
		if (pointsCount < 0) {
			pointsCount = 0;
		}

		dispatch({
			type: 'TOGGLE_VOTE',
			payload: { upvotedBy, pointsCount, downvotedBy },
		});

		await feedbackService.upvoteFeedback(id);
	};
};

export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;
		if (pointsCount < 0) {
			pointsCount = 0;
		}

		dispatch({
			type: 'TOGGLE_VOTE',
			payload: { upvotedBy, pointsCount, downvotedBy },
		});

		await feedbackService.downvoteFeedback(id);
	};
};

// export const toggleCommentUpvote = (
//   postId,
//   commentId,
//   upvotedBy,
//   downvotedBy
// ) => {
//   return async (dispatch) => {
//     const pointsCount = upvotedBy.length - downvotedBy.length;

//     dispatch({
//       type: 'VOTE_COMMENT',
//       payload: { commentId, data: { upvotedBy, pointsCount, downvotedBy } },
//     });

//     await feedbackService.upvoteComment(postId, commentId);
//   };
// };

// export const toggleCommentDownvote = (
//   postId,
//   commentId,
//   downvotedBy,
//   upvotedBy
// ) => {
//   return async (dispatch) => {
//     const pointsCount = upvotedBy.length - downvotedBy.length;

//     dispatch({
//       type: 'VOTE_COMMENT',
//       payload: { commentId, data: { upvotedBy, pointsCount, downvotedBy } },
//     });

//     await feedbackService.downvoteComment(postId, commentId);
//   };
// };

// export const toggleReplyUpvote = (
//   postId,
//   commentId,
//   replyId,
//   upvotedBy,
//   downvotedBy
// ) => {
//   return async (dispatch) => {
//     const pointsCount = upvotedBy.length - downvotedBy.length;

//     dispatch({
//       type: 'VOTE_REPLY',
//       payload: {
//         commentId,
//         replyId,
//         data: { upvotedBy, pointsCount, downvotedBy },
//       },
//     });

//     await feedbackService.upvoteReply(postId, commentId, replyId);
//   };
// };

// export const toggleReplyDownvote = (
//   postId,
//   commentId,
//   replyId,
//   downvotedBy,
//   upvotedBy
// ) => {
//   return async (dispatch) => {
//     const pointsCount = upvotedBy.length - downvotedBy.length;

//     dispatch({
//       type: 'VOTE_REPLY',
//       payload: {
//         commentId,
//         replyId,
//         data: { upvotedBy, pointsCount, downvotedBy },
//       },
//     });

//     await feedbackService.downvoteReply(postId, commentId, replyId);
//   };
// };

export const addComment = (feedbackId, comment) => {
	return async dispatch => {
		const addedComment = await feedbackService.postComment(feedbackId, {
			comment,
		});

		dispatch({
			type: 'ADD_COMMENT',
			payload: addedComment,
		});
	};
};

export const addReply = (feedbackId, commentId, reply) => {
	return async dispatch => {
		const addedReply = await feedbackService.postReply(feedbackId, commentId, {
			reply,
		});

		dispatch({
			type: 'ADD_REPLY',
			payload: { commentId, addedReply },
		});
	};
};

export const editComment = (feedbackId, commentId, comment) => {
	return async dispatch => {
		await feedbackService.updateComment(feedbackId, commentId, { comment });
		const updatedAt = Date.now();

		dispatch({
			type: 'EDIT_COMMENT',
			payload: { commentId, data: { updatedAt, commentBody: comment } },
		});
	};
};

export const deleteComment = (feedbackId, commentId) => {
	return async dispatch => {
		await feedbackService.removeComment(feedbackId, commentId);

		dispatch({
			type: 'DELETE_COMMENT',
			payload: commentId,
		});
	};
};

export const editReply = (feedbackId, commentId, replyId, reply) => {
	return async dispatch => {
		await feedbackService.updateReply(feedbackId, commentId, replyId, {
			reply,
		});
		const updatedAt = Date.now();

		dispatch({
			type: 'EDIT_REPLY',
			payload: { commentId, replyId, data: { updatedAt, replyBody: reply } },
		});
	};
};

export const deleteReply = (feedbackId, commentId, replyId) => {
	return async dispatch => {
		await feedbackService.removeReply(feedbackId, commentId, replyId);

		dispatch({
			type: 'DELETE_REPLY',
			payload: { commentId, replyId },
		});
	};
};

export const sortComments = sortBy => {
	return dispatch => {
		dispatch({
			type: 'SORT_COMMENTS',
			payload: sortBy,
		});
	};
};

export default feedbackPageReducer;