import axios from 'axios';
import { token } from './auth';
import Cookies from 'js-cookie';

const API_URL = '/api/feedbacks/';

const setConfig = () => {
	// const tokenCookie = Cookies.get('jwt');
	// console.log(tokenCookie);
	return {
		headers: { Authorization: `Bearer ${token}` },
	};
};

// const config = {
// 	headers: { Authorization: `Bearer ${token}` },
// };

// get user feedbacks
const getFeedbacks = async () => {
	const response = await axios.get(API_URL, setConfig());
	// console.log();
	return response.data;
};

const addNew = async feedbackObj => {
	const response = await axios.post(API_URL, feedbackObj);
	return response.data;
};

const editFeedback = async (id, feedbackObj) => {
	const response = await axios.patch(
		`${API_URL}${id}`,
		feedbackObj
		// setConfig()
	);
	return response.data;
};

const getFeedbackComments = async id => {
	const response = await axios.get(`${API_URL}details/${id}`);
	return response.data;
};

const upvoteFeedback = async id => {
	const response = await axios.post(
		`${API_URL}/${id}/upvote`,
		null
		// setConfig()
	);
	return response.data;
};

const downvoteFeedback = async id => {
	const response = await axios.post(
		`${API_URL}/${id}/downvote`,
		null
		// setConfig()
	);
	return response.data;
};

const deleteFeedback = async id => {
	const response = await axios.delete(`${API_URL}` + id);
	console.log('delete test');
	return response.data;
};
const postComment = async (feedbackId, commentObj) => {
	const response = await axios.post(
		`${API_URL}/${feedbackId}/comment`,
		commentObj
		// setConfig()
	);
	return response.data;
};

const postReply = async (feedbackId, commentId, replyObj) => {
	const response = await axios.post(
		`${API_URL}/${feedbackId}/comment/${commentId}/reply`,
		replyObj
		// setConfig()
	);
	return response.data;
};

const updateComment = async (feedbackId, commentId, commentObj) => {
	const response = await axios.patch(
		`${API_URL}/${feedbackId}/comment/${commentId}`,
		commentObj
		// setConfig()
	);
	return response.data;
};

const removeComment = async (feedbackId, commentId) => {
	const response = await axios.delete(
		`${API_URL}/${feedbackId}/comment/${commentId}`
		// setConfig()
	);
	return response.data;
};

const updateReply = async (feedbackId, commentId, replyId, replyObj) => {
	const response = await axios.patch(
		`${API_URL}/${feedbackId}/comment/${commentId}/reply/${replyId}`,
		replyObj
		// setConfig()
	);
	return response.data;
};

const removeReply = async (feedbackId, commentId, replyId) => {
	const response = await axios.delete(
		`${API_URL}/${feedbackId}/comment/${commentId}/reply/${replyId}`
		// setConfig()
	);
	return response.data;
};

const feedbackService = {
	getFeedbacks,
	addNew,
	editFeedback,
	getFeedbackComments,
	upvoteFeedback,
	downvoteFeedback,
	deleteFeedback,
	postComment,
	updateComment,
	removeComment,
	postReply,
	updateReply,
	removeReply,
};

export default feedbackService;
