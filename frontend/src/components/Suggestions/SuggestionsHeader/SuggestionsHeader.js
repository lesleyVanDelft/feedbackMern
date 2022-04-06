import { useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { HiOutlineLightBulb, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import SuggestionSortBy from '../SuggestionSortBy/SuggestionSortBy';
import './SuggestionsHeader.css';

const SuggestionsHeader = ({ suggestionCount, sortBy, roadmap }) => {
	const [headerSortState, setHeaderSortState] = useState('');

	const getHeaderSort = getSort => {
		setHeaderSortState(getSort);
		sortBy(headerSortState);
	};

	return roadmap === false ? (
		<header className="SuggestionsHeader">
			<div className="SuggestionsHeader__total">
				<HiOutlineLightBulb />
				<h2>
					<span className="suggestionCount">{suggestionCount}</span>Suggestions
				</h2>
			</div>
			<SuggestionSortBy getSortState={getHeaderSort} />

			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</header>
	) : (
		<header className="SuggestionsHeader">
			<div className="Roadmap__header">
				<button className="back">
					<Link to="/">
						<FaChevronLeft /> <span>Go Back</span>
					</Link>
				</button>
				<h3>Roadmap</h3>
			</div>
			<Link to="/create" className="btnLink">
				<button className="btn btn-purple">+ Add Feedback</button>
			</Link>
		</header>
	);
};

export default SuggestionsHeader;
