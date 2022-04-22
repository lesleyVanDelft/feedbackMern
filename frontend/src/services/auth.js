import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backendUrl from '../backendUrl';
// import { errorHandler } from '../utils/getErrorMsg';
import { errorHandler } from '../utils/errorHandler';

// const API_URL = `/api/users`;
// const API_URL = `${backendUrl}/api/users`;
// https://feedback-lesley.herokuapp.com
let API_URL;
if (process.env.NODE_ENV === 'development') {
	API_URL = 'http://localhost:5000/api/users';
} else if (process.env.NODE_ENV === 'production') {
	API_URL = 'https://feedback-lesley.herokuapp.com/api/users';
}

export let token = null;

const setToken = newToken => {
	token = newToken;
};

const getLoginPage = () => {
	const response = axios.get('/');
	return response.data;
};

const login = async loginData => {
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

const authService = { setToken, login, register, getLoginPage };

export default authService;
