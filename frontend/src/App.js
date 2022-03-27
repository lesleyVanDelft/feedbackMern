import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFeedbacks } from './reducers/feedbackReducer';
import { setUser } from './reducers/userReducer';
import { useSelector } from 'react-redux';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create/Create';
import Details from './pages/Details/Details';
import Edit from './pages/Edit/Edit';
import Test from './pages/Test';

function App() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	useEffect(() => {
		// const setAllFeedbacks = () => {
		// 	try {
		// 		dispatch(getFeedbacks());
		// 	} catch (error) {
		// 		console.log(error.message);
		// 	}
		// };
		if (!user) {
			dispatch(setUser());
		} else if (user) {
			dispatch(getFeedbacks());
		}

		// dispatch(getFeedbacks());
		// setAllFeedbacks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// if (!user) {
	// 	dispatch(setUser());
	// }

	return (
		<>
			<Router>
				<div className="App">
					<Header />
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/details/:id" element={<Details />} />
						<Route path="/edit/:id" element={<Edit />} />
						<Route path="/create" element={<Create />} />
						<Route path="/test" element={<Test />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
