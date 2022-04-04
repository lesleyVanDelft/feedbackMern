import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import './Comment.css';

const Comment = ({ commentData, user }) => {
	// console.log(commentData);
	// console.log(user);
	if (!commentData) {
		return <h1>loading</h1>;
	}
	return (
		<article className="Comment">
			<div className="Comment__userBar">
				<img src={BlankProfilePic} alt="" className="profileImage" />
				<div className="Comment__usernames">
					<h4 className="name">{commentData.name}</h4>
					<span className="username">@{commentData.username}</span>
					{/* {console.log(commentData.commentedBy.name)} */}
				</div>
				<div className="Comment__buttons">
					<button className="reply">Reply</button>
					{commentData.commentedBy === user.id && (
						<button className="delete">delete</button>
					)}
				</div>
			</div>
			<p className="Comment__text">{commentData.commentBody}</p>
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
