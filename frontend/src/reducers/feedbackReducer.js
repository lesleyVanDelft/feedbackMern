import { toast } from 'react-toastify';
import feedbackService from '../services/feedbacks';
// import feedbackPageReducer from "./detailsPageReducer";
// import storageService from '../utils/localStorage';

const feedbackReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_FEEDBACKS':
			return action.payload;
		case 'CREATE_NEW_FEEDBACK':
			return {
				...state,
				feedbacks: [state.feedbacks, state.feedbacks.push(action.payload)],
			};
		case 'TOGGLE_UPVOTE':
			return state.map(fb => {
				return fb._id !== action.payload.id
					? fb
					: { ...fb, ...action.payload.data };
			});
		case 'TOGGLE_DOWNVOTE':
			return state.map(fb => {
				return fb._id !== action.payload.id
					? fb
					: { ...fb, ...action.payload.data };
			});
		case 'DELETE_FEEDBACK':
			return {
				...state,
				results: state.results.filter(fb => fb.id !== action.payload),
			};
		case 'LOGOUT_FEEDBACK':
			return null;
		// comments //
		// // // // //
		// case 'ADD_COMMENT':
		// 	// return [...state, action.payload];
		// 	let comments = state.comments;
		// 	comments.push(action.payload);
		// 	return {
		// 		...state,
		// 		comments,
		// 	};
		// case 'DELETE_COMMENT':
		// 	return state.filter(comment => comment._id !== action.payload);
		// // ...state,
		// // comments: state.comments.filter(c => c.id !== action.payload),

		default:
			return state;
	}
};

export const getFeedbacks = sortBy => {
	return async dispatch => {
		let feedbacks;

		feedbacks = await feedbackService.getFeedbacks();
		// console.log(feedbacks);

		dispatch({
			type: 'GET_ALL_FEEDBACKS',
			payload: feedbacks,
		});

		// toast.success('success');
	};
};

// export const getSingleFeedback = id => {
// 	return async dispatch => {
// 		const fetchedFeedback = await feedbackService.getSingleFeedback(id);

// 		dispatch({
// 			type: 'GET_SINGLE_FEEDBACK',
// 			payload: fetchedFeedback,
// 		});
// 	};
// };

export const createNewFeedback = feedbackObj => {
	return async dispatch => {
		const addedFeedback = await feedbackService.addNew(feedbackObj);

		dispatch({
			type: 'CREATE_NEW_FEEDBACK',
			payload: addedFeedback,
		});

		return addedFeedback.id;
	};
};

// export const addComment = (feedbackId, comment) => {
// 	return async dispatch => {
// 		const addedComment = await feedbackService.postComment(feedbackId, {
// 			comment,
// 		});

// 		dispatch({
// 			type: 'ADD_COMMENT',
// 			payload: addedComment,
// 		});
// 	};
// };

// export const deleteComment = (feedbackId, commentId) => {
// 	return async dispatch => {
// 		await feedbackService.removeComment(feedbackId, commentId);

// 		dispatch({
// 			type: 'DELETE_COMMENT',
// 			payload: commentId,
// 		});
// 	};
// };

export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;
		// if (pointsCount < 0) {
		// 	pointsCount = 0;
		// }
		// console.log(id);
		dispatch({
			type: 'TOGGLE_UPVOTE',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});

		await feedbackService.upvoteFeedback(id);
	};
};

export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;
		// if (pointsCount < 0) {
		// 	pointsCount = 0;
		// }

		dispatch({
			type: 'TOGGLE_DOWNVOTE',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});

		await feedbackService.downvoteFeedback(id);
	};
};

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

// export const resetFeedbacks = () => {
// 	return async dispatch => {
// 		dispatch({
// 			type: 'LOGOUT_FEEDBACKS',
// 			payload: null,
// 		});
// 	};
// };

export default feedbackReducer;
