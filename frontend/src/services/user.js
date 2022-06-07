import axios from 'axios';
import Cookies from 'js-cookie';
import { token } from './auth';

const API_URL = `/api/users`;

const setConfig = () => {
	const tokenCookie = Cookies.get('jwt');
	return {
		headers: { Authorization: `Bearer ${tokenCookie}` },
	};
};

const getUser = async id => {
	const response = await axios.get(`${API_URL}/user/${id}`);
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

// change password
const changePassword = async (id, passwordData) => {
	const response = await axios.patch(
		API_URL + `/${id}`,
		passwordData,
		setConfig()
	);
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

const userService = {
	getUser,
	uploadAvatar,
	removeAvatar,
	postImage,
	changePassword,
};

export default userService;
