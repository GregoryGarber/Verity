const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Test = require('../models/test');




/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({msg: "Hello"}).status(200);
});

router.get("/test", function(req, res, next) {
    res.send({msg: "test69"}).status(200);
  });

router.post('/test2', function(req, res) {
  Test.create(res.body)
    .then(tst => res.send('working hopefully'))
})

module.exports = router;

