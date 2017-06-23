var app = require('../app');
var driver = app.driver;
var _p = require('../utils/helpers/promise-utils')
import StartScreen from '../screens/StartScreen';
import PersonalCenterScreen from '../screens/PersonalCenterScreen';
import XCUIElementType from '../utils/UIElementType';
import LoginScreen from '../screens/LoginScreen';

describe("login", function () {
    this.timeout(300000);
    var startScreen = new StartScreen(driver);
    var personalCenterScreen = new PersonalCenterScreen(driver);
    var loginScreen = new LoginScreen(driver);

    // global setUp, tearDown
    before(function () {
        return app.connect()
            .then(() => {
                return startScreen.closeStartButton();
            })
            .elementByName('我的蜂巢')
            .click()
            .sleep(1000);
    });

    after(function () {
        return driver.quit();
    });

    it('should do some thing', () => {
        return driver
            .hasElementByName('登录/注册')
            .then((has) => {
                if (!has) {
                    return personalCenterScreen.logout();
                }
                return driver;
            })
            .elementByName('登录/注册')
            .click()
            .sleep(1000)
            .then(() => {
                return loginScreen.login();
            })
    });

});