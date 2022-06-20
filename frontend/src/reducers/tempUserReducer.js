import storageService from '../utils/localStorage';
import userService from '../services/user';

const tempUserReducer = (state = null, action) => {
	switch (action.type) {
		case 'GET_USER_DETAILS':
			// console.log(action.payload);
			return action.payload;
		case 'GET_ALL_FEEDBACKS':
			return (state = null);
		default:
			return state;
	}
};

export const getUserDetails = id => {
	return async dispatch => {
		const userDetails = await userService.getUser(id);
		// const currentUser = await storageService.loadUser();

		try {
			if (userDetails) {
				dispatch({
					type: 'GET_USER_DETAILS',
					// payload: currentUser.id === id ? currentUser : userDetails,
					payload: userDetails,
				});
			}
		} catch (error) {
			console.log(error);
			console.log('tempUser');
		}
	};
};

export default tempUserReducer;
