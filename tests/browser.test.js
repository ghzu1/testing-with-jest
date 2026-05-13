const { Builder, By } = require('selenium-webdriver');
require('geckodriver');

const fileUnderTest = 'file://' + __dirname.replaceAll(/ /g, '%20').replaceAll(/\\/g, '/') + '/../dist/index.html';

let driver;
jest.setTimeout(1000 * 60 * 5);

beforeAll(async () => {
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

afterAll(async () => {
    await driver.quit();
});

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

test('After pushing a value, it should be shown on the page', async () => {
    let push = await driver.findElement(By.id('push'));
    await push.click();

    let alert = await driver.switchTo().alert();
    await alert.sendKeys("Testvärde");
    await alert.accept();

    let stackText = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stackText).toEqual("Testvärde");
});