import {
	BrowserRouter as Router,
	Routes,
	Route,
	useNavigate,
} from 'react-router-dom';
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
import Cookies from 'js-cookie';
import RoadmapPage from './pages/Roadmap/Roadmap';
// import RoadmapPage from './components/Dashboard/Roadmap/Roadmap';
function App() {
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const user = useSelector(state => state.user);
	const feedbacks = useSelector(state => state.feedbacks);
	const singleFeedback = useSelector(state => state.singleFeedback);

	// useEffect(() => {
	// 	try {
	// 		if (!user) {
	// 			return null;
	// 		} else {
	// 			dispatch(setUser());
	// 			dispatch(getFeedbacks());
	// 			console.log('app.js effect');
	// 		}
	// 	} catch (error) {
	// 		return console.log(error + 'effect App.js');
	// 	}
	// }, []);

	// if (!user) {
	// 	return <h1>Loading.</h1>;
	// }
	// if (!feedbacks) {
	// 	return <h1>Loading.</h1>;
	// }

	return (
		<Router>
			<div className="App">
				<Header />
				<Routes>
					<Route exact path="/" element={<Homepage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/details/:id"
						element={<Details singleFeedback={singleFeedback} />}
					/>
					<Route path="/edit/:id" element={<Edit />} />
					<Route path="/create" element={<Create />} />
					<Route path="/roadmap" element={<RoadmapPage />} />
					<Route path="/test" element={<Test />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
