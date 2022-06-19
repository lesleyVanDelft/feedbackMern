import feedbackService from '../services/feedbacks';
import { toast } from 'react-toastify';

const feedbackPageReducer = (state = null, action) => {
	switch (action.type) {
		case 'GET_SINGLE_FEEDBACK':
			return { ...state, ...action.payload };
		case 'UPDATE_FEEDBACK':
			return { ...state, ...action.payload };
		// case 'DELETE_FEEDBACK':
		// 	return state.filter(fb => fb.id !== action.payload);

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
			};

		case 'ADD_REPLY':
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
			// console.log(action.payload.commentBody.editValue);
			return {
				...state,
				...state.comments.map(comment =>
					comment.id !== action.payload.commentId
						? comment
						: { ...comment, ...action.payload.commentBody }
				),
			};
		case 'DELETE_COMMENT':
			return {
				...state,
				comments: state.comments.filter(
					comment => comment._id !== action.payload
				),
			};
		case 'EDIT_REPLY':
			// console.log(action.payload.replyBody.editValue);
			return {
				...state,
				...state.comments.map(comment =>
					comment.id !== action.payload.commentId
						? comment
						: {
								replies: comment.replies.map(reply =>
									reply.id !== action.payload.replyId
										? reply
										: { ...reply, ...action.payload.replyBody }
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
		case 'LOGOUT':
			return null;
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

export const updateFeedback = (id, feedbackObj) => {
	return async dispatch => {
		const updatedFeedback = await feedbackService.editFeedback(id, feedbackObj);

		dispatch({
			type: 'UPDATE_FEEDBACK',
			payload: updatedFeedback,
		});
	};
};

export const addComment = (feedbackId, commentData) => {
	return async dispatch => {
		const addedComment = await feedbackService.postComment(feedbackId, {
			commentData,
		});

		dispatch({
			type: 'ADD_COMMENT',
			payload: addedComment,
		});

		toast.success('Comment added!', {
			icon: '😀',
			autoClose: 2000,
		});
	};
};

export const addReply = (feedbackId, commentId, replyData) => {
	return async dispatch => {
		const addedReply = await feedbackService.postReply(feedbackId, commentId, {
			replyData,
		});

		dispatch({
			type: 'ADD_REPLY',
			payload: { commentId, addedReply },
		});

		toast.success('Reply added!', {
			icon: '🐱‍👓',
			autoClose: 2000,
		});
	};
};

export const editComment = (feedbackId, commentId, comment) => {
	return async dispatch => {
		await feedbackService.updateComment(feedbackId, commentId, { comment });
		// const updatedAt = Date.now();

		dispatch({
			type: 'EDIT_COMMENT',
			payload: { commentId, commentBody: comment },
		});

		toast.success('Comment updated!', {
			icon: '👍',
			autoClose: 2000,
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
		toast.warn('Comment deleted!', {
			icon: '👏',
			autoClose: 2000,
		});
	};
};

export const editReply = (feedbackId, commentId, replyId, reply) => {
	return async dispatch => {
		await feedbackService.updateReply(feedbackId, commentId, replyId, {
			reply,
		});
		// const updatedAt = Date.now();

		dispatch({
			type: 'EDIT_REPLY',
			payload: { commentId, replyId, replyBody: reply },
		});
		toast.success('Reply updated!', {
			icon: '👍',
			autoClose: 2000,
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
		toast.warn('Reply deleted!', {
			icon: '👏',
			autoClose: 2000,
		});
	};
};

export default feedbackPageReducer;
