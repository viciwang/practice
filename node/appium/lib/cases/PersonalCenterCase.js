'use strict';

var _StartScreen = require('../screens/StartScreen');

var _StartScreen2 = _interopRequireDefault(_StartScreen);

var _PersonalCenterScreen = require('../screens/PersonalCenterScreen');

var _PersonalCenterScreen2 = _interopRequireDefault(_PersonalCenterScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../app');
var driver = app.driver;
var _p = require('../utils/helpers/promise-utils');


require("../utils/helpers/setup");

describe("login", function () {
    this.timeout(300000);
    var startScreen = new _StartScreen2.default(driver);
    var personalCenterScreen = new _PersonalCenterScreen2.default(driver);

    // global setUp, tearDown
    before(function () {
        return app.connect().then(() => {
            return startScreen.closeStartButton();
        }).elementByName('我的蜂巢').click();
    });

    after(function () {
        return driver.quit();
    });

    it('should have 11 cells; 我的蜂巢要有11个cell', function () {
        return driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell').then(els => {
            els.should.have.lengthOf(11);
            return els;
        });
        // .then(_p.each((el, i) => {
        //     return driver
        //         .elementByClassNameIfExists('XCUIElementTypeTable')
        //         .then(() => {
        //             return el;
        //         })
        //         .elementsByClassName('>', 'XCUIElementTypeStaticText')
        //         // various checks
        //         .first().getAttribute('value')
        //         .then((title) => {
        //             console.log(title);
        //             return driver;
        //         });
        // }));
    });

    it('should print cell name in order', function () {
        return driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell').then(() => {
            var cell = driver.at('<', 0);
            return Q.all([cell.elementsByClassName('>', 'XCUIElementTypeStaticText').first().getAttribute('value').then(title => {
                console.log(title);
            })]);
        });
    });
    // .elementsByClassName('>', 'XCUIElementTypeStaticText')
    // // various checks
    // .first().getAttribute('value')
    // .then((title) => {
    //     console.log(title);
    // });
});