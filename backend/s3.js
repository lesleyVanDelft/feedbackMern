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

const s3 = new S3({
	region,
	accessKeyId,
	secretAccessKey,
});

// uploads file to s3
exports.uploadFile = file => {
	const fileStream = fs.createReadStream(file.path);
	// console.log(file);
	const uploadParams = {
		Bucket: bucketName,
		Body: fileStream,
		Key: file.filename,
	};

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
