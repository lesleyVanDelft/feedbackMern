const express = require('express');
const { auth } = require('../utils/middleware');

const {
	getFeedbacks,
	getFeedbackAndComments,
	createNewFeedback,
	updateFeedback,
	deleteFeedback,
} = require('../controllers/feedback');
const {
	upvoteFeedback,
	downvoteFeedback,
} = require('../controllers/feedbackVote');
const {
	postComment,
	deleteComment,
	updateComment,
	postReply,
	deleteReply,
	updateReply,
} = require('../controllers/postComment');

const router = express.Router();

//CRUD posts routes
router.get('/homepage', getFeedbacks);
// router.get('/search', getSearchedPosts);
router.get('/details/:id', getFeedbackAndComments);
// router.get('/subscribed', auth, getSubscribedPosts);
router.post('/create', auth, createNewFeedback);
router.patch('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

//posts vote routes
router.post('/:id/upvote', auth, upvoteFeedback);
router.post('/:id/downvote', auth, downvoteFeedback);

//post comments routes
router.post('/:id/comment', auth, postComment);
router.delete('/:id/comment/:commentId', auth, deleteComment);
router.patch('/:id/comment/:commentId', auth, updateComment);
router.post('/:id/comment/:commentId/reply', auth, postReply);
router.delete('/:id/comment/:commentId/reply/:replyId', auth, deleteReply);
router.patch('/:id/comment/:commentId/reply/:replyId', auth, updateReply);

//comment vote routes
// router.post('/:id/comment/:commentId/upvote', auth, upvoteComment);
// router.post('/:id/comment/:commentId/downvote', auth, downvoteComment);
// router.post('/:id/comment/:commentId/reply/:replyId/upvote', auth, upvoteReply);
// router.post(
//   '/:id/comment/:commentId/reply/:replyId/downvote',
//   auth,
//   downvoteReply
// );

module.exports = router;
