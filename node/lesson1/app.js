var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var async = require('async');
var url = require('url');

var app = express();
var ep = new eventproxy();

var cnodeUrl = 'https://cnodejs.org/';

app.get('/', function(req, res, next) {
    superagent.get(cnodeUrl).end(function(err, sres){
        if (err) {
            return next(err);
        }

        var $ = cheerio.load(sres.text);
        var topicUrls = [];
        $('#topic_list .topic_title').each(function(idx, element) {
            var $element = $(element);
            var topicUrl = url.resolve(cnodeUrl, $element.attr('href'));
            topicUrls.push(topicUrl);
        });

        ep.after('topic_html', topicUrls.length, function(topics){

            topics = topics.map(function(topicPair) {
                var $ = cheerio.load(topicPair[1]);
                return {
                    url: topicPair[0],
                    title: $('.topic_full_title').text().trim()
                }
            });

            res.send(topics);
        });

        // topicUrls.forEach(function(topicUrl) {
        //     superagent.get(topicUrl).end(function(err, res){
        //         console.log('success: ', topicUrl);
        //         ep.emit('topic_html', [topicUrl, res.text]);
        //     });
        // });

        var currentAsync = 0;
        async.mapLimit(topicUrls, 5, function(url, callback){
            currentAsync++;
            var delay = parseInt((Math.random()*10000000 % 2000), 10);
            console.log('current async: ', currentAsync, 'currentUrl: ', url);
            setTimeout(function(){
                currentAsync--;
                callback(null, null);
            }, delay);

            superagent.get(url).end(function(err, res) {
                ep.emit('topic_html', [url, res.text]);
            })
        }, function() {
            
        });
    });
});

app.listen(3000);