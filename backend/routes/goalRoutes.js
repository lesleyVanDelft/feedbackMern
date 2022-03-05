const express = require('express');
const router = express.Router();
const {
	getGoals,
	setGoal,
	editGoal,
	deleteGoal,
} = require('../controllers/goalController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getGoals).post(protect, setGoal);
router.route('/:id').delete(protect, deleteGoal).put(protect, editGoal);

// SAME AS 2 lines above ^^^
// router.get('/', getGoals);
// router.post('/', postGoal);
// router.put('/:id', editGoal);
// router.delete('/:id', deleteGoal);

module.exports = router;
