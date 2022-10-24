import express from 'express';
import jwt from 'jsonwebtoken'
import { MongoClient,ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv'
import {auth} from './authMiddleware.js'
import User from './model/user.js';
import {connect} from './model/index.js'
import authRouter from './auth/auth.js';
import mainRouter from './main/main.js'
var app = express()

var router = express.Router();
connect();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended : false}));
var jwtSecret = "secret"
const key = "Secret_Key"

app.use('/auth',authRouter);
app.use('/main',mainRouter)
app.get('/', (req, res, next) => {
	User.findOne({name : "test1"}, function(err,obj){
		console.log(obj);
		res.send(obj);
	})
});
	
app.listen(3000, () => console.log('HI YO'));
