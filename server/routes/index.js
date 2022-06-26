var express = require("express");
var router = express.Router();




/* GET home page. */
router.get("/", function(req, res, next) {
  res.send({msg: "Hello"}).status(200);
});

router.get("/test", function(req, res, next) {
    res.send({msg: "test"}).status(200);
  });

module.exports = router;