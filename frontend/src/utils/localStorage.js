import Cookies from 'js-cookie';
const storageKeyToken = 'readifyUserKey';
const storageKeyDarkMode = 'readifyDarkMode';

const saveUser = user => localStorage.setItem('user', JSON.stringify(user));

const loadUser = () => {
	try {
		const localstate = localStorage.getItem('user');

		if (localstate === null) {
			return undefined;
		}
		return JSON.parse(localstate);
	} catch (error) {
		console.log('loadUser');
		console.log(error);
		return undefined;
	}
};

const logoutUser = () => {
	try {
		localStorage.removeItem('user');
		Cookies.remove('jwt', { path: '/' });
	} catch (error) {
		console.log(error + 'logout user');
	}
};

const saveDarkMode = boolean =>
	localStorage.setItem(storageKeyDarkMode, boolean);

const loadDarkMode = () => localStorage.getItem(storageKeyDarkMode);

const storage = {
	saveUser,
	loadUser,
	logoutUser,
	saveDarkMode,
	loadDarkMode,
};

export default storage;
