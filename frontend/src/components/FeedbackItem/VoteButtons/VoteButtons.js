import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

export const UpvoteButton = ({
	body,
	user,
	handleUpvote,
	active,
	notActive,
}) => {
	// const [active, setActive] = useState()
	// const [notActive, setNotActive] = useState()

	return (
		<button
			user={user}
			// body={body}
			className={`votes__upvote ${active && !notActive ? 'upvoteActive' : ''}`}
			onClick={e => {
				handleUpvote(e);
			}}>
			<FaChevronUp className="chevronUp" />
		</button>
	);
};
export const DownvoteButton = ({
	body,
	user,
	handleDownvote,
	active,
	notActive,
}) => {
	return (
		<button
			user={user}
			// body={body}
			className={`votes__downvote ${
				active && !notActive ? 'downvoteActive' : ''
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
