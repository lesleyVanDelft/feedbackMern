import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
// import { register, reset } from '../features/auth/authSlice';
import { registerUser } from '../reducers/userReducer';
// import {}
import Spinner from '../components/Spinner';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		username: '',
		password: '',
		password2: '',
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

	return (
		<main className="Register">
			<section className="Register__form">
				<form onSubmit={onSubmit}>
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
							value={name}
							placeholder="Enter your name"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							required
							type="text"
							className="form-control"
							id="username"
							name="username"
							value={username}
							placeholder="Enter your username"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							required
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
							required
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={password}
							placeholder="Enter your password"
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							required
							type="password"
							className="form-control"
							id="password2"
							name="password2"
							value={password2}
							placeholder="Confirm password"
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

export default Register;
