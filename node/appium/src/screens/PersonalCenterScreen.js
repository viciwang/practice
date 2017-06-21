
import BaseScreen from './BaseScreen'

export default class PersonalCenterScreen extends BaseScreen {
    constructor(driver) {
        super(driver);
    }

    *clickLoginButton() {
        var ele = this.driver.elementByNameIfExists('登录/注册');
        if (ele) {
            console.log('login button click')
            ele.click();
        }
    }
}