import express from 'express';
import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';
import moment from 'moment';
import Diary from '../model/diary.js';
AWS.config.update({
	region: 'ap-northeast-2',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp'];
// s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data.Buckets);
//     }
//   });

const imageUploader = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'bandabucket',
		key: (req, file, callback) => {
			const extension = path.extname(file.originalname);
			const datetime = moment().format('YYYYMMDD');
			if (!allowedExtensions.includes(extension)) {
				return callback(new Error('wrong extension'));
			}
			callback(null, `diary/${datetime}_${file.originalname}`);
		},
		acl: 'public-read-write',
	}),
});
var router = express.Router();

router.post('/uploaddiaryimage', imageUploader.single('image'), (req, res) => {
	const picture = req.file.location;
	const userId = req.body.email;
	const petId = req.body.petname;
	const date = req.body.date;
	const addDiray = new Diary({
		userId: userId,
		petId: petId,
		picture: picture,
		date: date.format('YYYY-MM-DD'),
		text: '텍스트를 입력해주세요!',
	});
	addDiray.save();
	return res.status(200).json({
		code: 200,
		type: true,
		message: 'register',
	});
});
router.post('/addDiaryText', function (req, res, next) {
	const userId = req.body.email;
	const petId = req.body.petname;
	const text = req.body.text;
	const date = req.body.date + 'T15:00:00.000+00:00';
	const findDiray = {
		userId: userId,
		petId: petId,
		date: date,
	};
	Diary.updateOne(findDiray, { $set: { text: text } }).exec(function (
		err,
		diary,
	) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (diary) {
			res.json({
				type: true,
				data: diary,
			});
		} else {
			res.json({
				type: false,
				data: 'please check input',
			});
		}
	});
});

router.post('/getDiaryTextBydate', function (req, res, next) {
	const userId = req.body.email;
	const petId = req.body.petname;
	const date = req.body.date;
	const findDiary = {
		userId: userId,
		petId: petId,
		date: date,
	};
	Diary.findOne(findDiary).exec(function (err, diary) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (diary) {
			res.json({
				type: true,
				data: diary,
			});
		} else {
			res.json({
				type: false,
				data: 'please check input',
			});
		}
	});
});

router.post('/getDiarybyPet', function (req, res, next) {
	const userId = req.body.email;
	const petId = req.body.petname;
	const findDiarybypet = {
		userId: userId,
		petId: petId,
	};
	Diary.find(findDiarybypet).exec(function (err, diary) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (diary) {
			res.json({
				type: true,
				data: diary,
			});
		} else {
			res.json({
				type: false,
				data: 'please check email',
			});
		}
	});
});
export default router;
