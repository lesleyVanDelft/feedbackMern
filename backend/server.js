require('dotenv').config();
const path = require('path');
const jwt = require('jsonwebtoken');
// const brcyptjs = require('bryptjs');
const fs = require('fs');
const util = require('node:util');
const unlinkFile = util.promisify(fs.unlink);
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
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
const { checkUser } = require('./middleware/authMiddleware');
const { setProfileImage, changePassword } = require('./controllers/user');
// const { setProfileImage } = require('./controllers/user');
const User = require('./models/userModel');
const Feedback = require('./models/feedbackModel');
const { uploadFile, getFileStream } = require('./s3');
const { auth } = require('./utils/middleware');
// const feedbackModel = require('./models/');

connectDB();

const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('tiny'));

// checkUser sets req.user
// app.post('/user', changePassword);
app.use('/api/feedbacks', checkUser, feedbackRoutes);
app.use('/api/users', authRoutes);

app.get('/images/:key', (req, res) => {
	const key = req.params.key;
	const readStream = getFileStream(key);

	readStream.pipe(res);
});

app.post('/images', upload.single('image'), async (req, res) => {
	// Uploaded file
	const file = req.file;

	// JWT token
	const token = req.cookies.jwt;
	const decoded = jwt.verify(token, process.env.JWT_SECRET);
	const user = await User.findById(decoded.id);

	// AWS S3 upload
	const result = await uploadFile(file);
	// console.log(typeof result.Key);

	// Updates user imageId with new AWS S3 result
	await User.findByIdAndUpdate(user._id, {
		profileImg: {
			exists: true,
			imageLink: '',
			imageId: result.Key,
		},
		imageId: result.Key,
	});

	// await Feedback.upda

	// const comments = await Feedback.findByIdAndUpdate(user./_id);
	// const testt = await
	// console.log(result.Key);

	// Removes uploaded file from multer folder: uploads/
	await unlinkFile(file.path);
	// await User.save();
	res.send({ imagePath: `/images/${result.Key}` });
});

app.get('/login', (req, res) => {
	// const location = req.params.userLocation;
	// console.log(req.params);
	// console.log('login test');

	res.status(301);
	// res.status(301).redirect('http://localhost:3000/login');
});
app.get('/register', (req, res) => {
	res.status(301);
	// res.status(301).redirect('http://localhost:3000/login');
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
