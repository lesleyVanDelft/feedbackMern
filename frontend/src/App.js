import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './components/AppRoutes';
function App() {
	const user = useSelector(state => state.user);

	return (
		<div className="App">
			<Router>
				{/* <h3 className="userWelcome">
					Welcome, <span className="user">@{user.username}</span>
				</h3> */}
				<AppRoutes user={user} />
			</Router>
		</div>
	);
}

export default App;
