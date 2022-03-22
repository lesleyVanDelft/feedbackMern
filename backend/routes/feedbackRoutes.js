const express = require('express');
// const { addComment } = require('../controllers/commentController');
const router = express.Router();
const {
	getFeedbacks,
	setFeedback,
	editFeedback,
	deleteFeedback,
	getSingleFeedback,
	addComment,
} = require('../controllers/feedbackController');
// const { getCurrentUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
// const Feedback = require('../models/feedbackModel');
// router.get('/currentUser', protect, getCurrentUser);/
router
	.route('/')
	.get(protect, getFeedbacks)
	.post(protect, setFeedback)
	.delete(protect, deleteFeedback);
// router.route('/create').post(protect, setFeedback);

router
	.route('/:id')
	.post(protect, addComment)
	.delete(protect, deleteFeedback)
	.put(protect, editFeedback)
	.get(protect, getSingleFeedback);

// router.route('/:id').get(protect, getCurrentUser);
// SAME AS 2 lines above ^^^
// router.get('/', getGoals);
// router.post('/', postGoal);
// router.put('/:id', editGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;
