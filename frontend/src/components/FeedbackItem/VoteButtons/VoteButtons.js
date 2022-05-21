import { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const UpvoteButton = ({ feedback, user, handleUpvote }) => {
	const [upvotedBy, setUpvotedBy] = useState([]);
	const [downvotedBy, setDownvotedBy] = useState([]);
	useEffect(() => {
		setUpvotedBy(feedback.upvotedBy.filter(id => id === user.id));
	}, [feedback.upvotedBy, user.id]);

	useEffect(() => {
		setDownvotedBy(feedback.downvotedBy.filter(id => id === user.id));
	}, [feedback.downvotedBy, user.id]);
	return (
		<button
			type="button"
			user={user}
			className={`votes__upvote ${
				upvotedBy.includes(user.id) ? 'upvoteActive' : ''
			}`}
			onClick={e => {
				handleUpvote(e);
			}}>
			<FaChevronUp className="chevronUp" />
		</button>
	);
};
export const DownvoteButton = ({ user, feedback, handleDownvote }) => {
	const [upvotedBy, setUpvotedBy] = useState([]);
	const [downvotedBy, setDownvotedBy] = useState([]);
	useEffect(() => {
		setUpvotedBy(feedback.upvotedBy.filter(id => id === user.id));
	}, [feedback.upvotedBy, user.id]);

	useEffect(() => {
		setDownvotedBy(feedback.downvotedBy.filter(id => id === user.id));
	}, [feedback.downvotedBy, user.id]);
	return (
		<button
			type="button"
			user={user}
			className={`votes__downvote ${
				downvotedBy.includes(user.id) ? 'downvoteActive' : ''
			}`}
			onClick={e => handleDownvote(e)}>
			<FaChevronDown className="chevronUp" />
		</button>
	);
};
