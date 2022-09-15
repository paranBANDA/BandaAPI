/*

*/

const express = require("express");
const app = express();
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
var connect = require('./model');
connect();


router.use('/grades', require('./grades'));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => console.log("HI YO"));