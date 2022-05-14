import { toast } from 'react-toastify';
import feedbackService from '../services/feedbacks';
// import feedbackPageReducer from "./detailsPageReducer";
// import storageService from '../utils/localStorage';

const feedbackReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_FEEDBACKS':
			return action.payload;
		case 'CREATE_NEW_FEEDBACK':
			return [...state, action.payload];

		// return {
		// 	...state,
		// 	feedbacks: [...state, action.payload],
		// };
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
		case 'LOGOUT':
			return [];
		default:
			return state;
	}
};

// GET - all feedbacks
export const getFeedbacks = () => {
	return async dispatch => {
		let feedbacks;
		feedbacks = await feedbackService.getFeedbacks();
		dispatch({
			type: 'GET_ALL_FEEDBACKS',
			payload: feedbacks,
		});
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

		// return addedFeedback.id;
	};
};

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
