import { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const UpvoteButton = ({
	body,
	user,
	handleUpvote,
	upvote,
	downvote,
}) => {
	return (
		<button
			type="button"
			user={user}
			// className={`votes__upvote ${upvote && !downvote ? 'upvoteActive' : ''}`}
			className={`votes__upvote ${upvote === true ? 'upvoteActive' : ''}`}
			onClick={e => {
				handleUpvote(e);
			}}>
			<FaChevronUp className="chevronUp" />
		</button>
	);
};
export const DownvoteButton = ({ user, handleDownvote, upvote, downvote }) => {
	const [active, setActive] = useState();

	useEffect(() => {
		downvote && setActive('downvote');
	}, [downvote]);
	return (
		<button
			type="button"
			user={user}
			className={`votes__downvote ${
				active === 'downvote' ? 'downvoteActive' : ''
			}`}
			// className={`votes__downvote ${
			// 	downvote && !upvote ? 'downvoteActive' : ''
			// }`}
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
