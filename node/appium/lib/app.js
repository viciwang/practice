'use strict';

var wd = require('wd');
var _ = require('underscore');
require("./utils/helpers/setup");

class App {
    constructor() {
        this.driver = wd.promiseChainRemote({
            host: 'localhost',
            port: 4723
        });
        require("./utils/helpers/logging").configure(this.driver);
    }

    connect() {
        var desired = _.clone(require('./caps').iosLatest);
        desired.app = require('./appPath').lefengTestApp;
        return this.driver.init(desired);
    }
}

module.exports = new App();