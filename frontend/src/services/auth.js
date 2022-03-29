import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/users/';

export let token = null;

const setToken = newToken => {
	token = newToken;
};

const login = async loginData => {
	const response = await axios.post(API_URL + 'login', loginData);
	// 	const response = await axios.post(API_URL + 'login', userData);

	if (response.data) {
		localStorage.setItem('user', JSON.stringify(response.data.user));
	}
	return response.data;

	// 	return response.data;
};

const register = async registerData => {
	try {
		const response = await axios.post(API_URL + 'register', registerData);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

const authService = { setToken, login, register };

export default authService;
