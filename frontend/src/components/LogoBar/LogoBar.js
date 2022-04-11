import { Link } from 'react-router-dom';
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
		</header>
	);
};

export default LogoBar;
