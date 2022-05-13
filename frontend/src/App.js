import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppRoutes from './components/AppRoutes';
function App() {
	const user = useSelector(state => state.user);

	return (
		<div className="App">
			<Router>
				<AppRoutes user={user} />
			</Router>
		</div>
	);
}

export default App;
