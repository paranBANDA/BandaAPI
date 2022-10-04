import express from 'express';
import User from '../model/user.js';
import jwt from 'jsonwebtoken'

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

router.post('/login', function (req, res, next) { //로그인 API
	var localEmail = req.body.email;
	var localPassword = req.body.password;
	console.log(req.body,localEmail,localPassword)
	var findConditionLocalUser = {
		email: localEmail,
		pw: localPassword
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
					 data: "Incorrect email/password"
				 });
			 } else if(user) {
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