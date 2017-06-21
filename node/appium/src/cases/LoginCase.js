var app = require('../app');
var driver = app.driver;
import StartScreen from '../screens/StartScreen';
import PersonalCenterScreen from '../screens/PersonalCenterScreen';

describe("login", function () {
    this.timeout(300000);
    var startScreen = new StartScreen(driver);
    var personalCenterScreen = new PersonalCenterScreen(driver);

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
            yield *startScreen.closeStartButton();
            // yield driver.sleep(1000);
            var ele = yield driver.elementByName('我的蜂巢');
            yield ele.click();
            var elements = yield driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell');
            elements.should.have.lengthOf(11)
            // yield *personalCenterScreen.clickLoginButton();
            // yield driver.sleep(5000);
            done();
        });
    });

});