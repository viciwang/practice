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
        }).elementByName('我的蜂巢').click().sleep(1000);
    });

    after(function () {
        return driver.quit();
    });

    it('should have 11 cells; 我的蜂巢要有11个cell', function () {
        return driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell').then(els => {
            els.should.have.lengthOf(11);
            return els;
        });
    });

    it('should print cell name in order', function () {
        var titles = ["", "", "我的优惠券", "我的花粉", "我的银行卡", "我的收藏", "浏览记录", "推荐有奖", "意见反馈", "联系客服", "关于乐蜂"];
        return driver.elementByClassName('XCUIElementTypeTable').elementsByClassName('>', 'XCUIElementTypeCell').then(_p.each(function (el, i) {
            if (titles[i] == "") {
                return driver;
            }
            // 这里不需要加 '>'，因为调用方是element，其上下文已经可以确定是当前元素了
            return el.elementsByClassName('XCUIElementTypeStaticText')
            // various checks
            .first().getAttribute('value').should.become(titles[i]);
        }));
    });
});