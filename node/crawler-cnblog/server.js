var http = require('http');
var url = require('url');
var superagent = require('superagent');
const cheerio = require('cheerio');
var async = require('async');
var eventproxy = require('eventproxy');

var ep = new eventproxy();
var urls = [];
var pageUrls = [];
var pageNum = 2;

for (var i = 1; i < pageNum; i++) {
    pageUrls.push('http://www.cnblogs.com/#p' + i);
}

function start() {
    function onRequest(req, res) {

        ep.after('BlogArticleHtml', pageUrls.length * 20, function (articleUrls) {
            var curCount = 0;
            var reptilMove = function(url, callback) {
                var delay = parseInt((Math.random() * 30000000) % 1000, 10);
                curCount++;
                console.log('concurrnet: ', curCount, '\t\turl: ', url, '\t\tdelay: ', delay, 'ms');

                superagent.get(url).end(function(err, data){
                    var $ = cheerio.load(data.text);
                    var currentBlogApp = url.split('/p/')[0].split('/')[3];
                    // var appUrl = 
                });

                setTimeout(function() {
                    curCount--;
                    callback(null, url + 'Call back content');
                }, delay);
            };

            async.mapLimit(articleUrls, 5, function(url, callback) {
                reptilMove(url, callback);
            }, function(err, result) {

            });
            
            res.write('<br/>');
            res.write('articleUrl.length is ' + articleUrls.length + '<br/>');
            for (var index = 0; index < articleUrls.length; index++) {
                res.write('articleUrl is ' + articleUrls[index] + '<br/>');
            }
        });

        pageUrls.forEach(function(pageUrl){
            superagent.get(pageUrl).end(function(err, pres) {
                var $ = cheerio.load(pres.text);
                var curPageUrls = $('.titlelnk');

                for (var index = 0; index < curPageUrls.length; index++) {
                    var articleUrl = curPageUrls.eq(index).attr('href');
                    urls.push(articleUrl);
                    res.write('<br/>');
                    res.write(articleUrl);
                    ep.emit('BlogArticleHtml', articleUrl);
                }
            });
        });
    }    

    http.createServer(onRequest).listen(3000);
}

exports.start = start;