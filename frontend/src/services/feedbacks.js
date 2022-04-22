import axios from 'axios';
import { token } from './auth';
import { backendUrl } from '../backendUrl';
import Cookies from 'js-cookie';

// const API_URL = `${backendUrl}/api/feedbacks`;
const API_URL = `/api/feedbacks`;

const tokenCookie = Cookies.get('jwt');
// console.log(tokenCookie);
const setConfig = () => {
	return {
		headers: { Authorization: `Bearer ${tokenCookie}` },
	};
};

// const config = {
// 	headers: { Authorization: `Bearer ${token}` },
// };

// get user feedbacks
const getFeedbacks = async () => {
	const response = await axios.get(API_URL + '/', setConfig());

	// console.log();
	return response.data;
};

// get single feedback
const getSingleFeedback = async id => {
	const response = await axios.get(`${API_URL}/details/${id}`, setConfig());
	return response.data;
};

const addNew = async feedbackObj => {
	const response = await axios.post(API_URL, feedbackObj, setConfig());
	return response.data;
};

const editFeedback = async (id, feedbackObj) => {
	const response = await axios.patch(
		`${API_URL}/${id}`,
		feedbackObj,
		setConfig()
	);
	return response.data;
};

const getFeedbackComments = async id => {
	const response = await axios.get(`${API_URL}/details/${id}`, setConfig());
	return response.data;
};

const upvoteFeedback = async id => {
	const response = await axios.post(
		`${API_URL + '/upvote/' + id}`,
		// `${API_URL + id + '/upvote'}`,
		null,
		setConfig()
	);
	return response.data;
};
const upvoteFeedbackDetails = async id => {
	const response = await axios.post(
		`${API_URL + 'upvote/' + id}`,
		// `${API_URL + id + '/upvote'}`,
		null,
		setConfig()
	);
	return response.data;
};

const downvoteFeedback = async id => {
	const response = await axios.post(
		`${API_URL + 'downvote/' + id}`,
		null,
		setConfig()
	);
	return response.data;
};
const downvoteFeedbackDetails = async id => {
	const response = await axios.post(
		`${API_URL + 'downvote/' + id}`,

		null,
		setConfig()
	);
	return response.data;
};

const deleteFeedback = async id => {
	const response = await axios.delete(`${API_URL}/` + id);
	console.log('delete test');
	return response.data;
};

const postComment = async (feedbackId, commentObj) => {
	const response = await axios.post(
		`${API_URL + '/details/' + feedbackId}`,
		commentObj,
		setConfig()
	);
	// console.log(response);
	return response.data;
};

const postReply = async (feedbackId, commentId, replyObj) => {
	const response = await axios.post(
		`${API_URL + '/details/' + feedbackId}/comment/${commentId}/reply`,
		replyObj,
		setConfig()
	);
	return response.data;
};

// REPLY TO REPLY
// Request URL: http://localhost:3000/api/feedbacks/details/624a051e144bddae062b586a/comment/624a0b343fbc960f6cf35406/reply
// NORMAL REPLY
// Request URL: http://localhost:3000/api/feedbacks/details/624a051e144bddae062b586a/comment/624c545eb999d68c5469514e/reply
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
		`${API_URL}${feedbackId}/comment/${commentId}`
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
	getSingleFeedback,
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
	upvoteFeedbackDetails,
	downvoteFeedbackDetails,
};

export default feedbackService;
