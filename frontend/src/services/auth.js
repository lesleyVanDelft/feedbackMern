import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../backendUrl';
// import { errorHandler } from '../utils/getErrorMsg';
import { errorHandler } from '../utils/errorHandler';

const API_URL = `/api/users`;
// const API_URL = `${backendUrl}/api/users`;

export let token = null;

const setToken = newToken => {
	token = newToken;
};

const loginPage = async () => {
	const response = await axios.get(API_URL + '/login');
	return response.data;
};

const login = async (loginData, getError) => {
	const response = await axios.post(API_URL + '/login', loginData, token);
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
