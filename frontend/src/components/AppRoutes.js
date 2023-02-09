import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Create from '../pages/Create/Create';
import Details from '../pages/Details/Details';
import Edit from '../pages/Edit/Edit';
import Test from '../pages/Test';
import RoadmapPage from '../pages/Roadmap/Roadmap';
import { AnimatePresence } from 'framer-motion';
import User from '../pages/User/User';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../reducers/userReducer';
import AuthPage from '../pages/AuthPage';

const AppRoutes = () => {
	const user = useSelector(state => state.user);
	const location = useLocation();
	const cookie = Cookies.get('jwt');
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (cookie === undefined || user === null) {
			dispatch(logoutUser());
			// localStorage.removeItem('root:user');
			navigate('/login');
		}
	}, [cookie, dispatch, navigate, user]);
	// console.log(cookie);

	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route exact path="/" element={<Homepage />} />
				<Route path="/login" element={<AuthPage loc={'login'} />} />
				{/* <Route path="/login" element={<Login loc={location.pathname} />} /> */}
				{/* <Route path="/register" element={<AuthPage loc={'register'} />} /> */}
				{/* <Route path="/register" element={<Register />} /> */}
				<Route exact path="/details/:id" element={<Details />} />
				<Route path="/edit/:id" element={<Edit />} />
				<Route path="/create" element={<Create />} />
				<Route path="/roadmap" element={<RoadmapPage />} />
				<Route path="/test" element={<Test />} />
				{/* <Route path="/user" element={<User currentUser={true} />} /> */}
				<Route path="/user/:userId" element={<User currentUser={false} />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AppRoutes;
