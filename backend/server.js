require('dotenv').config();
const path = require('path');
const express = require('express');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const port = process.env.PORT || 5000;
const host = '0.0.0.0';
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const userRoutes = require('./routes/user');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan('tiny'));

// these get used in redux service files
// app.use('/api/feedbacks', require('./routes/feedbackRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// app.use('/api', authRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/users', authRoutes, userRoutes);

app.use(middleware.unknownEndpointHandler);
// app.use(middleware.errorHandler);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		);
	});
} else {
	app.get('/', (req, res) => res.send('Please set to production'));
}

// app.use(errorHandler);

app.listen(port, host, () =>
	console.log(`Feedbackmern backend is running on port ${port}`)
);
