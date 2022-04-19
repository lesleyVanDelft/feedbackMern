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
	const errorMessage = useSelector(state => state.errorMessage);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
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
			dispatch(loginUser(values));
		},
		// onSubmit: async values => {
		// 	try {
		// 		// const response = await axios({
		// 		// 	method: 'POST',
		// 		// 	url: `/api/users/login`,
		// 		// 	data: {
		// 		// 		email: values.email,
		// 		// 		password: values.password,
		// 		// 	},
		// 		// });
		// 		// return response.data;

		// 			dispatch(loginUser(values))

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

	const onChange = e => {
		setError(null);
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

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
	const onSubmit = e => {
		e.preventDefault();
		dispatch(loginUser(formData));
	};

	useEffect(() => {
		if (user) {
			navigate('/');
		}
	}, [user, navigate]);

	useEffect(() => {
		return errorMessage ? setError(errorMessage) : null;
	}, [errorMessage]);

	return (
		<main className="Login">
			<Header login={true} />
			<section className="Login__form form">
				<div className="heading">
					<h2>
						<FaSignInAlt /> Login
					</h2>
					<p>Login and share your feedback</p>
				</div>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						{error && error.status === 400 && (
							<span className="errorMsg">{error.data}</span>
						)}
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							// value={formik.values.email}
							value={formData.email}
							placeholder="Enter your email"
							// onChange={formik.handleChange}
							onChange={onChange}
							// onBlur={formik.handleBlur}
						/>
						{formik.touched.email && formik.errors.email ? (
							<p className="formikErrorMessage">{formik.errors.email}</p>
						) : null}
					</div>
					<div className="form-group">
						{/* {error && (
							<span className="error">{error.response.data.message}</span>
						)} */}
						{error && error.status === 401 && (
							<span className="errorMsg">{error.data}</span>
						)}
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							// value={formik.values.password}
							value={formData.password}
							placeholder="Enter your password"
							// onChange={formik.handleChange}
							onChange={onChange}
							// onBlur={formik.handleBlur}
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
