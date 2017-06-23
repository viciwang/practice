'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseScreen = require('./BaseScreen');

var _BaseScreen2 = _interopRequireDefault(_BaseScreen);

var _UIElementType = require('../utils/UIElementType');

var _UIElementType2 = _interopRequireDefault(_UIElementType);

var _promiseUtils = require('../utils/helpers/promise-utils');

var _promiseUtils2 = _interopRequireDefault(_promiseUtils);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chaiAsPromised = require("chai-as-promised");
_chai2.default.use(chaiAsPromised);
_chai2.default.should();

var wd;
try {
    wd = require('wd');
} catch (err) {
    wd = require('../../lib/main');
}

var Asserter = wd.Asserter; // asserter base class

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

class LoginScreen extends _BaseScreen2.default {

    tagChaiAssertionError() {
        // throw error and tag as retriable to poll again
        err.retriable = err instanceof _chai2.default.AssertionError;
        throw err;
    }

    login() {
        return this.driver.elementsByClassName(_UIElementType2.default.TextField).then(_promiseUtils2.default.each(el => {
            return el.getAttribute('value').then(value => {
                if (value == '密码') {
                    return el.clear().type('abc123456').sleep(1000);
                } else {
                    return el.clear().type('15625043034').sleep(1000);
                }
            });
        })).elementByName('密码').clear().type('abc123456').sleep(1000).elementByName('登录').click().then(() => {
            return this.driver;
        }).waitFor({
            timeout: 15000,
            asserter: new Asserter(target => {
                return target.hasElementByName('login close').should.not.be.ok.then(() => {
                    return this.driver;
                }).catch(tagChaiAssertionError);
            }) });
    }
}
exports.default = LoginScreen;