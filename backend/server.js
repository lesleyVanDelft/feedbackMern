const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const host = '0.0.0.0';
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(cors);
// app.use(bodyParser.json());
// app.put("/edit", async ( req, res) => {

// })
// these get used in redux service files
app.use('/api/feedbacks', require('./routes/feedbackRoutes'));
app.use('/api/feedbacks/edit/:id', require('./routes/feedbackRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// potential fix
// const distDir = __dirname + '/dist/';
// app.use(express.static(distDir));

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

app.use(errorHandler);

app.listen(port, host, () =>
	console.log(`Feedbackmern backend is running on port ${port}`)
);
