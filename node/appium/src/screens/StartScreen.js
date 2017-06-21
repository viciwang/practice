import BaseScreen from "./BaseScreen"

export default class StartScreen extends BaseScreen {
    
    * closeStartButton() {
        var ele = yield this.driver.elementByNameIfExists('开启 乐蜂美妆');
        if (ele) {
            console.log('start button click')
            yield ele.click();
        }
        // ele = yield this.driver.elementByClassNameIfExists()
        
        // var 
    }
}