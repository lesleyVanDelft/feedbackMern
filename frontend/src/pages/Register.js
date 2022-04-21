import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { registerUser } from '../reducers/userReducer';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
// import Spinner from '../components/Spinner';
import Header from '../components/Header/Header';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		username: '',
		password: '',
		password2: '',
	});

	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			username: '',
			password: '',
			password2: '',
		},
		validationSchema: Yup.object({
			name: Yup.string().required('Please enter your name'),
			email: Yup.string().email().required('Please enter a valid email adress'),
			username: Yup.string().required('Please enter a username'),
			password: Yup.string()
				.min(6, 'Password must be 6 characters or more')
				.max(35)
				.required('Please enter a password'),
			password2: Yup.string().oneOf(
				[Yup.ref('password'), null],
				'Passwords must match'
			),
		}),
		onSubmit: values => {
			dispatch(registerUser(values));
			navigate('/');
			// console.log('submit test register');
		},
	});

	const { name, email, username, password, password2 } = formData;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();
		try {
			// if (!name || !email || !username || !password || !password2) {
			// 	alert('add all fields');
			// }
			const userData = {
				name,
				email,
				username,
				password,
			};

			dispatch(registerUser(userData));

			navigate('/');
		} catch (error) {
			console.log(error.message);
		}

		// if (password !== password2) {
		// 	toast.error('Passwords do not match');
		// } else {

		// }
	};

	// if (isLoading) {
	// 	return <Spinner />;
	// }
	const initialMotion = {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				duration: 0.3,
				// ease: [0.87, 0, 0.13, 1],
			},
		},
	};

	return (
		<motion.main
			className="Register"
			variants={initialMotion}
			initial="initial"
			animate="animate">
			<Header login={false} />
			<section className="Register__form">
				<form onSubmit={formik.handleSubmit}>
					<div className="heading">
						<h2>
							<FaUser /> Register
						</h2>
						<p>Please create an account</p>
					</div>
					<div className="form-group">
						<input
							required
							type="text"
							className="form-control"
							id="name"
							name="name"
							value={formik.values.name}
							placeholder="Enter your name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.name && formik.errors.name ? (
							<p className="formikErrorMessage">{formik.errors.name}</p>
						) : null}
					</div>
					<div className="form-group">
						<input
							required
							type="text"
							className="form-control"
							id="username"
							name="username"
							value={formik.values.username}
							placeholder="Enter your username"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.username && formik.errors.username ? (
							<p className="formikErrorMessage">{formik.errors.username}</p>
						) : null}
					</div>
					<div className="form-group">
						<input
							required
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
						<input
							required
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
					<div className="form-group">
						<input
							required
							type="password"
							className="form-control"
							id="password2"
							name="password2"
							value={formik.values.password2}
							placeholder="Confirm password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
						{formik.touched.password2 && formik.errors.password2 ? (
							<p className="formikErrorMessage">{formik.errors.password2}</p>
						) : null}
					</div>

					<button type="submit" className="btn btnSubmit">
						Submit
					</button>
				</form>
			</section>
			<ToastContainer autoClose={3500} />
		</motion.main>
	);
};

export default Register;
