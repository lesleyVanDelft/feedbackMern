import CreateFeedbackForm from '../../components/CreateFeedbackForm/CreateFeedbackForm';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import './Create.css';

const Create = () => {
	return (
		<main className="Create">
			<div className="Create__backButton">
				<button className="back">
					<Link to="/">
						<FaChevronLeft /> <span>Go Back</span>
					</Link>
				</button>
			</div>
			<CreateFeedbackForm />
		</main>
	);
};

export default Create;
