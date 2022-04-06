import { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

export const UpvoteButton = ({ body, user, handleUpvote, active }) => {
	return (
		<button
			user={user}
			// body={body}
			className={`votes__upvote ${active ? 'active' : ''}`}
			onClick={e => handleUpvote(e)}>
			<FaChevronUp className="chevronUp" />
		</button>
	);
};
export const donwvoteButton = ({ body, handleDownvote }) => {
	return <input type="checkbox" name="downvote" id="downvote" />;
};
