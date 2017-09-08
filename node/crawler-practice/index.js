var Crawler = require("crawler");

var c = new Crawler({
  maxConnections: 10,
  //   rateLimite: 1000,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      console.log($("title").text());
    }
    done();
  }
});

c.queue("http://www.baidu.com");
