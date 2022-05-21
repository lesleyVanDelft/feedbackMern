require('dotenv').config();
const path = require('path');
const express = require('express');
const multer = require('multer');
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
const { uploadFile, getFileStream } = require('./s3');

connectDB();

const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('tiny'));

app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/users', authRoutes);

app.get('/images/:key', (req, res) => {
	const key = req.params.key;
	const readStream = getFileStream(key);

	readStream.pipe(res);
});
app.post('/images', upload.single('image'), async (req, res) => {
	const file = req.file;
	console.log(file);

	// apply filter
	// resize

	const result = await uploadFile(file);
	await unlinkFile(file.path);
	console.log(result);
	const description = req.body.description;
	res.send({ imagePath: `/images/${result.Key}` });
});

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
