const storageKeyToken = 'readifyUserKey';
const storageKeyDarkMode = 'readifyDarkMode';

const saveUser = user => localStorage.setItem('user', JSON.stringify(user));

const loadUser = () => localStorage.getItem('user');

const logoutUser = () => localStorage.removeItem('user');

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
