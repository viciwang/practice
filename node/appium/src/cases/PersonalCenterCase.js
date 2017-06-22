var app = require('../app');
var driver = app.driver;
var _p = require('../utils/helpers/promise-utils')
import StartScreen from '../screens/StartScreen';
import PersonalCenterScreen from '../screens/PersonalCenterScreen';
import XCUIElementType from '../utils/UIElementType';
import "../utils/helpers/setup";


describe("login", function () {
    this.timeout(300000);
    var startScreen = new StartScreen(driver);
    var personalCenterScreen = new PersonalCenterScreen(driver);
    var titles = ["", "", "我的优惠券", "我的花粉", "我的银行卡", "我的收藏", "浏览记录", "推荐有奖", "意见反馈", "联系客服", "关于乐蜂"];
    // 0 表示要不检查，1表示需要登录，2表示不需要登录
    var checkFlag = [0, 0, 1, 1, 1, 1, 2, 2, 1, 1, 2];

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
        // return driver.quit();
    });

    it('should have 11 cells; 我的蜂巢要有11个cell', function () {
        return driver
            .elementByClassName(XCUIElementType.Table)
            .elementsByClassName('>', XCUIElementType.Cell)
            .then((els) => {
                els.should.have.lengthOf(11);
                return els;
            });
    });

    // it('should print cell name in order', function () {
    //     return driver
    //         .elementByClassName(XCUIElementType.Table)
    //         .elementsByClassName('>', XCUIElementType.Cell)
    //         .then(_p.each((el, i) => {
    //             if (titles[i] == "") {
    //                 return driver;
    //             }
    //             // 这里不需要加 '>'，因为调用方是element，其上下文已经可以确定是当前元素了
    //             return el.elementsByClassName(XCUIElementType.StaticText)
    //                 // various checks
    //                 .first().getAttribute('value')
    //                 .should.become(titles[i]);
    //         }));
    // })

    it('should show login view', () => {
        // return driver
        //                         .elementByClassName(XCUIElementType.Table)
        //                         .then(() => {
                                    
        //                         });
        return driver
            .elementByClassName(XCUIElementType.Table)
            .elementsByClassName('>', XCUIElementType.Cell)
            .then(_p.each((el, i) => {
                if (checkFlag[i] == 0) {
                    return driver;
                }
                console.log('current cell: ' + titles[i] + "   " + i);
                var buttonName = (checkFlag[i] == 1 ? 'login close' : 'back');
                if (i == 10) {
                    buttonName = "order button back";
                }
                return el
                    .isDisplayed()
                    .then((displayed) => {
                        if (displayed == false) {
                            return driver
                                .elementByClassName(XCUIElementType.Table)
                                .then(() => {
                                    return driver.swipe({
                                        startX: 100, startY: 400,
                                        offsetX: 0, offsetY: -600, duration: 400
                                    })
                                })
                                .then(() => {
                                    return el;
                                });
                        }
                        else {
                            return el;
                        }
                    })
                    .click()
                    .sleep(1000)
                    .elementByName(buttonName)
                    .should.eventually.exist
                    .click()
                    .sleep(1000);
            }));
    })
});