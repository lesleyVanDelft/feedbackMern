import axios from 'axios';

export const postImage = async ({ image }) => {
	const formData = new FormData();
	formData.append('image', image);
	// console.log('imageHandler');

	const result = await axios.post('/images', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return result.data;
};
