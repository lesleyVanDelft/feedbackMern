import { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export const UpvoteButton = ({
	feedback,
	user,
	handleUpvote,
	upvote,
	downvote,
}) => {
	const [upvotedBy, setUpvotedBy] = useState([]);
	const [downvotedBy, setDownvotedBy] = useState([]);
	useEffect(() => {
		setUpvotedBy(feedback.upvotedBy.filter(id => id === user.id));
	}, [feedback.upvotedBy, user.id]);

	useEffect(() => {
		setDownvotedBy(feedback.downvotedBy.filter(id => id === user.id));
	}, [feedback.downvotedBy, user.id]);
	// const user = useSelector(state => state.user);
	// console.log('=============================');
	// console.log(upvotedBy);
	// console.log('=============================');
	// console.log(downvotedBy);
	// console.log('=============================');
	return (
		<button
			type="button"
			user={user}
			className={`votes__upvote ${
				upvotedBy.includes(user.id) ? 'upvoteActive' : ''
			}`}
			// className={`votes__upvote ${upvote === true ? 'upvoteActive' : ''}`}
			onClick={e => {
				handleUpvote(e);
			}}>
			<FaChevronUp className="chevronUp" />
		</button>
	);
};
export const DownvoteButton = ({
	user,
	feedback,
	handleDownvote,
	upvote,
	downvote,
}) => {
	const [upvotedBy, setUpvotedBy] = useState([]);
	const [downvotedBy, setDownvotedBy] = useState([]);
	useEffect(() => {
		setUpvotedBy(feedback.upvotedBy.filter(id => id === user.id));
	}, [feedback.upvotedBy, user.id]);

	useEffect(() => {
		setDownvotedBy(feedback.downvotedBy.filter(id => id === user.id));
	}, [feedback.downvotedBy, user.id]);
	// const user = useSelector(state => state.user);
	// console.log('------------------------------');
	// console.log(upvotedBy);
	// console.log('------------------------------');
	// console.log(downvotedBy);
	// console.log('------------------------------');
	return (
		<button
			type="button"
			user={user}
			// className={`votes__downvote ${
			// 	active === 'downvote' ? 'downvoteActive' : ''
			// }`}
			className={`votes__downvote ${
				downvotedBy.includes(user.id) ? 'downvoteActive' : ''
			}`}
			onClick={e => handleDownvote(e)}>
			<FaChevronDown className="chevronUp" />
		</button>
	);
};

// const CompleteButton = (user, handleDownvote, active, count) => {
// 	return (
// 		<>
// 			<button className={`votes__downvote`}>
// 				<FaChevronUp className="chevronUp" />
// 			</button>
// 		</>
// 	);
// };

// export default CompleteButton;
