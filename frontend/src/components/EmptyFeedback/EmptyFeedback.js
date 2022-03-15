import EmptyImage from '../../assets/suggestions/illustration-empty.svg';
import { Link } from 'react-router-dom';
import './EmptyFeedback.css';

const EmptyFeedback = () => {
	return (
		<section className="EmptyFeedback">
			<img src={EmptyImage} alt="" className="EmptyFeedback__image" />

			<h2 className="EmptyFeedback__title">There is no feedback yet.</h2>
			<div className="EmptyFeedback__text">
				<p>Got a suggestion? Found a bug that needs to be squashed?</p>
				<p>We love hearing about new ideas to improve our app.</p>
			</div>
			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</section>
	);
};

export default EmptyFeedback;
