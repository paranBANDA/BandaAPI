import express from 'express';
import jwt from 'jsonwebtoken'
import { MongoClient,ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
import {auth} from './authMiddleware.js'
import User from './model/user.js';
import {connect} from './model/index.js'
import authRouter from './auth/auth.js';

var app = express()

var router = express.Router();
connect();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
var jwtSecret = "secret"
const key = "Secret_Key"

app.use('/auth',authRouter);

app.get('/', (req, res, next) => {
	User.findOne({name : "test1"}, function(err,obj){
		console.log(obj);
		res.send(obj);
	})
});


 app.get("/payload", auth, (req, res) => {	//token 검증 API
	const nickname = req.decoded.nickname;
	const email = req.decoded.email;
	return res.status(200).json({
	  code: 200,
	  message: "토큰이 정상입니다.",
	  data: {
		email : email,
		nickname: nickname
	  },
	});
  });

app.post('/register',async (req,res)=>{	//회원가입 API
	const id = req.body.email
	const password = req.body.pw
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
		} else if(!user) {
			localSignup(req.body, function (err, savedUser) {
			   if (err){
					res.json({
						type: false,
						data: "Error occured " + err
					});
				} else {
					res.json({
						type: true,
						data : savedUser
					});
				} 
			});
		}
	})
})

function localSignup(req, next){	//회원가입 함수
		const user = new User(req);
		user.save(function (err, newUser) {
			newUser.jsonWebToken = jwt.sign(newUser.toJSON(), jwtSecret);
			newUser.save(function (err, savedUser) {
				next(err, savedUser);
			});
		});
}
	
app.listen(3000, () => console.log('HI YO'));
