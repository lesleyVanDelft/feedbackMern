import { HiOutlineLightBulb, HiChevronDown, HiChevronUp } from 'react-icons/hi';
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

			<button className="btn btn-purple">+ Add Feedback</button>
		</header>
	);
};

export default SuggestionsHeader;
