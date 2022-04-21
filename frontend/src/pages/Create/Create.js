import CreateFeedbackForm from '../../components/CreateFeedbackForm/CreateFeedbackForm';
import { Link } from 'react-router-dom';
import LogoBar from '../../components/LogoBar/LogoBar';
import { FaChevronLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Create.css';

const initialMotion = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
		transition: {
			duration: 0.3,
			// ease: [0.87, 0, 0.13, 1],
		},
	},
};
const Create = () => {
	return (
		<motion.main
			className="Create"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<LogoBar />
			<div className="Create__content">
				<div className="Create__backButton">
					<button className="back">
						<Link to="/">
							<FaChevronLeft /> <span>Go Back</span>
						</Link>
					</button>
				</div>
				<CreateFeedbackForm />
			</div>
		</motion.main>
	);
};

export default Create;
