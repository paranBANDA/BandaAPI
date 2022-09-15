/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://banda:<password>@cluster0.aqaj3o5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
*/

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => console.log("HI YO"));