import { useDispatch, useSelector } from 'react-redux';
// import { ReplyContext } from '../Comment/Comment';
import { useFormik } from 'formik';
import { addReply } from '../../../reducers/feedbackCommentsReducer';
import './ReplyForm.css';
import { useEffect, useState } from 'react';

const ReplyForm = ({
	currentFeedback,
	comment,
	setActive,
	getReplyActive,
	replyData,
	replyToReply,
	getReplyName,
}) => {
	const user = useSelector(state => state.user);
	const [profileImgData, setProfileImgData] = useState(user.profileImg);
	const dispatch = useDispatch();
	useEffect(() => {
		setProfileImgData(user.profileImg);
	}, [user.profileImg]);

	const formik = useFormik({
		initialValues: {
			// replyBody: `@${comment.username }`,
			replyBody: `@${replyToReply ? replyData.username : comment.username} `,
			profileImg: profileImgData,
		},
		onSubmit: values => {
			// e.preventDefault();
			// console.log(comment._id);
			replyToReply ? getReplyActive(false) : setActive(false);
			dispatch(addReply(currentFeedback._id, comment._id, values));
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
