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
		setImages([...images, result.image]);
	};

	const fileSelected = event => {
		const file = event.target.files[0];
		setFile(file);
	};

	// console.log(images);

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
			<img
				src="/images/013c6b5038044cefac16abad310c4151"
				alt=""
				// style={{ width: '800px', height: '500px' }}
			/>
			{/* <img
				src="https://feedback-lesley.s3.eu-west-2.amazonaws.com/19df987588d2e5dc104dfd2c63a4d9b2"
				alt=""
			/> */}
		</>
	);
};

export default Test;
