'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseScreen = require('./BaseScreen');

var _BaseScreen2 = _interopRequireDefault(_BaseScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PersonalCenterScreen extends _BaseScreen2.default {

    clickLoginButton() {
        var ele = this.driver.elementByNameIfExists('登录/注册');
        if (ele) {
            console.log('login button click');
            ele.click();
        }
    }

    logout() {
        return this.driver.elementByName('icon person center setting') // 退出登录
        .click().elementByName('退出登录').click().acceptAlert().sleep(1000);
    }
}
exports.default = PersonalCenterScreen;