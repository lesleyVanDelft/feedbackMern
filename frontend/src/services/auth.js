import axios from 'axios';

// const API_URL = `/api/users`;
const API_URL = `/api/users`;

export let token = null;

const setToken = newToken => {
	token = newToken;
};

const login = async loginData => {
	const response = await axios.post(API_URL + '/login', loginData);
	return response.data;
};

const register = async registerData => {
	try {
		const response = await axios.post(
			API_URL + '/register',
			registerData,
			token
		);
		return response.data;
	} catch (error) {
		// console.log(error);
	}
};

const authService = { setToken, login, register };

export default authService;
