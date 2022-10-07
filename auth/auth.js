import express from 'express';
import User from '../model/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

var jwtSecret = "secret"
const key = "Secret_Key"

var router = express.Router();
router.use(function(req, res, next) {
  next();
});

router.get('/', function(req, res) {
  res.send('hi1');
});

router.get('/about', function(req, res) {
  res.send('hi2');
});

// 임시 회원가입.
router.post('/register',async (req,res)=>{	//회원가입 API 
	const id = req.body.email
	const password = req.body.pw

	const hashed = await bcrypt.hash(password,10);
	const user = new User({
		pw: hashed,
		email: id
	});
	user.save();
	return res.status(200).json({
		code: 200,
		message: "register",
	  });
});
router.post('/emailcheck',async (req,res)=>{	//회원가입 API 
	const id = req.body.email
	var findConditionLocalUser = {
		email: id,
	}
	User.findOne(findConditionLocalUser)
	.exec(function(err,user){
		if (err){
			res.json({
				type: false,
				data: "Error occured " + err
			});
		} else if (user) {
			res.json({
				type: false,
				data: "Email already exists"
			});
		}
		else{
			res.json({
				type: true,
				data: "email available"
			})
		}
	})
});

router.post('/login', function (req, res, next) { //로그인 API
	var localEmail = req.body.email;
	var findConditionLocalUser = {
		email: localEmail
	}
	User.findOne(findConditionLocalUser)
		 .exec(async function (err, user) {
			 if (err){
				 res.json({
					 type: false,
					 data: "Error occured " + err
				 });
			 } else if(user) {
				var localPassword = req.body.password;
				console.log(localPassword, user.pw);
				var isCorrectPw = await bcrypt.compare(localPassword ,user.pw);
				if(isCorrectPw) {

					const email = user.email;
					const nickname = user.nickname;
					let token = "";
					// jwt.sign(payload, secretOrPrivateKey, [options, callback])
					token = jwt.sign(
					  {
						type: "JWT",
						email : email,
						nickname: nickname
					  },
					  key,
					  {
						expiresIn: "15m", // 15분후 만료
						issuer: "토큰발급자",
					  }
					);
					return res.status(200).json({
					  code: 200,
					  message: "token is created",
					  token: token,
					});
				}
				res.json({
					type: false,
					data: "Incorrect email/password"
				});
			 } else if (!user) {
				res.json({
					type: false,
					data: "Incorrect email/password"
				});
			} 
		 });
 });

// 카카오 로그인
router.post('/kakaoLogin', (req,res)=>{	
	var kakaoId = req.body.kakaoidentifier;
	console.log(kakaoId)
	var findConditionLocalUser = {
		kakaoidentifier: kakaoId
	}
	User.findOne(findConditionLocalUser)
		 .exec(function (err, user) {
			 if (err){
				 res.json({
					 type: false,
					 data: "Error occured " + err
				 });
			 } else if (!user) {
				 res.json({
					 type: false,
					 data: "need register"
				 });
			 } else if(user) {
				const kakaoidentifier = user.kakaoidentifier;
				let token = "";
				// jwt.sign(payload, secretOrPrivateKey, [options, callback])
				token = jwt.sign(
				  {
					type: "JWT",
					kakaoidentifier : kakaoidentifier,
				  },
				  key,
				  {
					expiresIn: "15m", // 15분후 만료
					issuer: "토큰발급자",
				  }
				);
				return res.status(200).json({
				  code: 200,
				  message: "token is created",
				  token: token,
				});
			 }
		 });
});


export default router;