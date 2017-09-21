var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  req.getConnection(function(err, connection) {
    if (err) return next(err);
    connection.query("SHOW DATABASES;", [], function(err, results) {
      if (err) return next(err);
      res.send(results);
    });
  });
});

module.exports = router;
