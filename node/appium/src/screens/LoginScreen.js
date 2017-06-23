
import BaseScreen from './BaseScreen';
import UIElementType from '../utils/UIElementType'
import _p from '../utils/helpers/promise-utils'
import chai from "chai";

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var wd;
try {
    wd = require('wd');
} catch (err) {
    wd = require('../../lib/main');
}

var Asserter = wd.Asserter; // asserter base class

// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

export default class LoginScreen extends BaseScreen {

    tagChaiAssertionError() {
        // throw error and tag as retriable to poll again
        err.retriable = err instanceof chai.AssertionError;
        throw err;
    }

    login() {
        return this.driver
            .elementsByClassName(UIElementType.TextField)
            .then(_p.each((el) => {
                return el.getAttribute('value').then((value) => {
                    if (value == '密码') {
                        return el.clear().type('abc123456').sleep(1000);
                    }
                    else {
                        return el.clear().type('15625043034').sleep(1000);
                    }
                });
            }))
            .elementByName('密码')
            .clear()
            .type('abc123456')
            .sleep(1000)
            .elementByName('登录')
            .click()
            .then(() => { return this.driver })
            .waitFor({
                timeout: 15000,
                asserter: ()=> {
                    return 
                }
                // new Asserter((target) => {
                //     return target.hasElementByName('login close')
                //         .should.not.be.ok
                //         .then(() => { return this.driver; })
                //         .catch(tagChaiAssertionError);
                })});
    }
}