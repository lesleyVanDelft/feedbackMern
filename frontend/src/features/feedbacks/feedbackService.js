import axios from 'axios';

const API_URL = '/api/feedbacks/';

// create new feedback
const createFeedback = async (feedbackData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, feedbackData, config);

	return response.data;
};

// get user feedbacks
const getFeedbacks = async token => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// get single feedback
const getSingleFeedback = async (feedbackId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + feedbackId, config);
	return response.data;
};

// delete feedback
const deleteFeedback = async (feedbackId, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.delete(API_URL + feedbackId, config);
	return response.data;
};

const feedbackService = {
	createFeedback,
	getFeedbacks,
	deleteFeedback,
	getSingleFeedback,
};

export default feedbackService;
