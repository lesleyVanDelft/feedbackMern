const express = require('express');
const { auth } = require('../utils/middleware');
const { protect, checkUser } = require('../middleware/authMiddleware');

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
//posts vote routes
router.post('/upvote/:id', auth, upvoteFeedback);
router.post('/:id/downvote', downvoteFeedback);
// router.get('*', checkUser);
router.get('/', auth, getFeedbacks);
// router.get('/search', getSearchedPosts);
router.post('/details/:id', auth, postComment);
router.get('/details/:id', auth, getFeedbackAndComments);
// router.route('/details/:id').get(getFeedbackAndComments).delete(deleteComment)
// router.get('/details/edit/:id', getFeedbackAndComments);
// router.get('/subscribed', auth, getSubscribedPosts);
router.post('/', auth, createNewFeedback);
router.patch('/:id', updateFeedback);
router.delete('/:id', deleteFeedback);

//post comments routes
// router.post('/details/:id', auth, postComment);
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
