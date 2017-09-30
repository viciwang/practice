var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query("SHOW DATABASES;", [], function(err, results) {
      if (err) return next(err);
      res.send(results);
    });
  });
});

router.get("/create", (req, res, next) => {
  models.Administrator
    .create({
      adminId: new Date().toTimeString(),
      nickName: "123",
      password: "abc"
    })
    .then(() => {
      res.send("OK");
    });
});

router.get("/list", (req, res, next) => {
  models.Administrator.findAll().then(administators => {
    res.send(administators);
  });
});

module.exports = router;
