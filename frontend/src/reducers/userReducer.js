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
		case 'SET_PROFILE_IMG':
			return {
				...state,
				profileImg: {
					...state.profileImg,
					imageId: (state.profileImg.imageId =
						action.payload.imagePath.split('/')[2]),
				},
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
		try {
			const user = await authService.register(credentials);
			storageService.saveUser(user);

			dispatch({
				type: 'SIGNUP',
				payload: user,
			});

			toast.info(`Welcome to the party, ${user.username}`, {
				autoClose: 3000,
				icon: '🎉',
			});
		} catch (error) {
			console.log(error);
		}
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
	return async dispatch => {
		// const user = await userService.getUser();
		const loggedUser = storageService.loadUser();

		if (loggedUser) {
			dispatch({
				type: 'SET_USER',
				payload: loggedUser,
			});
		}
		// else {
		// 	dispatch({
		// 		type: 'SET_USER',
		// 		payload: user,
		// 	});
		// }
	};
};

// export const getUser =  () => {
// 	return async dispatch => {
// 		const user = await userService.getUser();

// 	}
// }

export const setProfileImage = img => {
	return async dispatch => {
		const user = storageService.loadUser();
		const uploadedImage = await userService.postImage(img);
		// console.log(uploadedImage.imagePath);
		const updatedLocalStorage = {
			...user,
			profileImg: {
				...user.profileImg,
				imageId: uploadedImage.imagePath.split('/')[2],
			},
		};

		storageService.saveUser(updatedLocalStorage);

		dispatch({
			type: 'SET_PROFILE_IMG',
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

export const persistConfig = {
	key: 'imageId',
	storage,
	blacklist: [''],
};

export default userReducer;
