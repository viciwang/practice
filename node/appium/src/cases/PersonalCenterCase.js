var app = require('../app');
var driver = app.driver;
var _p = require('../utils/helpers/promise-utils')
import StartScreen from '../screens/StartScreen';
import PersonalCenterScreen from '../screens/PersonalCenterScreen';

require("../utils/helpers/setup");

describe("login", function () {
    this.timeout(300000);
    var startScreen = new StartScreen(driver);
    var personalCenterScreen = new PersonalCenterScreen(driver);

    // global setUp, tearDown
    before(function () {
        return app.connect()
            .then(() => {
                return startScreen.closeStartButton();
            })
            .elementByName('我的蜂巢')
            .click();
    });

    after(function () {
        return driver.quit();
    });

    it('should have 11 cells; 我的蜂巢要有11个cell', function () {
        return driver
            .elementByClassName('XCUIElementTypeTable')
            .elementsByClassName('>', 'XCUIElementTypeCell')
            .then((els) => {
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
        return driver
            .elementByClassName('XCUIElementTypeTable')
            .elementsByClassName('>', 'XCUIElementTypeCell')
            .then(() => {
                var cell = driver.at('<', 0);
                return Q.all([
                    cell.elementsByClassName('>', 'XCUIElementTypeStaticText')
                        .first().getAttribute('value')
                        .then((title) => {
                            console.log(title);
                        })]);
            });
    })
    // .elementsByClassName('>', 'XCUIElementTypeStaticText')
    // // various checks
    // .first().getAttribute('value')
    // .then((title) => {
    //     console.log(title);
    // });
});