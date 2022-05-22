import { useState, useEffect } from 'react';
import axios from 'axios';
import './UserModal.css';
import { useSelector } from 'react-redux';

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

	const submit = async e => {
		e.preventDefault();
		const result = await postImage({ image: file });
		setImages([...images, result.image]);
	};

	// Pass image state to User page
	useEffect(() => {
		return user.profileImg.exists ? getImage(file) : getImage('fuku');
	}, [file, getImage, user.profileImg.exists]);

	// useEffect(() =>{
	//     setFile(e.target.files[0])
	// }, [])
	const fileSelected = e => {
		const file = e.target.files[0];
		setFile(file);
	};

	const handleClick = e => {
		e.preventDefault();
	};

	return (
		// <form className={`UserModal ${active ? 'active' : ''}`}>
		// 	<label className="file">
		// 		<input type="file" accept="image/*" onChange={fileSelected} />
		// 		<span className="file__custom">Upload a photo...</span>
		// 	</label>
		// </form>

		<form onSubmit={submit} className={`UserModal ${active ? 'active' : ''}`}>
			<input onChange={fileSelected} type="file" accept="image/*" />
			<button type="submit">Submit</button>
		</form>
	);
};

export default UserModal;
