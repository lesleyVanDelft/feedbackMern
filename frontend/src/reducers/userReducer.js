import authService from '../services/auth';
import userService from '../services/user';
import storageService from '../utils/localStorage';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.payload;
		case 'SIGNUP':
			return action.payload;
		case 'LOGOUT':
			return null;
		case 'SET_USER':
			return action.payload;
		case 'SET_PROFILE_IMG':
			return action.payload;
		// case 'SET_AVATAR':
		// 	return { ...state, ...action.payload };
		// case 'REMOVE_AVATAR':
		// 	return { ...state, avatar: { exists: false } };
		default:
			return state;
	}
};

export const loginUser = credentials => {
	return async dispatch => {
		try {
			const user = await authService.login(credentials);

			if (user) {
				storageService.saveUser(user);
				await storageService.loadUser();
				Cookies.set('jwt', user.token);
				dispatch({
					type: 'LOGIN',
					payload: user,
				});

				toast.info(`Welcome, ${user.username}!`, {
					autoClose: 5000,
					icon: '👋',
				});
			}
		} catch (err) {
			dispatch({
				type: 'SET_LOGIN_ERROR',
				payload: err.response,
			});
			console.log(err.response);
		}
	};
};

export const registerUser = credentials => {
	return async dispatch => {
		const user = await authService.register(credentials);
		storageService.saveUser(user);

		dispatch({
			type: 'SIGNUP',
			payload: user,
		});

		toast.info(`Welcome, ${user.username}`, {
			autoClose: 3000,
			icon: '🎉',
		});
	};
};

export const logoutUser = () => {
	return dispatch => {
		storageService.logoutUser();
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
			dispatch({
				type: 'SET_USER',
				payload: loggedUser,
			});
		}
	};
};

export const setProfileImage = img => {
	return async dispatch => {
		const uploadedImage = await userService.postImage(img);
		const prevUser = storageService.loadUser();
		storageService.saveUser({ ...prevUser, ...uploadedImage });

		dispatch({
			type: 'SET_PROFILE_IMAGE',
			payload: uploadedImage,
		});
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
