var express = require('express');
var router = express.Router();

router.get('/:movieName', (req, res, next) => {
    // res.send(req.params.movieName);
    // res.render('index', {title: 'title'});
    req.getConnection( (err, conn) => {
        if(err) {
            next(err);
        }
        else {
            conn.query('')
        }
    });
    res.send(req.params['movieName']);
});

module.exports = router;
