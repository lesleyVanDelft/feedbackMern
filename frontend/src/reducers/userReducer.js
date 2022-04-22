import authService from '../services/auth';
import userService from '../services/user';
import storageService from '../utils/localStorage';
import feedbackService from '../services/feedbacks';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/errorHandler';
import { setError } from './errorReducer';

// const initialLoadState = {
// 	user: localStorage.getItem('readifyUserKey') ? localStorage.getItem('readifyUserKey') : null,
// 	feedbacks: [],
// };
// const initialLoadState = {
// 	user: localStorage.getItem('user'),
// 	feedbacks: [null],
// };

const userReducer = (state = null, action) => {
	switch (action.type) {
		// case 'SET_LOGIN_ERROR':
		// 	return {
		// 		...state,
		// 		errorMessage: action.payload.data,
		// 	};
		case 'LOGIN':
			return action.payload;
		case 'SIGNUP':
			return action.payload;
		case 'LOGOUT':
			return null;
		case 'SET_USER':
			return action.payload;
		// case 'SET_AVATAR':
		// 	return { ...state, ...action.payload };
		// case 'REMOVE_AVATAR':
		// 	return { ...state, avatar: { exists: false } };
		default:
			return state;
	}
};

//
//
//

// export const getLoginPage = () => {
// 	return async dispatch  => {
// 		try {

// 		} catch (error) {

// 		}
// 	}
// }

export const loginUser = credentials => {
	return async dispatch => {
		try {
			const user = await authService.login(credentials);

			if (user) {
				storageService.saveUser(user);
				storageService.loadUser();

				dispatch({
					type: 'LOGIN',
					payload: user,
				});

				toast.info(`Welcome, ${user.username}!`, {
					autoClose: 5000,
					icon: '👋',
				});
			} else {
				return await authService.getLoginPage();
			}
		} catch (err) {
			dispatch({
				type: 'SET_LOGIN_ERROR',
				payload: err.response,
			});
			// dispatch(setError(err));
			// errorHandler(err);

			console.log(err.response);
			// console.log('fuck u');
		}
	};
};

export const registerUser = credentials => {
	return async dispatch => {
		// const token = Cookies.get('jwt');
		const user = await authService.register(credentials);
		storageService.saveUser(user);
		// storageService.loadUser();

		dispatch({
			type: 'SIGNUP',
			payload: user,
		});

		// dispatch({
		// 	type: 'SET_USER',
		// 	payload: user,
		// });

		toast.info(`Welcome, ${user.username}`, {
			autoClose: 3000,
			icon: '🎉',
		});
	};
};

export const logoutUser = () => {
	return dispatch => {
		storageService.logoutUser();
		// authService.setToken(null);
		Cookies.remove('jwt', { path: '/' });

		dispatch({
			type: 'LOGOUT',
			payload: null,
		});
	};
};

export const setUser = () => {
	return dispatch => {
		const loggedUser = storageService.loadUser();

		if (loggedUser) {
			// authService.setToken(loggedUser.token);
			dispatch({
				type: 'SET_USER',
				payload: loggedUser,
			});
		}
	};
};

export const setAvatar = avatarImage => {
	return async dispatch => {
		const uploadedAvatar = await userService.uploadAvatar({ avatarImage });
		const prevUserData = storageService.loadUser();
		storageService.saveUser({ ...prevUserData, ...uploadedAvatar });

		dispatch({
			type: 'SET_AVATAR',
			payload: uploadedAvatar,
		});
	};
};

export const deleteAvatar = () => {
	return async dispatch => {
		await userService.removeAvatar();
		const prevUserData = storageService.loadUser();
		storageService.saveUser({ ...prevUserData, avatar: { exists: false } });

		dispatch({
			type: 'REMOVE_AVATAR',
		});
	};
};

export default userReducer;
