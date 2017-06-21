'use strict';

var yiewd = require('yiewd');
var _ = require('underscore');
require("./utils/helpers/setup");

class App {
    constructor() {
        this.driver = yiewd.remote('localhost', 4723);
        require("./utils/helpers/logging").configure(this.driver);
    }

    *connect() {
        var desired = _.clone(require('./caps').iosLatest);
        desired.app = require('./appPath').lefengTestApp;
        yield this.driver.init(desired);
    }
}

module.exports = new App();