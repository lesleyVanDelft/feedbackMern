import { useEffect, useRef, useState } from 'react';
import { FaChevronDown, FaCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { handleOutsideClick } from '../../utils/handleOutsideClick';
import './DropdownMenu.css';

const DropdownMenu = ({ category }) => {
	const [menuActive, setMenuActive] = useState(false);
	const [selected, setSelected] = useState('Feature');

	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	const toggle = () => setMenuActive(!menuActive);

	useEffect(
		handleOutsideClick(listening, setListening, dropdownRef, setMenuActive)
	);

	const handleSelect = select => {
		setSelected(select);
		category(selected);
		setMenuActive(false);
	};

	// framer motion
	const framerList = {
		hidden: {
			translateY: -30,
			opacity: 0,
		},
		show: {
			translateY: 0,
			opacity: 1,
		},
		exit: {
			translateY: -10,
			opacity: 0,
		},
	};

	const categoryArray = ['Feature', 'UI', 'UX', 'Enhancement', 'Bug'];

	return (
		<div className="DropdownMenu" ref={dropdownRef}>
			<button
				type="button"
				onClick={toggle}
				className={`DropdownMenu__btn ${menuActive && 'active'}`}>
				{selected} <FaChevronDown />
			</button>
			<AnimatePresence>
				{menuActive && (
					<motion.ul
						variants={framerList}
						initial="hidden"
						animate="show"
						exit="exit"
						className={`DropdownMenu__list ${menuActive && 'active'}`}>
						{categoryArray.map((category, i) => {
							return (
								<li
									className="DropdownMenu__list--item"
									key={i}
									onClick={() => handleSelect(category)}>
									{category}
									{category === selected && <FaCheck />}
								</li>
							);
						})}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default DropdownMenu;
