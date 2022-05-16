import axios from 'axios';
import Cookies from 'js-cookie';

// const API_URL = `/api/feedbacks`;
const API_URL = `/api/feedbacks`;

// Gets jwt token from cookie and adds it to request header
const setConfig = () => {
	const tokenCookie = Cookies.get('jwt');
	return {
		headers: { Authorization: `Bearer ${tokenCookie}` },
	};
};

// GET - all feedbacks
const getFeedbacks = async () => {
	const response = await axios.get(API_URL, setConfig());
	return response.data;
};

// GET - single feedback
const getSingleFeedback = async id => {
	const response = await axios.get(`${API_URL}/${id}`, setConfig());
	return response.data;
};

// POST - create new feedback
const addNew = async feedbackObj => {
	const response = await axios.post(API_URL, feedbackObj, setConfig());
	return response.data;
};

// PATCH - edit feedback
const editFeedback = async (id, feedbackObj) => {
	const response = await axios.patch(
		`${API_URL}/${id}`,
		feedbackObj,
		setConfig()
	);
	return response.data;
};

// GET - single feedback ? -- NOT SURE IF NEEDED YET
const getFeedbackComments = async id => {
	const response = await axios.get(`${API_URL}/${id}`, setConfig());
	return response.data;
};

// POST - upvote feedback
const upvoteFeedback = async id => {
	const response = await axios.post(
		`${API_URL + '/upvote/' + id}`,
		null,
		setConfig()
	);
	return response.data;
};

// POST - upvote details page -- NOT SURE IF NEEDED YET
const upvoteFeedbackDetails = async id => {
	// const response = await axios.post(
	// 	`${API_URL + '/upvote/' + id}`,
	// 	null,
	// 	setConfig()
	// );
	// return response.data;
};

// POST - downvote feedback
const downvoteFeedback = async id => {
	const response = await axios.post(
		`${API_URL + '/downvote/' + id}`,
		null,
		setConfig()
	);
	return response.data;
};

// POST - downvote feedback -- NOT SURE IF NEEDED YET
const downvoteFeedbackDetails = async id => {
	const response = await axios.post(
		`${API_URL + '/downvote/' + id}`,

		null,
		setConfig()
	);
	return response.data;
};

// DELETE - delete feedback
const deleteFeedback = async id => {
	const response = await axios.delete(`${API_URL}/` + id);
	return response.data;
};

// POST - post a comment
const postComment = async (feedbackId, commentObj) => {
	const response = await axios.post(
		`${API_URL + '/details/' + feedbackId}`,
		commentObj,
		setConfig()
	);
	return response.data;
};

// POST - post a reply to comment
const postReply = async (feedbackId, commentId, replyObj) => {
	const response = await axios.post(
		`${API_URL + '/details/' + feedbackId}/comment/${commentId}/reply`,
		replyObj,
		setConfig()
	);
	return response.data;
};

// PATCH - edit comment
const updateComment = async (feedbackId, commentId, commentObj) => {
	const response = await axios.patch(
		`${API_URL}/${feedbackId}/comment/${commentId}`,
		commentObj
		// setConfig()
	);
	return response.data;
};

// DELETE - delete comment
const removeComment = async (feedbackId, commentId) => {
	const response = await axios.delete(
		`${API_URL}/${feedbackId}/comment/${commentId}`,
		setConfig()
	);
	return response.data;
};

// PATCH - edit reply to comment
const updateReply = async (feedbackId, commentId, replyId, replyObj) => {
	const response = await axios.patch(
		`${API_URL}/${feedbackId}/comment/${commentId}/reply/${replyId}`,
		replyObj
		// setConfig()
	);
	return response.data;
};

// DELETE - remove reply
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
