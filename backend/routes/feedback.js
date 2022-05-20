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

const app = express();
const router = express.Router();

app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Origin',
		'https://feedback-lesley.herokuapp.com/api/feedbacks'
	); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// UPVOTE id post link
router.post('/upvote/:id', auth, upvoteFeedback);

// DOWNVOTE id post link
router.post('/downvote/:id', auth, downvoteFeedback);

// get SINGLE feedback
// '/api/feedbacks/details/:id'
router.get('/:id', auth, getSingleFeedback);
// get ALL feedbacks
router.get('/', auth, getFeedbacks);
router.post('/', auth, createNewFeedback);
// post comment
router.post('/:id', auth, postComment);
// reply to comment
router.post('/:id/comment/:commentId/reply', auth, postReply);

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
