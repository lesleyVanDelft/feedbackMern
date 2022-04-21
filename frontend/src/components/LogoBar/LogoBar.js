import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './LogoBar.css';
const LogoBar = () => {
	return (
		<header className="LogoBar">
			<div className="LogoBar__content">
				<Link to="/">
					<h2>Frontend Mentor</h2>
				</Link>
				<Link to="/">
					<p>Feedback Board</p>
				</Link>
			</div>

			<Link to="/">
				<FaHome className="homeIcon" />
			</Link>
		</header>
	);
};

export default LogoBar;
