import express from 'express';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Pet from '../model/pet.js';
var jwtSecret = 'secret';
const key = 'Secret_Key';

var router = express.Router();
router.use(function (req, res, next) {
	next();
});

router.get('/', function (req, res) {
	res.send('hi1');
});

router.get('/about', function (req, res) {
	res.send('hi2');
});

// 임시 회원가입.
router.post('/register', async (req, res) => {
	//회원가입 API
	const email = req.body.email;
	const password = req.body.pw;
	const nickname = req.body.nickname;
	const hashed = await bcrypt.hash(password, 10);
	const user = new User({
		pw: hashed,
		email: email,
		nickname: nickname,
	});
	user.save();
	return res.status(200).json({
		code: 200,
		type: true,
		message: 'register',
	});
});
router.post('/emailcheck', async (req, res) => {
	//회원가입 API
	const email = req.body.email;
	var findConditionLocalUser = {
		email: email,
	};
	User.findOne(findConditionLocalUser).exec(function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (user) {
			res.json({
				type: false,
				data: 'Email already exists',
			});
		} else {
			res.json({
				type: true,
				data: 'email available',
			});
		}
	});
});

router.post('/groupcheck', async (req, res) => {
	const email = req.body.email;
	var findConditionLocalUser = {
		email: email,
	};
	User.findOne(findConditionLocalUser).exec(function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (user) {
			console.log(user);
			res.json({
				type: true,
				data: user.familyId,
			});
		} else {
			res.json({
				type: false,
				data: 'email available',
			});
		}
	});
});
router.post('/grouppetregister', function (req, res, next) {});
router.post('/petregister', function (req, res, next) {
	const dogName = req.body.dogName;
	const dogBreed = req.body.dogBreed;
	const dogGender = req.body.dogGender;
	const dogBirthday = req.body.dogBirthday;
	const dogMeetdate = req.body.dogMeetdate;
	const email = req.body.email;
	const pet = new Pet({
		birthday: dogBirthday,
		userId: email,
		gender: dogGender,
		meetday: dogMeetdate,
		petname: dogName,
		breed: dogBreed,
	});
	pet.save();
	return res.status(200).json({
		type: true,
		data: 'register complete',
	});
});
router.post('/login', function (req, res, next) {
	//로그인 API
	var localEmail = req.body.email;
	var findConditionLocalUser = {
		email: localEmail,
	};
	User.findOne(findConditionLocalUser).exec(async function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (user) {
			var localPassword = req.body.pw;
			var isCorrectPw = await bcrypt.compare(localPassword, user.pw);
			if (isCorrectPw) {
				console.log('correct');
				const email = user.email;
				const nickname = user.nickname;
				let token = '';
				// jwt.sign(payload, secretOrPrivateKey, [options, callback])
				token = jwt.sign(
					{
						type: 'JWT',
						email: email,
						nickname: nickname,
					},
					key,
					{
						expiresIn: '15m', // 15분후 만료
						issuer: '토큰발급자',
					},
				);
				return res.status(200).json({
					code: 200,
					type: true,
					message: 'token is created',
					token: token,
				});
			}
			res.json({
				type: false,
				data: 'Incorrect email/password',
			});
		} else if (!user) {
			res.json({
				type: false,
				data: 'Incorrect email/password',
			});
		}
	});
});

// 카카오 로그인
router.post('/kakaoLogin', (req, res) => {
	var kakaoId = req.body.kakaoidentifier;
	console.log(kakaoId);
	var findConditionLocalUser = {
		kakaoidentifier: kakaoId,
	};
	User.findOne(findConditionLocalUser).exec(function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (!user) {
			res.json({
				type: false,
				data: 'need register',
			});
		} else if (user) {
			const kakaoidentifier = user.kakaoidentifier;
			let token = '';
			// jwt.sign(payload, secretOrPrivateKey, [options, callback])
			token = jwt.sign(
				{
					type: 'JWT',
					kakaoidentifier: kakaoidentifier,
				},
				key,
				{
					expiresIn: '15m', // 15분후 만료
					issuer: '토큰발급자',
				},
			);
			return res.status(200).json({
				code: 200,
				message: 'token is created',
				token: token,
			});
		}
	});
});

// app.get("/payload", auth, (req, res) => {	//token 검증 API
// 	const nickname = req.decoded.nickname;
// 	const email = req.decoded.email;
// 	return res.status(200).json({
// 	  code: 200,
// 	  message: "토큰이 정상입니다.",
// 	  data: {
// 		email : email,
// 		nickname: nickname
// 	  },
// 	});
//   });

// app.post('/register',async (req,res)=>{	//회원가입 API
// 	const id = req.body.email
// 	const password = req.body.pw
// 	var findConditionLocalUser = {
// 		email: id,
// 	}
// 	User.findOne(findConditionLocalUser)
// 	.exec(function(err,user){
// 		if (err){
// 			res.json({
// 				type: false,
// 				data: "Error occured " + err
// 			});
// 		} else if (user) {
// 			res.json({
// 				type: false,
// 				data: "Email already exists"
// 			});
// 		} else if(!user) {
// 			localSignup(req.body, function (err, savedUser) {
// 			   if (err){
// 					res.json({
// 						type: false,
// 						data: "Error occured " + err
// 					});
// 				} else {
// 					res.json({
// 						type: true,
// 						data : savedUser
// 					});
// 				}
// 			});
// 		}
// 	})
// })

// function localSignup(req, next){	//회원가입 함수
// 		const user = new User(req);
// 		user.save(function (err, newUser) {
// 			newUser.jsonWebToken = jwt.sign(newUser.toJSON(), jwtSecret);
// 			newUser.save(function (err, savedUser) {
// 				next(err, savedUser);
// 			});
// 		});
// }
export default router;
