const puppeteer = require('puppeteer-extra');
const SMSActivate = require('sms-activate');
const { createCursor } = require ("ghost-cursor");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const request = require('request');
const fs = require('fs').promises;
puppeteer.use(StealthPlugin());

const {installMouseHelper} = require('./mouse-view');

var emailVal = 'TesterEmail' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@nguyenluck.com';
var smsEmail = 'ENTER GETSMSCODE.COM EMAIL ADDRESS';
var token = 'ENTER GETSMSCODE API TOKEN';
var passwordVal = 'Alkaline@tester123';
var fNameVal = 'BAKAYAROU';
var sNameVal = 'BAKA';
var bDayVal = '01/05/19'+(Math.floor((Math.random() * (99-55)) + 55)).toString(); //Replace with your birthday if you wish.
var proxyUrl = ''; //if proxy exists enter it in format IP:PORT, if not leave blank
var proxyUser = ''; //If proxy username/pass exists insert it here if not leave both variables blank
var proxyPass = '';
var info;
var themessage;
var phoneNum;
var userpass;
var RegionVal='VN';

// From Main DashBoard
const Dashboard_Signup_1 = '#gen-nav-commerce-header-v2 > div.pre-l-header-container > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div > div > div:nth-child(3) > div > a';
const Dashboard_Signup_2 = '#\\39 a519619-fe20-4cc4-943f-3c70a8e36fe1 > div > div > div.YEqpdVMc.cta-container.hasText > a';
const Region_Signup = '#\\32 427789a-c70c-4397-879f-0d15a1d77806';
//GET DOM TRAVERSAL VALUES
const AcceptCookies = '#cookie-settings-layout > div > div > div > div.ncss-row.mt5-sm.mb7-sm > div:nth-child(2) > button';
const loginBtn = 'li.member-nav-item.d-sm-ib.va-sm-m > button';
const registerBtn = '.loginJoinLink.current-member-signin > a';
const email = 'input[type="email"]';
const password = 'input[type="password"]';
const fName = '.firstName.nike-unite-component.empty > input[type="text"]';
const sName = '.lastName.nike-unite-component.empty > input[type="text"]';
const dob = 'input[type="date"]';
const gender_male = 'li:nth-child(1) > input[type="button"]';
const submit = '.joinSubmit.nike-unite-component > input[type="button"]';
const phone = 'div.sendCode > div.mobileNumber-div > input';
const sendNum = '#nike-unite-progressiveForm > div > div > input[type="button"]';
const enterTheValue = 'input[type="number"]';
const storedSubmit = '#nike-unite-progressiveForm > div > input[type="button"]';


//Create Sleep function to use in Async/Await function
function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
var chromeFlags = [
  '--disable-web-security',
  '--disable-features=IsolateOrigins',
  '--disable-site-isolation-trials',
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-accelerated-2d-canvas',
  '--no-zygote',
  '--renderer-process-limit=1',
  '--no-first-run',
  '--ignore-certificate-errors',
  '--ignore-certificate-errors-spki-list',
  '--disable-dev-shm-usage',
  '--disable-infobars',
  '--lang=en-US,en',
  '--window-size=1920x1080',
  '--disable-extensions',
  // '--proxy-server='+ proxyUrl
]
// puppeteer.launch(
//     { 
//         executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
//         args: chromeFlags,
//         // args: ['--proxy-server='+ proxyUrl], 
//         headless: false, 
//         slowMo: 150,
//     }).then(async browser=> {
//     console.log('Running tests..')
//     const page = await browser.newPage();
//     await page.goto('https://bot.sannysoft.com')
//     await page.waitForTimeout(5000)
//     await page.screenshot({ path: 'testresult.png', fullPage: true })
//     await browser.close()
//     console.log(`All done, check the screenshot. ✨`)
//   })
// //callback for phone number request
// function callback(error, response, body) {
//       if (!error && response.statusCode == 200) {
//         info = body;
//         console.log("Phone Number: " + info);
//     }
// }

//values for phone number request
const options = {
    url: 'http://www.getsmscode.com/vndo.php?action=getmobile&username='+smsEmail+'&token='+token+'&cocode=uk&pid=462',
    headers: {'User-Agent': 'request'}
};

//callback for text message response
function callbacktwo(error, response, body) {
    if (!error && response.statusCode == 200) {
        themessage = body;
        console.log("Message: " + themessage);
    }
}
function delay(time) {
  return new Promise(function(resolve) { 
      setTimeout(resolve, time)
  });
}
async function ReuseCookies(page)
{
  const cookiesString = await fs.readFile('./diaoCookies_edited.json');
  const cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
}
console.log("The Bot is starting...");
try {
(async () => {
    var page;
    var cursor;
    if(proxyUrl != '')
    {
          // const page = await browser.newPage();
    	browser = await puppeteer.launch({
          args: [
            // '--disable-web-security',
            // '--disable-features=IsolateOrigins',
            // '--disable-site-isolation-trials',
            // '--no-sandbox',
            // '--disable-setuid-sandbox',
            // '--disable-accelerated-2d-canvas',
            // '--no-zygote',
            // '--renderer-process-limit=1',
            // '--no-first-run',
            // '--ignore-certificate-errors',
            // '--ignore-certificate-errors-spki-list',
            // '--disable-dev-shm-usage',
            // '--disable-infobars',
            '--lang=en-US,en',
            '--window-size=1920x1080',
            // '--disable-extensions',
            // '--disable-blink-features=AutomationControlled',
            '--proxy-server='+ proxyUrl
          ], 
          headless: false, 
          // slowMo: 150,
          executablePath: '%ProgramFiles%\Google\Chrome\Application\chrome.exe' 
        });
      
      page = await browser.newPage();
      cursor = createCursor(page);
      if(proxyUser != '' &&proxyPass != ''){
      	console.log("authenticating proxy user/pass");
        await page.authenticate({ 
          username: proxyUser, 
          password: proxyPass 
      	});
    }
    }else{
      browser = await puppeteer.launch(
        { 
            executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
            args: [
              // '--no-sandbox',
              // '--disable-setuid-sandbox',
              // '--disable-accelerated-2d-canvas',
              // '--no-zygote',
              // '--renderer-process-limit=1',
              // '--no-first-run',
              // '--ignore-certificate-errors',
              // '--ignore-certificate-errors-spki-list',
              // '--disable-dev-shm-usage',
              // '--disable-infobars',
              '--lang=en-US,en',
              '--window-size=1280x720',
              // '--disable-extensions',
              // '--disable-web-security',
              // '--disable-features=IsolateOrigins',
              // '--disable-site-isolation-trials',
              // '--disable-blink-features=AutomationControlled'
              // '--proxy-server='+ proxyUrl
            ],
            // args: ['--proxy-server='+ proxyUrl], 
            headless: false, 
            // slowMo: 150,
        });
      page = await browser.newPage();
      cursor = createCursor(page);
    }
    await installMouseHelper(page);
    // await page.goto('https://www.nike.com/vn/launch',{waitUntil: 'networkidle2'});
    await page.goto('https://www.nike.com/vn',{waitUntil: 'networkidle2'});
      await page.setViewport({ width: 1280, height: 7200 });
      //HUMAN INTERACTION TIMELINE
      // console.log("Need Human Interaction... for 10 sec");
      // await page.waitForTimeout(10000);
      //////////////////////////////////
      //COOKIE

      // console.log("Waiting for Cookies...");
      // const cookies = await page.cookies();
      // // console.log("Reuse Cookies...");
      // // ReuseCookies(page);
      // console.log("Accepted Cookies...");
      // console.log("Saving Cookies...");
      // await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
      // console.log("Cookies Saved...");
      // await page.waitForTimeout(1000);
      // await delay(5000);
      /////////////////////////////////
      var Rando_Delay;
      console.log("Looking for register Button (1)");
      await page.waitForSelector(Dashboard_Signup_1,{visible: true, hidden: false});
      await cursor.move(Dashboard_Signup_1);
      await cursor.click();
      console.log("Register Button (1) Clicked");
      // await page.waitForNavigation({waitUntil: 'networkidle2'});
      // await page.waitForNavigation();
      // await delay(5000);
      console.log("Looking for register Button (2)");
      await page.waitForSelector(Dashboard_Signup_2);
      await cursor.move(Dashboard_Signup_2);
      await cursor.click();
      console.log("Register Button (2) Clicked");
      // await page.waitForNavigation();
  
      // await page.waitForTimeout(2000);
      console.log("Looking for Email TextBox");
      await page.waitForSelector(email,{visible: true, hidden: false});
      console.log("email: " + emailVal);
      await cursor.click(email);
      Rando_Delay = Math.floor(Math.random() * 100) + 50;
      await page.type(email, emailVal, { delay: Rando_Delay });
      console.log("entered email");
  
      console.log("Looking for Password TextBox");
      await page.waitForSelector(password,{visible: true, hidden: false});
      await cursor.click(password);
      Rando_Delay = Math.floor(Math.random() * 100) + 50;
      await page.type(password, passwordVal, { delay: Rando_Delay });
      console.log("entered Password");

      console.log("Looking for Fname TextBox");
      await page.waitForSelector(fName,{visible: true, hidden: false});
      await cursor.click(fName);
      Rando_Delay = Math.floor(Math.random() * 100) + 50;
      await page.type(fName, fNameVal, { delay: Rando_Delay });
      console.log("entered Fname");

      console.log("Looking for sName TextBox");
      await page.waitForSelector(sName,{visible: true, hidden: false});
      await cursor.click(sName);
      Rando_Delay = Math.floor(Math.random() * 100) + 50;
      await page.type(sName, sNameVal, { delay: Rando_Delay });
      console.log("entered sName");

      console.log("Looking for DOB TextBox");
      await page.waitForSelector(dob,{visible: true, hidden: false});
      await cursor.click(dob);
      Rando_Delay = Math.floor(Math.random() * 100) + 50;
      await page.type(dob, bDayVal, { delay: Rando_Delay });
      console.log("entered DOB");

      // console.log("Looking for Region TextBox");
      // await page.waitForSelector(Region_Signup);
      // await cursor.click(Region_Signup);
      // Rando_Delay = Math.floor(Math.random() * 100) + 50;
      // await page.type(Region_Signup, RegionVal, { delay: Rando_Delay });
      // console.log("entered Region");

      console.log("Looking for Gender Button");
      await page.waitForSelector(gender_male,{visible: true, hidden: false});
      await cursor.click(gender_male);
      console.log("entered Gender Button");

      console.log("Looking for Submit Button");
      await page.waitForSelector(submit,{visible: true, hidden: false});
      await cursor.click(submit);
      // await page.click(submit);
      console.log("submitted");

      console.log("email : "+emailVal+" - pass : "+passwordVal);
      await delay(5000);
    // try{
    //   //   request(options, callback);
    //     await sleep(10000);
  
    //     // if(info.includes("balance")){
    //     //   console.log("LOW BALANCE: Add money to your getsmscode account. ");
    //     //   browser.close();
    //     //   process.exit();
    //     // }
  
    //         phoneNum = info.toString().slice(2);
  
    //         console.log("Phone number: " + phoneNum);
  
    //         console.log("waiting 5s");
    //         await page.waitForTimeout(5000); 
    //         console.log("waiting done");
    //         await page.screenshot({path: 'screenshot.png'});
    //         await page.click(phone);
    //         await page.type(phone, phoneNum);
    //         console.log("entered phone number");
  
    //         console.log("waiting 2s");
    //         await page.waitForTimeout(2000);
    //         console.log("waiting done");
  
    //         await page.click(sendNum);
    //         console.log("pressed send number button");
  
    //         console.log("Getting Text Message: 15s wait");
    //         await sleep(15000);
  
    //         console.log("Phone Number: " + phoneNum);
  
    //     const values = {
    //            url: 'http://www.getsmscode.com/vndo.php?action=getsms&username='+smsEmail+'&token='+token+'&pid=462&cocode=uk&mobile=44'+phoneNum,
    //            headers: {'User-Agent': 'request'}
    //     };
  
    //     // await request(values, callbacktwo);
  
    //     await sleep(1500);
  
    //     if (themessage.includes("Nike")){
  
    //     console.log("request complete");
    //     var theMessaging = themessage.slice(themessage.length-6);
    //     console.log("Message: " + theMessaging.toString());
         
    //     await page.click(enterTheValue);
    //     await page.type(enterTheValue, theMessaging);
    //     console.log("entered phone message");
  
    //     await sleep(500);
  
    //   await page.click(storedSubmit);
    //   console.log("submitted");
    //   userpass = (emailVal + ":" + passwordVal);
    //   console.log(userpass);
  
    //   fs.appendFile('Accounts.txt', '\n'+userpass, (err) => {  
    //       if (err) throw err;
    //       console.log('Added User/Pass To Accounts.txt!');
    //   });
  
    //     }else{
    //       console.log("failed to get sms from getsmscode.com");
    //     }
  
    //     await sleep(1000);
  
    // }catch(error){
    //     console.error(error);
    //     browser.close();
    //     process.exit();
    // } 
  
    browser.close();
    process.exit();
    })();
}catch(err)
{
  console.err("Error : "+err);
  process.exit();
}

