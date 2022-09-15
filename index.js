/*

*/

const express = require("express");
const app = express();
var router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');
var connect = require('./model');
connect();
const uri = "mongodb+srv://banda:bandabanda@cluster0.aqaj3o5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    console.log("HELLO");
    const collection = client.db("sample_traning").collection("grades");
    // perform actions on the collection object
    console.log(collection);
    client.close();
});

router.use('/grades', require('./grades'));

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => console.log("HI YO"));