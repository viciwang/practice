var express = require("express");
var router = express.Router();
var Administator = require("../models/administator");

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
  Administator.create({
    id: new Date().toTimeString,
    nickName: "123",
    password: "abc"
  });
});

router.get("/list", (req, res, next) => {
  models.Administator.findAll().then(administators => {
    res.send(administators);
  });
});

module.exports = router;
