"use strict";

require("./helpers/setup");

var wd = require("wd"),
    _ = require('underscore'),
    Q = require('q'),
    _p = require('./helpers/promise-utils'),
    serverConfigs = require('./helpers/appium-servers');

describe("ios simple", function () {
  this.timeout(300000);
  var driver;
  var allPassed = true;

  before(function () {
    var serverConfig = process.env.npm_package_config_sauce ?
      serverConfigs.sauce : serverConfigs.local;
    driver = wd.promiseChainRemote(serverConfig);
    require("./helpers/logging").configure(driver);

    var desired = _.clone(require("./helpers/caps").iosLatest);
    desired.app = require("./helpers/apps").iosTestApp;
    if (process.env.npm_package_config_sauce) {
      desired.name = 'ios - simple';
      desired.tags = ['sample'];
    }
    return driver.init(desired);
  });

  after(function () {
    return driver
      .quit()
      .finally(function () {
        if (process.env.npm_package_config_sauce) {
          return driver.sauceJobStatus(allPassed);
        }
      });
  });

  afterEach(function () {
    allPassed = allPassed && this.currentTest.state === 'passed';
  });

  function populate() {
    var seq = _(['IntegerA', 'IntegerB']).map(function (id) {
      return function (sum) {
        return driver.waitForElementById(id, 3000).then(function (el) {
          var x = _.random(0,10);
          sum += x;
          return el.type('' + x).then(function () { return sum; })
            .elementById('Done').click().sleep(1000); // dismissing keyboard
        }).then(function () { return sum; });
      };
    });
    return seq.reduce(Q.when, new Q(0));
  }

  it("should compute the sum", function () {
    // return driver
    //   .resolve(populate()).then(function (sum) {
    //     return driver.
    //       elementByAccessibilityId('ComputeSumButton')
    //         .click().sleep(1000)
    //       .elementByAccessibilityId('Answer')
    //         .text().should.become("" + sum);
    //   });
    // return driver.sleep(10000).elementByAccessiblilityId('我的蜂巢').click();
    return driver
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
    // return driver
    //   .hasElementByName('开启 乐蜂美妆')
    //   .then((has) => {
    //     if(has) {
    //       driver.hasElementByName('')
    //     }
    //   }
  });

});
