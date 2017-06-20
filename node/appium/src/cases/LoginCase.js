var app = require('../app');
var driver = app.driver;

describe("login", function () {
    this.timeout(300000);

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
            yield driver
                .sleep(1000)
                .elementByName('我的蜂巢')
                .click()
                .sleep(1000)
                // .elementByClassName('XCUIElementTypeTable')
                // .elementsByClassName('>','XCUIElementTypeCell')
                // .then();
                .elementByName('推荐有奖')
                .click()
                .sleep(3000)
                .elementByClassName('XCUIElementTypeButton')
                .click();
            done();
        });
    });

});