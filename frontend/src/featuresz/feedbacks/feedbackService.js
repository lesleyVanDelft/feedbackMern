// import axios from 'axios';
// import Cookies from 'js-cookie';

// const API_URL = '/api/feedbacks/';
// const token = Cookies.get('jwt');
// // create new feedback
// const createFeedback = async (feedbackData, token) => {
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	const response = await axios.post(API_URL, feedbackData, config);

// 	return response.data;
// };

// // get user feedbacks
// const getFeedbacks = async token => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	const response = await axios.get(API_URL, config);

// 	return response.data;
// };

// // get single feedback
// // const localToken = JSON.parse(localStorage.getItem('user'));
// const getSingleFeedback = async feedbackId => {
// 	// let currToken = localStorage.setItem('currToken', token);
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	// let { _id } = localStorage.getItem('user');
// 	// console.log(_id);
// 	// console.log(object);

// 	const response = await axios.get(API_URL + feedbackId, config);
// 	return response.data;
// };

// // Edit feedback
// // let user = JSON.parse(sessionStorage.getItem())
// const editFeedback = async (data, token) => {
// 	// console.log(updateData);
// 	const config = {
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json',
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	// console.log(config.headers);
// 	// needs updated data
// 	const response = await axios.put(API_URL + data._id, data, config);
// 	// console.log(response.data);
// 	return response.data;
// };

// // delete feedback
// const deleteFeedback = async (feedbackId, token) => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};

// 	const response = await axios.delete(API_URL + feedbackId, config);
// 	// console.log(response);
// 	return response.data;
// };

// // add a comment

// const addComment = async data => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	// Authorization:localStorage.getItem('jwtToken'
// 	const response = await axios.post(
// 		API_URL + data._id,
// 		{ text: data.text },
// 		config
// 	);

// 	return response.data;
// };

// // like
// const likeComment = async data => {
// 	const config = {
// 		headers: {
// 			Authorization: `Bearer ${token}`,
// 		},
// 	};
// 	const response = await axios.post(
// 		// API_URL + upvoteData._id + '/upvote',
// 		`${API_URL + data._id}/upvote`,
// 		data,
// 		config
// 	);

// 	// console.log(response.data);

// 	return response.data;
// };

// const feedbackService = {
// 	createFeedback,
// 	getFeedbacks,
// 	deleteFeedback,
// 	getSingleFeedback,
// 	editFeedback,
// 	addComment,
// 	likeComment,
// };

// export default feedbackService;
