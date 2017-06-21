'use strict';

var _StartScreen = require('../screens/StartScreen');

var _StartScreen2 = _interopRequireDefault(_StartScreen);

var _PersonalCenterScreen = require('../screens/PersonalCenterScreen');

var _PersonalCenterScreen2 = _interopRequireDefault(_PersonalCenterScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../app');
var driver = app.driver;


describe("login", function () {
    this.timeout(300000);
    var startScreen = new _StartScreen2.default(driver);
    var personalCenterScreen = new _PersonalCenterScreen2.default(driver);

    // global setUp, tearDown
    before(function (done) {
        driver.run(function* () {
            yield* app.connect();
            done();
        });
    });

    after(function (done) {
        driver.run(function* () {
            yield driver.quit();
            done();
        });
    });

    it('should do some thing', function (done) {
        driver.run(function* () {
            // test logic
            done();
        });
    });

    it('should do another thing', function (done) {
        driver.run(function* () {
            yield* startScreen.closeStartButton();
            // yield driver.sleep(1000);
            var ele = yield driver.elementByName('我的蜂巢');
            yield ele.click();
            var elements = yield driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell');
            elements.should.have.lengthOf(11);
            // yield *personalCenterScreen.clickLoginButton();
            // yield driver.sleep(5000);
            done();
        });
    });
});