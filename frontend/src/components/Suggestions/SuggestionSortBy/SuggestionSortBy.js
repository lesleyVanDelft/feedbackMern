import { useState } from 'react';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { FiCheck } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import './SuggestionSortBy.css';

const SuggestionSortBy = () => {
	const [active, setActive] = useState(false);
	const [selected, setSelected] = useState('Most Upvotes');

	const handleClick = () => {
		setActive(!active);
	};

	// framer motion
	const framerList = {
		hidden: {
			translateY: -30,
			opacity: 0,
			transition: {
				duration: 0.2,
				delay: 0,
			},
		},
		show: {
			translateY: 0,
			opacity: 1,
			transition: {
				duration: 0.2,
				delay: 0,
			},
		},
		exit: {
			translateY: -25,
			opacity: 0,
			transition: {
				duration: 0.2,
				delay: 0,
			},
		},
	};

	const handleSelect = e => {
		// setSelected(e.target.value);
		console.log(e.target.value);
	};

	return (
		<motion.div
			className={`SuggestionSortBy SuggestionsHeader__sort`}
			onFocus={() => handleClick()}
			onBlur={() => handleClick()}>
			<span className="sortBy">Sort by: </span>
			<button>
				<span className="selected">{selected}</span>{' '}
				{active ? <HiChevronUp /> : <HiChevronDown />}
			</button>
			<AnimatePresence exitBeforeEnter={true}>
				{active && (
					<motion.ul
						variants={framerList}
						initial="hidden"
						animate={active ? 'show' : 'hidden'}
						exit="exit"
						className={`dropdown  ${active ? 'active' : null}`}>
						<li onClick={() => setSelected('Most Upvotes')}>
							<span>Most Upvotes</span>{' '}
							{selected === 'Most Upvotes' && <FiCheck />}
						</li>
						<li onClick={() => setSelected('Least Upvotes')}>
							<span>Least Upvotes</span>{' '}
							{selected === 'Least Upvotes' && <FiCheck />}
						</li>
						<li onClick={() => setSelected('Most Comments')}>
							<span>Most Comments</span>{' '}
							{selected === 'Most Comments' && <FiCheck />}
						</li>
						<li onClick={() => setSelected('Least Comments')}>
							<span>Least Comments</span>{' '}
							{selected === 'Least Comments' && <FiCheck />}
						</li>
					</motion.ul>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

export default SuggestionSortBy;
