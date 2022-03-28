import { toast } from 'react-toastify';
import feedbackService from '../services/feedbacks';
// import feedbackPageReducer from "./detailsPageReducer";
// import storageService from '../utils/localStorage';

const feedbackReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_FEEDBACKS':
			return action.payload;
		case 'CREATE_NEW_FEEDBACK':
			return { ...state.push(...action.payload) };
		case 'LOAD_MORE_POSTS':
			return {
				...action.payload,
				results: [...state.results, ...action.payload.results],
			};
		case 'TOGGLE_VOTE':
			return {
				...state,
				results: state.results.map(r =>
					r.id !== action.payload.id ? r : { ...r, ...action.payload.data }
				),
			};
		case 'DELETE_FEEDBACK':
			return {
				...state,
				results: state.results.filter(r => r.id !== action.payload),
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

		dispatch({
			type: 'SET_FEEDBACKS',
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

export const loadMorePosts = (sortBy, page) => {
	return async dispatch => {
		let posts;
		if (sortBy !== 'subscribed') {
			posts = await feedbackService.getPosts(sortBy, 10, page);
		} else {
			posts = await feedbackService.getSubPosts(10, page);
		}

		dispatch({
			type: 'LOAD_MORE_POSTS',
			payload: posts,
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
			payload: { id, data: { upvotedBy, pointsCount, downvotedBy } },
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
