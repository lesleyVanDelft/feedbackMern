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

// router
// 	.route('edit/:id')
// 	.get(protect, getSingleFeedback)
// 	.put(protect, editFeedback)
// 	.delete(protect, deleteFeedback);

// router
// 	.route('/edit/:id')
// 	.put(protect, editFeedback)
// 	.get(protect, getSingleFeedback)
// 	// .post(protect, setFeedback)
// 	.delete(protect, deleteFeedback);

// router.put('/edit/:id', protect, (req, res) => {
// 	let updates = req.body;

// 	Feedback.findByIdAndUpdate({ _id: req.params.id }, updates, { new: true })
// 		.then(updatedFeedback => res.json(updatedFeedback))
// 		.catch(err => res.status(400).json('Error' + err));
// });
// router.get('/:id', () => {})

// SAME AS 2 lines above ^^^
// router.get('/', getGoals);
// router.post('/', postGoal);
// router.put('/:id', editGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;
