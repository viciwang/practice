import BaseScreen from "./BaseScreen"

export default class StartScreen extends BaseScreen {

    closeStartButton() {
        var ele = this.driver.elementByNameIfExists('开启 乐蜂美妆');
        if (ele) {
            console.log('start button click')
            ele.click();
        }
        return this.driver;
    }
}