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
test('Clicking peek should show the current top value', async () => {
    let push = await driver.findElement(By.id('push'));
    await push.click();

    let alert = await driver.switchTo().alert();
    await alert.sendKeys("EgetTest");
    await alert.accept();

    let peek = await driver.findElement(By.id('peek'));
    await peek.click();

    let stackText = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stackText).toEqual("EgetTest");
});
test('After popping a value, the page should show the previous top value', async () => {
    let push = await driver.findElement(By.id('push'));

    await push.click();
    let alert1 = await driver.switchTo().alert();
    await alert1.sendKeys("Första");
    await alert1.accept();

    await push.click();
    let alert2 = await driver.switchTo().alert();
    await alert2.sendKeys("Andra");
    await alert2.accept();

    let pop = await driver.findElement(By.id('pop'));
    await pop.click();

    let popAlert = await driver.switchTo().alert();
    await popAlert.accept();

    let stackText = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stackText).toEqual("Första");
});