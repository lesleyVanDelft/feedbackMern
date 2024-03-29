import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../../reducers/userReducer';
import { motion } from 'framer-motion';
import './UserModal.css';
import { handleOutsideClick } from '../../../utils/handleOutsideClick';

// Axios post image
const postImage = async ({ image, description }) => {
	const formData = new FormData();
	formData.append('image', image);

	const result = await axios.post('/images', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return result.data;
};

// Component
const UserModal = ({ active, getImage }) => {
	const [file, setFile] = useState();
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const dropdownRef = useRef(null);
	const [listening, setListening] = useState(false);
	useEffect(handleOutsideClick(listening, setListening, dropdownRef, active));

	const framerVariants = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
			transition: {
				duration: '0.2',
			},
		},
		exit: {
			opacity: 0,
			transition: {
				duration: '0.25',
			},
		},
	};

	const submit = async e => {
		e.preventDefault();
		dispatch(setProfileImage(file));
	};

	// Pass image state to User page
	useEffect(() => {
		return user.profileImg.exists
			? getImage(file)
			: getImage('image file not found');
	}, [file, getImage, user.profileImg.exists]);

	const fileSelected = e => {
		const file = e.target.files[0];
		setFile(file);

		dispatch(setProfileImage(file));
	};

	return (
		<motion.div
			variants={framerVariants}
			initial="hidden"
			animate="show"
			exit="exit"
			className={`UserModal`}>
			<div className="UserModal__upload">
				<input
					id="fileInput"
					className="UserModal__upload--fileInput"
					onChange={fileSelected}
					type="file"
					accept="image/*"
				/>
				<label htmlFor="fileInput" className="UserModal__upload--labelButton">
					{/* <p>Upload an image...</p> */}
					Upload an image...
				</label>
			</div>

			<div className="UserModal__delete">
				<button className="deleteImageBtn">Delete Image</button>
			</div>

			{/* <button type="submit">Submit</button> */}
		</motion.div>
	);
};

export default UserModal;
