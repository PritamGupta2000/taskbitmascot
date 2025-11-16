const fs = require('fs');
const path = require('path');

class TestUtils {
  static async captureScreenshot(page, testName) {
    const screenshotsDir = path.resolve(__dirname, '../report/screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    const screenshotPath = path.join(screenshotsDir, `${testName}.png`);
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);
  }


}

module.exports = TestUtils;