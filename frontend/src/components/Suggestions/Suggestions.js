import SuggestionsHeader from './SuggestionsHeader/SuggestionsHeader';
import './Suggestions.css';

const Suggestions = ({ suggestionCount }) => {
	return (
		<section className="Suggestions">
			<SuggestionsHeader suggestionCount={suggestionCount} />
		</section>
	);
};

export default Suggestions;
