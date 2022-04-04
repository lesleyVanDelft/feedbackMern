import { useState } from 'react';

export const UpvoteButton = ({ body, user, handleUpvote }) => {
	return (
		<input
			type="checkbox"
			name="upvote"
			id="upvote"
			checked={body.upvotedBy.includes(user.id)}
			onChange={handleUpvote}
		/>
	);
};
export const donwvoteButton = ({ body, handleDownvote }) => {
	return <input type="checkbox" name="downvote" id="downvote" />;
};
