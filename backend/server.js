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
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const { getFeedbacks } = require('./controllers/feedback');

connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('tiny'));

app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/users', authRoutes);

app.get('/login', (req, res) => {
	res.status(301).redirect('https://feedback-lesley.herokuapp.com');
});
app.get('/roadmap', getFeedbacks);

app.get('/roadmap', (req, res) => {
	res.status(301).send('roadmap');
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('/*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		);
	});
} else {
	app.get('/', (req, res) => {
		res.send('API is running');
	});
}

app.listen(PORT, () =>
	console.log(`Feedbackmern backend is running on port ${PORT}`)
);
