import { errorHandler } from '../utils/errorHandler';
const initialState = {
	errorMessage: '',
};

const errorReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_LOGIN_ERROR':
			return action.payload.data;
		default:
			return state;
	}
};

export const setError = err => {
	return dispatch => {
		dispatch({
			type: 'SET_LOGIN_ERROR',
			payload: err,
		});
	};
};

export default errorReducer;
