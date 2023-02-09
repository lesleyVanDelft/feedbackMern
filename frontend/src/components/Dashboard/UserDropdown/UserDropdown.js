import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import './UserDropdown.css';

const UserDropdown = ({ logout, mobile }) => {
	const user = useSelector(state => state.user);

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
	return (
		<motion.div
			className={`UserDropdown ${mobile ? 'mobile' : 'desktop'}`}
			variants={framerList}
			initial="hidden"
			animate="show"
			exit="exit">
			<ul className="UserDropdown__list">
				<li className="UserDropdown__list--item">
					<Link to={`/user/${user.id}`}>My Account</Link>
				</li>
				<li className="UserDropdown__list--item" onClick={logout}>
					Logout
				</li>
			</ul>
		</motion.div>
	);
};

export default UserDropdown;
