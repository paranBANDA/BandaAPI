/*

*/

const express = require("express");
const app = express();
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
var connect = require('./model');
const Grade = require("./model/grades");
connect();


app.get('/', (req, res, next) => {
    Grade.findOne(
        {student_id: 0},
        function (err, obj) {
            console.log(obj);
            res.send(obj);
        }
    )
});
app.listen(3000, () => console.log("HI YO"));