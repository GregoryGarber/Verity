const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");

const MONGO_DB = require("../config/db").getMongoDB();
const MONGO_COLLECTION = require("../config/db").getMongoCollection();
const uri = require("../config/db").getMongoConnectionString();
console.log(`Connecting to client with url: ${uri}`);

const client = new MongoClient(uri);


/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({msg: "Hello"}).status(200);
});

router.get("/test", function(req, res, next) {
    res.send({msg: "test69"}).status(200);
  });

router.post('/test2', async (req, res) => {
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await db.collection(MONGO_COLLECTION);
  const result = await collection.insertOne(req.body);
  res.send('working hopefully')
})

module.exports = router;

