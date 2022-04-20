import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ReplyContext } from '../Comment/Comment';
import { useFormik } from 'formik';
import { addReply } from '../../../reducers/feedbackCommentsReducer';
import './ReplyForm.css';

const ReplyForm = ({
	currentFeedback,
	comment,
	setActive,
	getReplyActive,
	replyData,
	replyToReply,
	getReplyName,
}) => {
	const [replyBody, setReplyBody] = useState('');
	const [replyName, setReplyName] = useState('');
	const singleFeedback = useSelector(state => state.singleFeedback);
	const dispatch = useDispatch();
	// console.log(comment);

	const formik = useFormik({
		initialValues: {
			// replyBody: `@${comment.username }`,
			replyBody: `@${replyToReply ? replyData.username : comment.username} `,
		},
		onSubmit: values => {
			// e.preventDefault();
			// console.log(comment._id);
			replyToReply ? getReplyActive(false) : setActive(false);
			dispatch(addReply(currentFeedback._id, comment._id, values.replyBody));
		},
	});
	// const handleClick = e => {
	// 	// setReplyName(replyData.username);
	// 	// getReplyName(replyName);
	// 	// console.log(replyName);

	// 	console.log(e.target);
	// };

	// console.log(replyToReply);
	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	replyToReply ? getReplyActive(false) : setActive(false);
	// 	dispatch(addReply(currentFeedback._id, comment._id, replyBody));
	// };

	// const handleChange = e => {
	// 	setReplyBody(e.target.value);
	// };

	return (
		<form className="ReplyForm" onSubmit={formik.handleSubmit}>
			<textarea
				name="replyBody"
				id="replyBody"
				rows="5"
				// cols="55"
				maxLength={250}
				className="ReplyForm__textarea"
				// value={`@${replyData.username ? replyData.username : comment.username}`}
				value={formik.values.replyBody}
				onChange={formik.handleChange}
			/>
			<div className="ReplyForm__buttons">
				<button className="btn btn-purple" type="submit">
					Reply
				</button>
				<button
					className="btn btn-darkBlue"
					type="button"
					onClick={() =>
						replyToReply ? getReplyActive(false) : setActive(false)
					}>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default ReplyForm;
