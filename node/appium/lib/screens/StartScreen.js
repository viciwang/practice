'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseScreen = require('./BaseScreen');

var _BaseScreen2 = _interopRequireDefault(_BaseScreen);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class StartScreen extends _BaseScreen2.default {

    closeStartButton() {
        var ele = this.driver.elementByNameIfExists('开启 乐蜂美妆');
        if (ele) {
            console.log('start button click');
            ele.click();
        }
        return this.driver;
    }
}
exports.default = StartScreen;