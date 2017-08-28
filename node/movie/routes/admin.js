var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        connection.query('show tables;', function(err, results) {
            if (err) {
                return next(err);
            }
            var result = results[0];
            console.log(result);
            res.render('admin', { title: result });
        });
    });

});

module.exports = router;