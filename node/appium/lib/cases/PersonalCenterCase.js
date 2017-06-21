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
            yield* startScreen.closeStartButton();
            // yield driver.sleep(1000);
            var ele = yield driver.elementByName('我的蜂巢');
            yield ele.click();
            done();
        });
    });

    after(function (done) {
        driver.run(function* () {
            yield driver.quit();
            done();
        });
    });

    it('should have 11 cells; 我的蜂巢要有11个cell', function (done) {
        driver.run(function* () {
            var elements = yield driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell');
            elements.should.have.lengthOf(11);
            var titles = ['我的优惠券', '我的花粉', '我的银行卡', '我的收藏', '浏览记录', '推荐有奖', '意见反馈', '联系客服', '关于乐蜂'];
            for (var index = 2; index < 11; index++) {
                // var e = yield elements[index].elementsByClassName('>', 'XCUIElementTypeStaticText').first();
                // yield console.log(e.getAttribute('value'));
                // yield e.getAttribute('value').should.equal(titles[index - 2]);
            }
            done();
        });
    });

    it('should do another thing', function (done) {
        driver.run(function* () {
            done();
        });
    });
});