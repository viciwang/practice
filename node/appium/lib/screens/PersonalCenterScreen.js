'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseScreen = require('./BaseScreen');

var _BaseScreen2 = _interopRequireDefault(_BaseScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonalCenterScreen extends _BaseScreen2.default {
    constructor(driver) {
        super(driver);
    }

    *clickLoginButton() {
        var ele = this.driver.elementByNameIfExists('登录/注册');
        if (ele) {
            console.log('login button click');
            ele.click();
        }
    }
}
exports.default = PersonalCenterScreen;