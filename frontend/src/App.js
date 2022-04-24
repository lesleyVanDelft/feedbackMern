import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFeedbacks } from './reducers/feedbackReducer';
import { useSelector } from 'react-redux';
import AppRoutes from './components/AppRoutes';
function App() {
	// const location = useLocation();
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	// useEffect(() => {
	// 	try {
	// 		if (user) {
	// 			dispatch(getFeedbacks());
	// 		}
	// 	} catch (err) {
	// 		console.log(err.response);
	// 		console.log('app.js');
	// 	}
	// }, [dispatch, user]);

	return (
		<div className="App">
			<Router>
				<AppRoutes user={user} />
			</Router>
		</div>
	);
}

export default App;
