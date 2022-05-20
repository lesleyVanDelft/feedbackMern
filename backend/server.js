require('dotenv').config();
const path = require('path');
const express = require('express');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');

const staticDir = path.join(__dirname, '../frontend/build');

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));

app.use(function (req, res, next) {
	res.header(
		'Access-Control-Allow-Origin',
		'https://feedback-lesley.herokuapp.com'
	); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// app.use('/api', authRoutes);
app.use('/api/users', authRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// app.get('/login', (req, res) => {
// 	// console.log('login req test');
// 	// res.status(200).send('GET req login page');
// 	res.status(200);
// });

// app.get('/register', (req, res) => {
// 	// res.status(200).send('GET req register page');
// 	res.status(200);
// });

// app.get('/', (req, res) => {
// 	res.status(200).json({
// 		status: 'success',
// 	});
// });
app.get('/login', (req, res) => {
	// res.status(301).redirect('https://feedback-lesley.herokuapp.com');
	res.status(301).redirect('https://feedback-lesley.herokuapp.com');
});
// app.get('/register', (req, res) => {
// 	res.status(301).redirect('https://feedback-lesley.herokuapp.com');
// });
app.get('/:id', (req, res) => {
	res
		.status(301)
		// .redirect(`https://feedback-lesley.herokuapp.com/details/${req.params.id}`);
		.redirect(`https://feedback-lesley.herokuapp.com/${req.params.id}`);
	// res.status(301).redirect(`http://localhost:3000/details/${req.params.id}`);
	// res.send('fili');
});
// app.get('/', (req, res) => {
// 	res.status(301).redirect('https://feedback-lesley.herokuapp.com/');
// });
app.get('/roadmap', (req, res) => {
	res.status(301).send('roadmap');
});
// app.get('/user', (req, res) => {
// 	res.status(301).redirect('https://feedback-lesley.herokuapp.com');
// });
// app.use('/api/users', authRoutes);
// app.use('/api/feedbacks', feedbackRoutes);

// app.use(middleware.errorHandler);

// Serve frontend
// const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('/', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		);
	});
}
// else {
// 	app.get('/', (req, res) => {
// 		res.send('API is running');
// 	});
// }

// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('../frontend/build'));
// }

// app.use('/api/users', authRoutes);
// app.use('/api/feedbacks', feedbackRoutes);

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
// });
// app.use(middleware.unknownEndpointHandler);
// app.use(middleware.pushStateRouting(staticDir));

// app.use(errorHandler);

app.listen(PORT, () =>
	console.log(`Feedbackmern backend is running on port ${PORT}`)
);
