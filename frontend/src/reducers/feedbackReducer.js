import { toast } from 'react-toastify';
import feedbackService from '../services/feedbacks';

const feedbackReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_FEEDBACKS':
			return action.payload;
		case 'GET_SINGLE_FEEDBACK':
			return [...state];
		case 'CREATE_NEW_FEEDBACK':
			// return {
			// 	...state,
			// 	feedbacks: state.feedbacks.push(action.payload),
			// };
			//
			//
			// return state.push(...action.payload);
			return [...state, action.payload];
		case 'DELETE_FEEDBACK':
			return [
				...state.feedbacks,
				state.feedbacks.filter(fb => fb.id !== action.payload),
			];
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
		case 'TOGGLE_UPVOTE_DETAILS':
			return state.map(fb => {
				return fb._id !== action.payload.id
					? fb
					: { ...fb, ...action.payload.data };
			});

		case 'TOGGLE_DOWNVOTE_DETAILS':
			const filteredArrayDownvote = state.filter(
				fb => fb._id === action.payload.id
			);
			return filteredArrayDownvote.map(fb => {
				return fb._id !== action.payload.id
					? fb
					: { ...fb, ...action.payload.data };
			});
		case 'LOGOUT':
			return [];
		default:
			return state;
	}
};

export const toggleUpvoteDetails = (id, upvotedBy, downvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;
		dispatch({
			type: 'TOGGLE_UPVOTE_DETAILS',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});
		await feedbackService.upvoteFeedback(id);
	};
};

export const toggleDownvoteDetails = (id, downvotedBy, upvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;
		dispatch({
			type: 'TOGGLE_DOWNVOTE_DETAILS',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});
		await feedbackService.downvoteFeedback(id);
	};
};

// GET - all feedbacks
export const getFeedbacks = () => {
	return async dispatch => {
		try {
			let feedbacks;
			feedbacks = await feedbackService.getFeedbacks();
			dispatch({
				type: 'GET_ALL_FEEDBACKS',
				payload: feedbacks,
			});
		} catch (error) {
			console.log(error + ' feedbackReducer getFeedbacks');
		}
	};
};

// POST - create feedback
export const createNewFeedback = feedbackObj => {
	return async dispatch => {
		const addedFeedback = await feedbackService.addNew(feedbackObj);

		dispatch({
			type: 'CREATE_NEW_FEEDBACK',
			payload: addedFeedback,
		});
		toast.success('Feedback added!', {
			icon: '👌',
		});
		// return addedFeedback.id;
	};
};

// export const removeFeedback = id => {
// 	return async dispatch => {
// 		await feedbackService.deleteFeedback(id);

// 		dispatch({
// 			type: 'DELETE_FEEDBACK',
// 			payload: id,
// 		});
// 		toast.warn('Feedback Deleted');
// 	};
// };

// POST - upvote feedback
export const toggleUpvote = (id, upvotedBy, downvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;

		dispatch({
			type: 'TOGGLE_UPVOTE',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});

		await feedbackService.upvoteFeedback(id);
	};
};

// POST - downvote feedback
export const toggleDownvote = (id, downvotedBy, upvotedBy) => {
	return async dispatch => {
		let pointsCount = upvotedBy.length - downvotedBy.length;

		dispatch({
			type: 'TOGGLE_DOWNVOTE',
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
		});

		await feedbackService.downvoteFeedback(id);
	};
};

// DELETE - delete feedback
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

export default feedbackReducer;
