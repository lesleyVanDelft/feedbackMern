import { Route, Routes, useLocation } from 'react-router-dom';
// import Header from './components/Header/Header';
import Homepage from '../pages/Homepage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Create from '../pages/Create/Create';
import Details from '../pages/Details/Details';
import Edit from '../pages/Edit/Edit';
import Test from '../pages/Test';
import RoadmapPage from '../pages/Roadmap/Roadmap';
import { AnimatePresence } from 'framer-motion';

const AppRoutes = () => {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter>
			<Routes location={location} key={location.pathname}>
				<Route exact path="/" element={<Homepage />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/details/:id" element={<Details />} />
				<Route path="/edit/:id" element={<Edit />} />
				<Route path="/create" element={<Create />} />
				<Route path="/roadmap" element={<RoadmapPage />} />
				<Route path="/test" element={<Test />} />
			</Routes>
		</AnimatePresence>
	);
};

export default AppRoutes;
