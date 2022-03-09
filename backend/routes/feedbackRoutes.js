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

router.route('/').get(protect, getFeedbacks).post(protect, setFeedback);
router
	.route('/:id')
	.get(protect, getSingleFeedback)
	.delete(protect, deleteFeedback)
	.put(protect, editFeedback);
// router.get('/:id', () => {})

// SAME AS 2 lines above ^^^
// router.get('/', getGoals);
// router.post('/', postGoal);
// router.put('/:id', editGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;
