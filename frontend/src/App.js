import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import AppRoutes from './components/AppRoutes';

function App() {
	const user = useSelector(state => state.user);

	return (
		<div className="App">
			<Router>
				<AppRoutes user={user} />
			</Router>
			<ToastContainer autoClose={2500} />
		</div>
	);
}

export default App;
