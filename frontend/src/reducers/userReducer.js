import authService from '../services/auth';
import userService from '../services/user';
import storageService from '../utils/localStorage';
import Cookies from 'js-cookie';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
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
		case 'CHANGE_PASSWORD':
			return action.payload;
		case 'SET_PROFILE_IMG':
			return {
				...state,
				...action.payload,

				// imageId: (state.profileImg.imageId =
				// 	action.payload.imagePath.split('/')[2]),
			};

		// return action.payload;
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

				toast.info(`Welcome back, ${user.username}!`, {
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
		try {
			const user = await authService.register(credentials);

			if (user) {
				storageService.saveUser(user);
				await storageService.loadUser();
				dispatch({
					type: 'SIGNUP',
					payload: user,
				});
				toast.info(`Welcome to the team, ${user.username}! 🥳`, {
					autoClose: 3500,
					icon: '🎉',
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
};

export const logoutUser = () => {
	return dispatch => {
		storageService.logoutUser();
		Cookies.remove('jwt', { path: '/' });

		dispatch({ type: 'LOGOUT', payload: null });
	};
};

export const setUser = () => {
	return async dispatch => {
		// const user = await userService.getUser();
		const loggedUser = storageService.loadUser();
		// console.log(user);
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
		try {
			const user = storageService.loadUser();
			const uploadedImage = await userService.postImage(img);

			const updatedLocalStorage = {
				profileImg: {
					exists: true,
					imageLink: uploadedImage.imagePath,
					imageId: uploadedImage.imagePath.split('/')[2],
				},
			};

			storageService.saveUser({ ...user, ...updatedLocalStorage });

			dispatch({
				type: 'SET_PROFILE_IMG',
				payload: updatedLocalStorage,
			});
		} catch (error) {
			console.log(error);
		}
	};
};

export const changePassword = (id, passwordData) => {
	return async dispatch => {
		try {
			const user = storageService.loadUser();
			const updatedUser = await userService.changePassword(id, passwordData);

			if (updatedUser) {
				dispatch({
					type: 'CHANGE_PASSWORD',
					payload: user,
				});
				toast.success(`Password changed!`, {
					autoClose: 4000,
					icon: '👍',
				});
			} else {
				console.log('error userreducer');
			}
		} catch (error) {
			console.log(error);
		}
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

export const persistConfig = {
	key: 'imageId',
	storage,
	blacklist: [''],
};

export default userReducer;
