import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import userReducer from '../reducers/userReducer';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { setProfileImage } from '../reducers/userReducer';
import axios from 'axios';

const Test = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setProfileImage);
	}, []);
	// const postImage = async ({ image }) => {
	// 	const formData = new FormData();
	// 	formData.append('image', image);

	// 	const result = await axios.post('/images', formData, {
	// 		headers: { 'Content-Type': 'multipart/form-data' },
	// 	});
	// 	return result.data;
	// };

	// const [file, setFile] = useState();
	// const [images, setImages] = useState([]);

	// const submit = async e => {
	// 	e.preventDefault();
	// 	const result = await postImage({ image: file });
	// 	setImages([result.image]);
	// };

	// const fileSelected = event => {
	// 	const file = event.target.files[0];
	// 	// console.log(file);
	// 	setFile(file);
	// };

	// useEffect(() => {
	// 	// setCurrImage(file);
	// 	// console.log(images);
	// 	console.log(file);
	// 	// axios.get(`/images/`);
	// }, [file]);

	// console.log(currImage);
	// const str = '/images/435738947598437594387593485743987u';
	// const splitStr = str.split('/')[2];
	return (
		<>
			{/* <LoadingSpinner /> */}
			<h1>test page</h1>
			{/* {console.log(splitStr)} */}
			<img src="/images/58a12bb01cc28aa36533b6ff465a0e05" alt="" />
			{/* {} */}

			{/* <form onSubmit={submit}>
				<input onChange={fileSelected} type="file" accept="image/*"></input>

				<button type="submit">Submit</button>
			</form> */}

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
