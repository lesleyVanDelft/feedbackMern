import feedbackService from '../services/feedbacks';
import { toast } from 'react-toastify';

const feedbackPageReducer = (state = null, action) => {
	switch (action.type) {
		case 'GET_SINGLE_FEEDBACK':
			return { ...state, ...action.payload };
		case 'UPDATE_FEEDBACK':
			return { ...state, ...action.payload };
		case 'DELETE_FEEDBACK':
			return state.filter(fb => fb.id !== action.payload);

		case 'TOGGLE_UPVOTE_DETAILS':
			return {
				...(state._id !== action.payload.id
					? state
					: { ...state, ...action.payload.data }),
			};
		case 'TOGGLE_DOWNVOTE_DETAILS':
			return {
				...(state._id !== action.payload.id
					? state
					: { ...state, ...action.payload.data }),
			};

		case 'VOTE_COMMENT':
			return {
				...state,
				comments: state.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: { ...c, ...action.payload.data }
				),
			};
		case 'ADD_COMMENT':
			return {
				...state,
				comments: [...state.comments, action.payload],
				// ...state,
				// comments: state.comments.map(comment => {
				// 	return comment._id !== action.payload.feedbackId
				// 		? comment
				// 		: {
				// 				...comment,
				// 				...state.comments.push(action.payload.addedComment),
				// 		  };
				// }),
			};
		// case 'ADD_COMMENT':
		// 	return action.payload;

		case 'ADD_REPLY':
			// return {
			// 	...state,
			// 	comments: state.comments.map(c =>
			// 		c.id !== action.payload.commentId
			// 			? c
			// 			: { ...c, replies: [...c.replies, action.payload.addedReply] }
			// 	),
			// };
			// let comments = state.comments;
			return {
				...state,
				comments: state.comments.map(comment => {
					return comment._id !== action.payload.commentId
						? comment
						: {
								...comment,
								replies: [...comment.replies, action.payload.addedReply],
						  };
				}),
			};

		case 'EDIT_COMMENT':
			return {
				...state,
				...state.feedbackComments.comments.map(c =>
					c.id !== action.payload.commentId
						? c
						: { ...c, ...action.payload.data }
				),
			};
		case 'DELETE_COMMENT':
			return {
				...state,
				comments: state.comments.filter(
					comment => comment._id !== action.payload
				),
				// ...state.comments.filter(comment => comment._id !== action.payload),
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
				comments: state.comments.map(comment => {
					return {
						...comment,
						replies: comment.replies.filter(
							reply => reply._id !== action.payload.replyId
						),
					};
				}),
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

export const getSingleFeedback = id => {
	return async dispatch => {
		const fetchedFeedback = await feedbackService.getSingleFeedback(id);

		dispatch({
			type: 'GET_SINGLE_FEEDBACK',
			payload: fetchedFeedback,
		});
	};
};

export const toggleUpvoteDetails = (id, upvotedBy, downvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;

		dispatch({
			type: 'TOGGLE_UPVOTE_DETAILS',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});

		await feedbackService.upvoteFeedbackDetails(id);
	};
};

export const toggleDownvoteDetails = (id, downvotedBy, upvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;

		dispatch({
			type: 'TOGGLE_DOWNVOTE_DETAILS',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});

		await feedbackService.downvoteFeedbackDetails(id);
	};
};

export const updateFeedback = (id, feedbackObj) => {
	return async dispatch => {
		const updatedFeedback = await feedbackService.editFeedback(id, feedbackObj);

		dispatch({
			type: 'UPDATE_FEEDBACK',
			payload: updatedFeedback,
		});
		toast.success('Feedback updated');
	};
};

// export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
// 	return async dispatch => {
// 		let pointsCount = upvotedBy.length - downvotedBy.length;
// 		if (pointsCount < 0) {
// 			pointsCount = 0;
// 		}

// 		dispatch({
// 			type: 'TOGGLE_VOTE',
// 			payload: { upvotedBy, pointsCount, downvotedBy },
// 		});

// 		await feedbackService.upvoteFeedback(id);
// 	};
// };

// export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
// 	return async dispatch => {
// 		let pointsCount = upvotedBy.length - downvotedBy.length;
// 		if (pointsCount < 0) {
// 			pointsCount = 0;
// 		}

// 		dispatch({
// 			type: 'TOGGLE_VOTE',
// 			payload: { upvotedBy, pointsCount, downvotedBy },
// 		});

// 		await feedbackService.downvoteFeedback(id);
// 	};
// };

export const removeFeedback = id => {
	return async dispatch => {
		await feedbackService.deleteFeedback(id);

		dispatch({
			type: 'DELETE_FEEDBACK',
			payload: id,
		});
		toast.warn('Feedback Deleted');
	};
};

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

// export const sortComments = (sortBy) => {
//   return (dispatch) => {
//     dispatch({
//       type: 'SORT_COMMENTS',
//       payload: sortBy,
//     });
//   };
// };

export default feedbackPageReducer;
