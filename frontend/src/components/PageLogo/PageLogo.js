import { Link } from 'react-router-dom';
import './PageLogo.css';
const PageLogo = () => {
	return (
		<div className="PageLogo">
			<Link to={'/'}>
				<h1>
					<span className="underline">Frontend</span> Mentor
				</h1>
				<h2 className="">Feedback Board</h2>
			</Link>
		</div>
	);
};

export default PageLogo;
