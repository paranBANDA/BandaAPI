/*

*/

const express = require('express');
const app = express();
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
var connect = require('./model');
const Grade = require('./model/grades');
const user = require('./model/user');
const diary = require('./model/diary');
const family = require('./model/family');
const pet = require('./model/pet');
const walking = require('./model/walking');
connect();

app.get('/', (req, res, next) => {
	user.findOne({name : "유"}, function(err,obj){
		console.log(obj);
		res.send(obj);
	})
});
app.get('/Grade', (req, res, next) => {
	Grade.findOne({student_id : 0}, function(err,obj){
		console.log(obj);
		res.send(obj);
	})
});
app.listen(3000, () => console.log('HI YO'));
