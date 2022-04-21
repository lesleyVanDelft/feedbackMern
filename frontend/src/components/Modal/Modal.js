import { motion } from 'framer-motion';
import './Modal.css';

// const initialMotion = {
// 	initial: {
// 		opacity: 0,
// 	},
// 	animate: {
// 		opacity: 1,
// 		transition: {
// 			duration: 2,
// 			// ease: [0.87, 0, 0.13, 1],
// 		},
// 	},
// };

const Modal = ({ children, feedback, active, closeModal, handleDelete }) => {
	return (
		<div className={`Modal ${active ? 'active' : ''}`}>
			<div className="Modal__content">
				<h3>Are you sure you want to delete your feedback?</h3>
				<div className="buttons">
					<button className="btn btn-darkBlue" onClick={closeModal}>
						Cancel
					</button>
					<button className="btn btn-red" onClick={handleDelete}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
