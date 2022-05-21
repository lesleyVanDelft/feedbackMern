import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const postImage = async ({ image, description }) => {
	const formData = new FormData();
	formData.append('image', image);
	formData.append('description', description);

	const result = await axios.post('/images', formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	return result.data;
};

const Test = () => {
	const [file, setFile] = useState();
	const [description, setDescription] = useState('');
	const [images, setImages] = useState([]);
	const feedbacks = useSelector(state => state.feedbacks);

	const submit = async e => {
		e.preventDefault();
		const result = await postImage({ image: file, description });
		setImages([result.image, ...images]);
	};

	const fileSelected = event => {
		const file = event.target.files[0];
		setFile(file);
	};

	return (
		<>
			<form onSubmit={submit}>
				<input onChange={fileSelected} type="file" accept="image/*"></input>
				<input
					value={description}
					onChange={e => setDescription(e.target.value)}
					type="text"></input>
				<button type="submit">Submit</button>
			</form>
			{/* <img src="/images/488de294972ef2af03acab95322ad2f6" alt="" /> */}
		</>
		// <h1>test</h1>
	);
};

export default Test;
