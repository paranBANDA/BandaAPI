import express from 'express';
import jwt from 'jsonwebtoken'
import { MongoClient,ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
import {auth} from './authMiddleware.js'
import User from './model/user.js';
import {connect} from './model/index.js'
const app = express();
var router = express.Router();
connect();
dotenv.config();
app.use(express.json());

app.get('/', (req, res, next) => {
	User.findOne({name : "유"}, function(err,obj){
		console.log(obj);
		res.send(obj);
	})
});
app.post("/login", (req, res, next) => {
	const key = "My-SECRET-KEY";
	// 받은 요청에서 db의 데이터를 가져온다 (로그인정보)
	const id = "mimo.you@banda.com";
	const pw = "1234";
	let token = "";
	// jwt.sign(payload, secretOrPrivateKey, [options, callback])
	token = jwt.sign(
	  {
		type: "JWT",
		id: id,
		pw: pw,
	  },
	  key,
	  {
		expiresIn: "15m", // 15분후 만료
		issuer: "토큰발급자",
	  }
	);
	// response
	return res.status(200).json({
	  code: 200,
	  message: "token is created",
	  token: token,
	});
});

app.get("/payload", auth, (req, res) => {
	const nickname = req.decoded.nickname;
	const profile = req.decoded.profile;
	return res.status(200).json({
	  code: 200,
	  message: "토큰이 정상입니다.",
	  data: {
		nickname: nickname,
		profile: profile,
	  },
	});
  });

app.post('/register',(req,res)=>{	//로그인 API
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err }); 
		return res.status(200).json({
		  success: true,
		  userInfo,
		});
	});
});
app.listen(3000, () => console.log('HI YO'));
