
import BaseScreen from './BaseScreen'

export default class PersonalCenterScreen extends BaseScreen {

    clickLoginButton() {
        var ele = this.driver.elementByNameIfExists('登录/注册');
        if (ele) {
            console.log('login button click')
            ele.click();
        }
    }

    logout() {
        return this.driver
            .elementByName('icon person center setting') // 退出登录
            .click()
            .elementByName('退出登录')
            .click()
            .acceptAlert()
            .sleep(1000);
    }
}