<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const {
	getFeedbacks,
	setFeedback,
	editFeedback,
	deleteFeedback,
	getSingleFeedback,
} = require('../controllers/feedbackController');
const { protect } = require('../middleware/authMiddleware');
// const Feedback = require('../models/feedbackModel');

router
	.route('/')
	.get(protect, getFeedbacks)
	.post(protect, setFeedback)
	.delete(protect, deleteFeedback);
// router
// 	.route('/edit/:id')
// 	.get(protect, getSingleFeedback)
// 	.put(protect, editFeedback)
// 	.delete(protect, deleteFeedback);
router
	.route('/:id')
	.get(protect, getSingleFeedback)
	.delete(protect, deleteFeedback)
	.put(protect, editFeedback);

=======
// const express = require('express');
// // const { addComment } = require('../controllers/commentController');
// const router = express.Router();
// const {
// 	getFeedbacks,
// 	setFeedback,
// 	editFeedback,
// 	deleteFeedback,
// 	getSingleFeedback,
// 	addComment,
// 	likeFeedback,
// } = require('../controllers/feedbackController.js');
// // const { getCurrentUser } = require('../controllers/userController');
// const { protect } = require('../middleware/authMiddleware.js');
// // const Feedback = require('../models/feedbackModel');
// // router.get('/currentUser', protect, getCurrentUser);/
>>>>>>> toolkittesting
// router
// 	.route('/')
// 	.get(protect, getFeedbacks)
// 	.post(protect, setFeedback)
// 	.post(protect, likeFeedback)
// 	.delete(protect, deleteFeedback);

// router
// 	.route('/:id')
// 	.get(protect, getSingleFeedback)
// 	.post(protect, addComment)
// 	.delete(protect, deleteFeedback)
// 	.put(protect, editFeedback);

// router.route('/:id/upvote').post(protect, likeFeedback);
// router.route('/details/:id').post(addComment).get(protect, getSingleFeedback);
// // router.route('/upvote').post(protect, likeFeedback);
// // router.route('/create').post(protect, setFeedback);

// // router.route('/:id').get(protect, getCurrentUser);
// // SAME AS 2 lines above ^^^
// // router.get('/', getGoals);
// // router.post('/', postGoal);
// // router.put('/:id', editGoal);
// // router.delete('/:id', deleteGoal);

// module.exports = router;
