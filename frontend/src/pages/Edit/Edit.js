import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaChevronLeft } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import EditFeedbackForm from '../../components/EditFeedbackForm/EditFeedbackForm';
import LogoBar from '../../components/LogoBar/LogoBar';
import { motion } from 'framer-motion';
import './Edit.css';

const Edit = () => {
	const singleFeedback = useSelector(state => state.singleFeedback);

	if (!singleFeedback) {
		return <h2>Loading</h2>;
	}
	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},
	};

	return (
		<motion.section
			className="Edit"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<LogoBar />
			<div className="Edit__content">
				<div className="Edit__backButton">
					<button className="back">
						<Link to="/">
							<FaChevronLeft /> <span>Go Back</span>
						</Link>
					</button>
				</div>
				<EditFeedbackForm feedbackData={singleFeedback} />
			</div>
		</motion.section>
	);
};

export default Edit;
