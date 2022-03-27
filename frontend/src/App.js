import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Create from './pages/Create/Create';
import Details from './pages/Details/Details';
import Edit from './pages/Edit/Edit';
import Test from './pages/Test';

function App() {
	return (
		<>
			<Router>
				<div className="App">
					<Header />
					<Routes>
						<Route exact path="/" element={<Homepage />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/details/:id" element={<Details />} />
						<Route exact path="/edit/:id" element={<Edit />} />
						<Route exact path="/create" element={<Create />} />
						<Route exact path="/test" element={<Test />} />
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
