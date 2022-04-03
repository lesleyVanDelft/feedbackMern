import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import './Comment.css';

const Comment = ({ commentData, user }) => {
	// console.log(commentData);
	if (!commentData) {
		return <h1>loading</h1>;
	}
	return (
		<article className="Comment">
			<div className="Comment__userBar">
				<img src={BlankProfilePic} alt="" className="profileImage" />
				<div className="userNames">
					<h4 className="name">{commentData.name}</h4>
					<span className="username">@{commentData.username}</span>
					{/* {console.log(commentData.commentedBy.name)} */}
				</div>
				<button className="reply">Reply</button>
				{commentData.commentBy === user._id && (
					<button className="delete">delete</button>
				)}
			</div>
			<p>{commentData.commentBody}</p>
		</article>

		// commentData.map(comment => {
		// 	return (
		// 		<article className="Comment">
		// 			<div className="Comment__userBar">
		// 				<img src={BlankProfilePic} alt="" className="profileImage" />
		// 				<div className="userNames">
		// 					<h4 className="name">{user.name}</h4>
		// 					<span className="username">@{user.username}</span>
		// 				</div>
		// 				<button className="reply">Reply</button>
		// 			</div>

		// 			<p>{comment.commentBody}</p>
		// 		</article>
		// 	);
		// })
		// )}
	);
};

export default Comment;
