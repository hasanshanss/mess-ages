const puppeteer = require("puppeteer");
const fs = require("fs");

class Parser {
  #url = null;
  #data_buffer = [];
  #browser = null;

  constructor(url) {
    this.#url = url;
  }

  get Url() {
    return "https://" + this.#url;
  }

  async launchBrowser(){
    this.#browser = await puppeteer.launch({headless: false});
  }

  writeToFile(json_array) {
    fs.open("test.json", "a", 666, function (e, id) {
      json_array.forEach((json) => {
        fs.write(id, JSON.stringify(json) + "\n", null, "utf8", function () {
          fs.close(id, function () {
            // console.log('file is updated');
          });
        });
      });
    });
  }

  async login(username, password) {
    
    // const browser = await puppeteer.launch({headless: false});
    // this._browser = await puppeteer.launch({headless: false});

    const page = await this.#browser.newPage();
      await page.goto(this.Url, {
        waitUntil: 'load',
        timeout: 0
     });
     
      await page.waitForSelector('input[name="username"]');
     
      const usernameInput = await page.$('input[name ="username"]');
      const passwordInput = await page.$("input[name ='password']");

      await usernameInput.type(username);
      await passwordInput.type(password);

      // await page.screenshot({ path: "1.png" });

      await page.click('button[type ="submit"]');

      
      try {
        // slfErrorAlert
        
        await page.waitForSelector('input[name="verificationCode"]',  { timeout: 5000 });
        return true;
      } catch(e){
        return false;
      }
      
    // await browser.close();
  }

  async twoStep(ocp){
      const verificationInput = await page.$("input[name ='verificationCode']");
      await verificationInput.type(ocp);
      await page.click('form button');
      
  }
}

module.exports = Parser;
