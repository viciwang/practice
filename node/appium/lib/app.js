'use strict';

var wd = require('wd');
var _ = require('underscore');
require("./utils/helpers/setup");
var actions = require("./utils/helpers/actions");

class App {
    constructor() {
        wd.addPromiseChainMethod('swipe', actions.swipe);
        wd.addPromiseChainMethod('pinch', actions.pinch);
        wd.addElementPromiseChainMethod('pinch', function () {
            return this.browser.pinch(this);
        });
        wd.addPromiseChainMethod('zoom', actions.zoom);
        wd.addElementPromiseChainMethod('zoom', function () {
            return this.browser.zoom(this);
        });
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