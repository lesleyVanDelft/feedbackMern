import axios from 'axios';
import backendUrl from '../backendUrl';
// import backendUrl from '../backendUrl';
import { token } from './auth';

const API_URL = `http://localhost:5000/api/users`;
// const API_URL = `${
// 	process.env.NODE_ENV === 'production' ? process.env.API_URL : '/api/users'
// }`;

const setConfig = () => {
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

const getUser = async (username, limit, page) => {
	const response = await axios.get(`${API_URL}/`);
	return response.data;
};

const uploadAvatar = async avatarObj => {
	const response = await axios.post(
		`${API_URL}/avatar`,
		avatarObj,
		setConfig()
	);
	return response.data;
};

const removeAvatar = async () => {
	const response = await axios.delete(`${API_URL}/avatar`, setConfig());
	return response.data;
};

const userService = { getUser, uploadAvatar, removeAvatar };

export default userService;
