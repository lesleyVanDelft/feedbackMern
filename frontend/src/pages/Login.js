import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../reducers/userReducer';
import Spinner from '../components/Spinner';
import Header from '../components/Header/Header';
import { errorHandler } from '../utils/errorHandler';
import axios from 'axios';

const Login = () => {
	const user = useSelector(state => state.user);
	const [error, setError] = useState(null);
	// const [formData, setFormData] = useState({
	// 	email: '',
	// 	password: '',
	// });
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email().required('Email required'),
			password: Yup.string().required('Password required'),
		}),
		onSubmit: values => {
			try {
				dispatch(loginUser(values));
			} catch (err) {
				// console.log(`${err} loginpage`);
				setError(err);

				console.log(error);

				// errorHandler(err);
				// console.log(err);
			}
		},
		// onSubmit: async values => {
		// 	try {
		// 		await axios({
		// 			method: 'POST',
		// 			url: `/api/users/login`,
		// 			data: {
		// 				email: values.email,
		// 				password: values.password,
		// 			},
		// 		}).then(res => res.json());
		// 	} catch (err) {
		// 		setError(err);
		// 		console.log(err);
		// 	}
		// },
	});
	// destructure useState
	// const { email, password } = formData;
	// useNavigate
	const navigate = useNavigate();
	// fire off functions from authSlice
	const dispatch = useDispatch();

	// const onChange = e => {
	// 	setFormData(prevState => ({
	// 		...prevState,
	// 		[e.target.name]: e.target.value,
	// 	}));
	// };

	// const onSubmit = e => {
	// 	e.preventDefault();
	// 	// user && navigate('/');
	// 	try {
	// 		const userData = {
	// 			email,
	// 			password,
	// 		};
	// 		dispatch(loginUser(userData));
	// 		// dispatch(setUser());
	// 		setTimeout(() => {
	// 			navigate('/');
	// 		}, 300);
	// 	} catch (error) {
	// 		console.log('login page error');
	// 		console.log(error.message);
	// 	}
	// };

	useEffect(() => {
		if (user) {
			navigate('/');
		}
		// console.log(errorHandler());
	}, [user, navigate]);
	console.log();

	return (
		<main className="Login">
			{/* <section className="heading">
				
			</section> */}
			<Header login={true} />
			<section className="Login__form form">
				<div className="heading">
					<h2>
						<FaSignInAlt /> Login
					</h2>
					<p>Login and share your feedback</p>
				</div>
				<form onSubmit={formik.handleSubmit}>
					<div className="form-group">
						{error && <span className="error">{error.message}</span>}
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={formik.values.email}
							placeholder="Enter your email"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email ? (
							<p className="formikErrorMessage">{formik.errors.email}</p>
						) : null}
					</div>
					<div className="form-group">
						{error && (
							<span className="error">{error.response.data.message}</span>
						)}
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={formik.values.password}
							placeholder="Enter your password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.password && formik.errors.password ? (
							<p className="formikErrorMessage">{formik.errors.password}</p>
						) : null}
					</div>

					<button type="submit" className="btn btnSubmit">
						Submit
					</button>
				</form>
			</section>
		</main>
	);
};

export default Login;
