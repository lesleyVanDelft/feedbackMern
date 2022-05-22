import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Test = () => {
	const postImage = async ({ image }) => {
		const formData = new FormData();
		formData.append('image', image);

		const result = await axios.post('/images', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return result.data;
	};

	const [file, setFile] = useState();
	const [images, setImages] = useState([]);

	const submit = async e => {
		e.preventDefault();
		const result = await postImage({ image: file });
		setImages([result.image]);
	};

	const fileSelected = event => {
		const file = event.target.files[0];
		// console.log(file);
		setFile(file);
	};

	useEffect(() => {
		// setCurrImage(file);
		// console.log(images);
		console.log(file);
		// axios.get(`/images/`);
	}, [file]);

	// console.log(currImage);

	return (
		<>
			<form onSubmit={submit}>
				<input onChange={fileSelected} type="file" accept="image/*"></input>

				<button type="submit">Submit</button>
			</form>

			{/* {images.map(im => (
				<img src={im} alt="lol"></img>
			))} */}
			{/* <img
				src="/images/27200047cdf99136d197811bfbaff511"
				alt=""
				// style={{ width: '800px', height: '500px' }}
			/> */}
			{/* <img src={currImage} alt="" /> */}
		</>
	);
};

export default Test;
