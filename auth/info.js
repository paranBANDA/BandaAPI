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

router.get('/pet', function (req, res) {
	console.log("ID : " + req.query.id + " 입니다")
	if(req.query.id == 0) {
		res.send({
			date : ["2022-11-01", 
			"2022-11-02",
			"2022-11-04",
			"2022-11-06", 
			"2022-11-07", 
			"2022-11-10", 
			"2022-11-16"],
			feel : ["Happy", "Happy", "Normal", "Happy", "Normal", "Normal", "Bad"]});
  }

  else {
	res.send({
		date : ["2022-11-02", 
		"2022-11-03",
		"2022-11-05",
		"2022-11-07", 
		"2022-11-08", 
		"2022-11-09", 
		"2022-11-12"],
		feel : ["Bad", "Happy", "Normal", "Happy", "Bad", "Normal", "Normal"]});
	}
});
  

export default router;
