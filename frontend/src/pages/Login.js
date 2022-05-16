import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginUser } from '../reducers/userReducer';
import Header from '../components/Header/Header';
import { motion } from 'framer-motion';
import PageLogo from '../components/PageLogo/PageLogo';

const Login = () => {
	const user = useSelector(state => state.user);
	const [error, setError] = useState(null);
	const errorMessage = useSelector(state => state.errorMessage);

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
	});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (user) {
			navigate('/');
		} else {
			navigate('/login');
		}
	}, [user, navigate]);

	useEffect(() => {
		return errorMessage ? setError(errorMessage) : null;
	}, [errorMessage]);

	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},
	};

	return (
		<motion.main
			className="Login"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<PageLogo />
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
						{error && error.status === 400 && (
							<span className="errorMsg">{error.data}</span>
						)}
						<label htmlFor="email">Email:</label>
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={formik.values.email}
							// value={formData.email}
							placeholder="Enter your email"
							onChange={formik.handleChange}
							// onChange={onChange}
							onBlur={formik.handleBlur}
							// onBlur={handleBlur}
						/>
						{formik.touched.email && formik.errors.email ? (
							<p className="formikErrorMessage">{formik.errors.email}</p>
						) : null}
						{/* {blurMessage !== '' ? (
							<p className="formikErrorMessage">Please enter your email</p>
						) : null} */}
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
							value={formik.values.password}
							// value={formData.password}
							placeholder="Enter your password"
							onChange={formik.handleChange}
							// onChange={onChange}
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
		</motion.main>
	);
};

export default Login;
