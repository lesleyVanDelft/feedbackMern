import BlankProfilePic from '../../assets/blank-profile-picture.png';
import { IoClose } from 'react-icons/io5';
import './ImageModal.css';
import { useEffect, useState } from 'react';

const ImageModal = ({ active, getState, image }) => {
	const [activeState, setActiveState] = useState(active);

	const handleClose = () => {
		setActiveState(!active);
		getState(activeState);
	};
	useEffect(() => {
		setActiveState(active);
		getState(activeState);
	}, [active, activeState, getState]);

	return (
		<div className={`ImageModal ${activeState ? 'active' : ''}`}>
			<div className="ImageModal__content">
				<img src={image} alt="" />

				<div className="close" onClick={handleClose}>
					<IoClose />
				</div>
			</div>
		</div>
	);
};

export default ImageModal;
