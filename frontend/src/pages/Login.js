import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	// destructure useState
	const { email, password } = formData;

	// useNavigate
	const navigate = useNavigate();

	// fire off functions from authSlice
	const dispatch = useDispatch();

	// get state from redux
	const { user, isLoading, isError, isSuccess, message } = useSelector(
		state => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess || user) {
			navigate('/');
		}

		// dispatch(reset());
	}, [user, isError, isSuccess, message, navigate, dispatch]);

	const onChange = e => {
		setFormData(prevState => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = e => {
		e.preventDefault();

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<main className="Login">
			{/* <section className="heading">
				
			</section> */}

			<section className="Login__form form">
				<div className="heading">
					<h2>
						<FaSignInAlt /> Login
					</h2>
					<p>Login and share your feedback</p>
				</div>
				<form onSubmit={onSubmit}>
					<div className="form-group">
						<input
							type="email"
							className="form-control"
							id="email"
							name="email"
							value={email}
							placeholder="Enter your email"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={onChange}
						/>
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
