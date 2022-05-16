const express = require('express');
const { auth } = require('../utils/middleware');
const { protect, checkUser } = require('../middleware/authMiddleware');

const {
	getFeedbacks,
	getSingleFeedback,
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

// UPVOTE id post link
router.post('/upvote/:id', auth, upvoteFeedback);

// DOWNVOTE id post link
router.post('/downvote/:id', auth, downvoteFeedback);

// get ALL feedbacks
router.get('/', auth, getFeedbacks);
router.post('/', auth, createNewFeedback);

// get SINGLE feedback
router.get('/details/:id', auth, getSingleFeedback);
// post comment
router.post('/details/:id', auth, postComment);
// reply to comment
router.post('/details/:id/comment/:commentId/reply', auth, postReply);

// // // // // // // // // // // // // // // // // // // // // // // // // //
// get details page - current feedback and comments related to feedback   //
// router.get('/details/:id', auth, getFeedbackAndComments);			 //
// router.get('/details/:id', auth, getFeedbacks);
// // // // // // // // // // // // // // // // // // // // // // // // //

router.patch('/:id', auth, updateFeedback);
router.delete('/:id', auth, deleteFeedback);

//post comments routes

router.delete('/:id/comment/:commentId', auth, deleteComment);
router.patch('/:id/comment/:commentId', auth, updateComment);
router.delete('/:id/comment/:commentId/reply/:replyId', auth, deleteReply);
router.patch('/:id/comment/:commentId/reply/:replyId', auth, updateReply);

module.exports = router;
