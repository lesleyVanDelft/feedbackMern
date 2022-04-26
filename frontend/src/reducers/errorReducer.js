const errorReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_LOGIN_ERROR':
			return action.payload;
		case 'LOGIN':
			return null;
		case 'LOGOUT':
			return null;
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
