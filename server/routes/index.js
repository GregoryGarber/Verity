const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require("mongodb");

const MONGO_DB = require("../config/db").getMongoDB();
const MONGO_COLLECTION_CONTACT = require("../config/db").getMongoCollection('Contacts');

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

// TODO:
// - create a login/authentification process 
// - implement a post to create a contact
// - implement a get to get a certain contact
// - implement a post
// - implement a delete

router.post('/createContact', async (req, res) => {
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await db.collection(MONGO_COLLECTION_CONTACT);
  const result = await collection.insertOne(req.body);
  res.send('working hopefully')
})

router.get('/getAllContacts', async (req, res) => {
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await db.collection(MONGO_COLLECTION_CONTACT);
  const result = await collection.find({}).toArray()
  res.json(result)
})

router.put('/updateContact', async (req, res) => {
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await db.collection(MONGO_COLLECTION_CONTACT);
  const result = await collection.replaceOne(
    {_id: ObjectId(req.body._id)},
    req.body.data
  )
  res.json(result)
})

router.delete('/deleteContact', async (req, res) => {
  await client.connect();
  const db = await client.db(MONGO_DB);
  const collection = await db.collection(MONGO_COLLECTION_CONTACT);
  console.log(req.query)
  const result = await collection.deleteOne(
    {'_id': ObjectId(req.query.ID)}
  )
  res.json(result)
})


module.exports = router;

