const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');
const crypto = require('crypto');
const { promisify } = require('util');
const randomBytes = promisify(crypto.randomBytes);

// const aws = require('aws-sdk');
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

// initialize AWS S3
const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads file to s3
exports.uploadFile = async file => {
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

	// await User.findByIdAndUpdate(user._id, {
	// 	profileImg: {
	// 		exists: true,
	// 		imageLink: '',
	// 		imageId: result.Key,
	// 	},
	// 	imageId: result.Key,
	// });

	return s3.upload(uploadParams).promise();
};

// downloads files from s3
exports.getFileStream = fileKey => {
	try {
		const downloadParams = {
			Key: fileKey,
			Bucket: bucketName,
		};

		return s3.getObject(downloadParams).createReadStream();
	} catch (error) {
		console.log(error);
	}
};
