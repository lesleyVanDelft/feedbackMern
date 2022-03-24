import { HiOutlineLightBulb, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import SuggestionSortBy from '../SuggestionSortBy/SuggestionSortBy';
import './SuggestionsHeader.css';

const SuggestionsHeader = ({ suggestionCount }) => {
	return (
		<header className="SuggestionsHeader">
			<div className="SuggestionsHeader__total">
				<HiOutlineLightBulb />
				<h2>
					<span className="suggestionCount">{suggestionCount}</span>Suggestions
				</h2>
			</div>
			<SuggestionSortBy />

			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</header>
	);
};

export default SuggestionsHeader;
