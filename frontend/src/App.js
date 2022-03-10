import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Details from './pages/Details/Details';
import Edit from './pages/Edit/Edit';
import Create from './pages/Create/Create';

function App() {
	return (
		<>
			<Router>
				<div className="App">
					<Header />
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/:id" element={<Details />} />
						<Route path="/edit/:id" element={<Edit />} />
						<Route path="/create" element={<Create />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
