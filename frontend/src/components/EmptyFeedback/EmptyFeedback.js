import EmptyImage from '../../assets/suggestions/illustration-empty.svg';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './EmptyFeedback.css';
import { useEffect, useState } from 'react';

const framerList = {
	hidden: {
		opacity: 0,
		translateX: -40,
	},
	show: {
		opacity: 1,
		translateX: 0,
		transition: {
			delay: 0.2,
		},
	},
};

const EmptyFeedback = ({ userDetails }) => {
	const [userPageActive, setUserPageActive] = useState(false);

	useEffect(() => {
		setUserPageActive(userDetails);
	}, [userDetails]);
	return (
		<motion.div
			variants={framerList}
			initial="hidden"
			animate="show"
			className="EmptyFeedback">
			<img src={EmptyImage} alt="" className="EmptyFeedback__image" />

			<h2 className="EmptyFeedback__title">
				{userPageActive
					? 'You have not posted any feedbacks yet.'
					: 'There is no feedback yet.'}
			</h2>
			<div className="EmptyFeedback__text">
				<p>Got a suggestion? Found a bug that needs to be squashed?</p>
				<p>We love hearing about new ideas to improve our app.</p>
			</div>
			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</motion.div>
	);
};

export default EmptyFeedback;
