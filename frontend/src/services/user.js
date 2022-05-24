import axios from 'axios';
import { token } from './auth';

const API_URL = `/api/users`;

const setConfig = () => {
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

const getUser = async () => {
	const response = await axios.get(`${API_URL}/user`);
	return response.data;
};

// Upload profile picture
const postImage = async img => {
	const formData = new FormData();
	formData.append('image', img);

	const result = await axios.post('/images', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return result.data;
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

const userService = { getUser, uploadAvatar, removeAvatar, postImage };

export default userService;
