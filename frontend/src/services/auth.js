import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { errorHandler } from '../utils/getErrorMsg';
import { errorHandler } from '../utils/errorHandler';

const API_URL = '/api/users/';

export let token = null;

const setToken = newToken => {
	token = newToken;
};

const login = async (loginData, getError) => {
	try {
		const response = await axios.post(API_URL + 'login', loginData, token);
		return response.data;
	} catch (error) {
		console.log(error, 'auth service');
		// if (error) {
		// 	getError(error);
		// }
		// return error.response.data;
		// if (error.response.status === 401) {
		// 	errorHandler(error.response.data);
		// 	// return error.response.data;
		// }
		// return errorHandler(error.response);
	}
};

const register = async registerData => {
	try {
		const response = await axios.post(
			API_URL + 'register',
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
