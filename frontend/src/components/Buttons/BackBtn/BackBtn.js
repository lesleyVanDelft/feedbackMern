import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './BackBtn.css';

const BackBtn = ({ currentPage }) => {
	const [currPage, setCurrPage] = useState('');
	useEffect(() => {
		setCurrPage(currentPage);
	}, [currentPage]);

	return (
		<button className={`BackBtn ${currPage === 'details' ? 'dark' : 'light'}`}>
			<Link to={'/'}>
				<FaChevronLeft /> <span>Go Back</span>
			</Link>
		</button>
	);
};

export default BackBtn;
