import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileImage } from '../../../reducers/userReducer';
import { motion } from 'framer-motion';
import './UserModal.css';

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
	const [images, setImages] = useState([]);
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();

	const framerVariants = {
		hidden: {
			opacity: 0,
		},
		show: {
			opacity: 1,
		},
		exit: {
			opacity: 0,
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
	};

	return (
		<motion.form
			variants={framerVariants}
			initial="hidden"
			animate="show"
			exit="exit"
			onSubmit={submit}
			// className={`UserModal ${active ? 'active' : ''}`}
			className={`UserModal`}>
			<input onChange={fileSelected} type="file" accept="image/*" />
			<button type="submit">Submit</button>
		</motion.form>
	);
};

export default UserModal;
