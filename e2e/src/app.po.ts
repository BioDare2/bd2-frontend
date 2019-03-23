import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getPageTitle() {
    return browser.getTitle();
  }

  getTitleText() {
    return element(by.css('bd2-root h1')).getText() as Promise<string>;
  }
}
