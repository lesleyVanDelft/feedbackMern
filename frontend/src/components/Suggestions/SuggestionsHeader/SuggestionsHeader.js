import { HiOutlineLightBulb, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import './SuggestionsHeader.css';

const SuggestionsHeader = () => {
	return (
		<header className="SuggestionsHeader">
			<div className="SuggestionsHeader__total">
				<HiOutlineLightBulb />
				<h2>
					<span>6</span>Suggestions
				</h2>
			</div>
			<div className="SuggestionsHeader__sort">
				<span>Sort by: </span>
				<button>Most Upvotes {<HiChevronDown />}</button>
			</div>

			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</header>
	);
};

export default SuggestionsHeader;
