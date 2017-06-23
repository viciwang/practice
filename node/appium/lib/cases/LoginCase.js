'use strict';

var _StartScreen = require('../screens/StartScreen');

var _StartScreen2 = _interopRequireDefault(_StartScreen);

var _PersonalCenterScreen = require('../screens/PersonalCenterScreen');

var _PersonalCenterScreen2 = _interopRequireDefault(_PersonalCenterScreen);

var _UIElementType = require('../utils/UIElementType');

var _UIElementType2 = _interopRequireDefault(_UIElementType);

var _LoginScreen = require('../screens/LoginScreen');

var _LoginScreen2 = _interopRequireDefault(_LoginScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../app');
var driver = app.driver;
var _p = require('../utils/helpers/promise-utils');


describe("login", function () {
    this.timeout(300000);
    var startScreen = new _StartScreen2.default(driver);
    var personalCenterScreen = new _PersonalCenterScreen2.default(driver);
    var loginScreen = new _LoginScreen2.default(driver);

    // global setUp, tearDown
    before(function () {
        return app.connect().then(() => {
            return startScreen.closeStartButton();
        }).elementByName('我的蜂巢').click().sleep(1000);
    });

    after(function () {
        return driver.quit();
    });

    it('should do some thing', () => {
        return driver.hasElementByName('登录/注册').then(has => {
            if (!has) {
                return personalCenterScreen.logout();
            }
            return driver;
        }).elementByName('登录/注册').click().sleep(1000).then(() => {
            return loginScreen.login();
        });
    });
});