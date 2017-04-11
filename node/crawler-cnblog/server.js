var http = require('http');
var url = require('url');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
var eventproxy = require('eventproxy');

var ep = new eventproxy();
var urls = [];
var pageUrls = [];
var pageNum = 2;

for (var i = 1; i < pageNum; i++) {
    pageUrls.push('http://www.cnblog.com/#p' + i);
}

function start() {
    function onRequest(req, res) {
        pageUrls.forEach(function(pageUrl){
            superagent.get(pageUrl).end(function(err, pres) {
                var $ = cheerio.load(pres.text);
                var curPageUrls = $('.titlelnk');

                for (var index = 0; index < curPageUrls.length; index++) {
                    var articleUrl = curPageUrls.eq(i).attr('href');
                    urls.push(articleUrl);

                    ep.emit('BlogArticleHtml', articleUrl);
                }
            });
        });

        ep.after('BlogArticleHtml', pageUrls.length*20, function(articleUrls) {
            res.write('<br/>');
            res.write('articleUrl.length is ' + articleUrls.length + '<br/>');
            for (var index = 0; index < articleUrls.length; index++) {
                res.write('articleUrl is ' + articleUrls[i] + '<br/>');
            }
        });
    }    
    http.createServer(onRequest).listen(3000);
}

exports.start = start;