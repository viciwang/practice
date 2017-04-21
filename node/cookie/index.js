var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var superagent = require('superagent');

var app = express();
app.listen(3000);

app.set('trust proxy', 1);
app.use(session({
    name: 'session',
    keys: [],
    maxAge: 24 * 60 * 60 * 1000
}));

app.get('/', function(req, res, next) {
    // if(req,session.isVisit) {
    //     req.session.isVisit++;
    //     res.send('<p>第' + req.session.isVisit + '次来到此页面</p>');
    // }
    // else {
    //     req.session.isVisit = 1;
    //     res.send('欢迎第一次来这里');
    //     console.log(req.session);
    // }

    superagent.get('https://github.com').end(function(err, sres) {
        if (err) {
            return next(err);
        }
        res.send(sres.text);
    })
});

