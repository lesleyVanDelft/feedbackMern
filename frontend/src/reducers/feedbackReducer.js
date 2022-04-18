import { toast } from 'react-toastify';
import feedbackService from '../services/feedbacks';
// import feedbackPageReducer from "./detailsPageReducer";
// import storageService from '../utils/localStorage';

const feedbackReducer = (state = [], action) => {
	switch (action.type) {
		case 'GET_ALL_FEEDBACKS':
			return action.payload;
		// case 'CREATE_NEW_FEEDBACK':
		// 	return state.push(...action.payload);
		// case 'GET_SINGLE_FEEDBACK':
		// 	return { ...state, ...action.payload };
		case 'CREATE_NEW_FEEDBACK':
			return {
				...state,
				feedbacks: [
					...state.feedbacks,
					state.feedbacks.push(...action.payload),
				],
			};
		case 'TOGGLE_UPVOTE':
			// return {
			// 	...state,
			// 	feedbacks: state.map(
			// 		r =>
			// 			r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
			// 		// r.upvotedBy.push(action.payload)
			// 	),
			// };
			// return { ...state, ...action.payload };
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
		// toast.warn('Feedback Deleted');
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
