class BasePage {
  constructor(page) {
    this.page = page;
  }

  async navigateTo(path = '/') {
    await this.page.goto(path);  // resolved via baseURL in config
  }
}

module.exports = BasePage;
