import BlankProfilePic from '../../../assets/blank-profile-picture.png';
import './Comment.css';

const Comment = ({ commentData }) => {
	// console.log(commentData);
	return (
		<article className="Comment">
			<div className="Comment__userBar">
				<img src={BlankProfilePic} alt="" className="profileImage" />
				<div className="userNames">
					<h4 className="name">No Name</h4>
					<span className="username">@no_Name</span>
				</div>
				<button className="reply">Reply</button>
			</div>

			<p>{commentData}</p>
			{/* {console.log(commentData)} */}
		</article>
	);
};

export default Comment;
