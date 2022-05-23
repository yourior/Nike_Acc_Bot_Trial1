const puppeteer = require('puppeteer-extra');
// const SMSActivate = require('sms-activate');
const { createCursor } = require ("ghost-cursor");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const request = require('request');
const fs = require('fs').promises;
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const {installMouseHelper} = require('./mouse-view');

// var emailVal = 'TesterEmail' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@nguyenluck.com';
// var smsEmail = 'ENTER GETSMSCODE.COM EMAIL ADDRESS';
// var token = 'ENTER GETSMSCODE API TOKEN';
// var passwordVal = 'Alkaline@tester123';
// var fNameVal = 'BAKAYAROU';
// var sNameVal = 'BAKA';
// var bDayVal = '01/05/19'+(Math.floor((Math.random() * (99-55)) + 55)).toString(); //Replace with your birthday if you wish.
// var proxyUrl = ''; //if proxy exists enter it in format IP:PORT, if not leave blank
// var proxyUser = ''; //If proxy username/pass exists insert it here if not leave both variables blank
// var proxyPass = '';
// var info;
var themessage;
// var phoneNum;
// var userpass;
// var RegionVal='Vietnam';
var NikeWeb = 'https://www.nike.com/';
// var Chrome_Ubuntu = '/usr/bin/google-chrome';
// var Chrome_Windows = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
// From Main DashBoard
const Menu_Option_NONFULL = '#MobileMenuButton';
const DashBoard_SignUp_NONFULL = '#hf_title_joinus_membership';
const Dashboard_Signup_1 = '#gen-nav-commerce-header-v2 > div.pre-l-header-container > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div > div > div:nth-child(3) > div > a';
const Dashboard_Signup_2 = '#\\39 a519619-fe20-4cc4-943f-3c70a8e36fe1 > div > div > div.YEqpdVMc.cta-container.hasText > a';
const Region_Signup = '#\\34 192d36c-1096-47c7-8637-dd56783efd1b';
const Email_Signup = '#f0735cfc-e551-49c2-8fb3-436310735e57';
const Dasboard_RegionPicker = '#gen-nav-footer > footer > div > div.l-sub-footer.ncss-row > div.ncss-col-sm-12.ncss-col-md-6.pt3-sm.pl5-sm.pl2-md > div > a';
const Dashboard_RegionPicker_VN = '#gen-nav-footer > nav > div > div > div:nth-child(3) > div > a:nth-child(16)';
const ProfileClick = '#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > nav > div.pre-mobilemenu.d-sm-ib.d-lg-h.z2.pre-show > div.pre-panel.pre-panel-root > button.nav-btn.p0-sm.pre-link.pre-account-link > div > div';
const ProfileClick_step2 ='#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > nav > div.pre-mobilemenu.d-sm-ib.d-lg-h.z2.pre-show > div.pre-panel.pre-my-account-panel > a:nth-child(8)';
const ProfileClick_step3 = '#settings > div.css-5d5ho6 > div.ncss-headline-lg-brand.ncss-col-sm-12.ncss-col-lg-4.pb8-sm.pr6-lg.pl0-sm.va-sm-t.css-bdqskz > div:nth-child(1) > div';
const AddNumber = '#modal-root > div > div > div > div:nth-child(2) > div > form > div.account-form > div.mex-mobile-input-wrapper.ncss-col-sm-12.ncss-col-md-12.pl0-sm.pr0-sm.pb3-sm > div > div > div > div.ncss-col-sm-6.ta-sm-r.va-sm-m.flx-jc-sm-fe.d-sm-iflx > button';
const FillNumber = '#e079ab86-520f-4e6f-8165-1d7cf7eb154e';
const Send_OTPButton = '#bc48f9f3-c784-48c1-9397-18fb4504bbd5';
const OTPFill = '#\\38 11824e8-cb24-482c-a1d7-f93de0355b02';
const AgreeButtonOTP = '#progressiveMobile > label';
const OTPContinue = '#ef18c42e-3b75-4fb4-ab6c-ace57ef4e449';
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
const gender_female = '#\\39 f257672-1e5e-47bd-8aa6-e8bab48284c9 > input[type=button]';
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
// const options = {
//     url: 'http://www.getsmscode.com/vndo.php?action=getmobile&username='+smsEmail+'&token='+token+'&cocode=uk&pid=462',
//     headers: {'User-Agent': 'request'}
// };

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
// var page;
exports.Create = async (page,cursor,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,GenderVal,OTPProvider='SMS-Activate',OTP_API) => {
  console.log("The Bot is starting...");
  try{
      cursor = createCursor(page);
      await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage(),
      ]);

      await installMouseHelper(page);//VIEW MOUSE
      // await page.goto('https://www.nike.com/vn/launch',{waitUntil: 'networkidle2'});
      await page.goto(NikeWeb,{waitUntil: 'networkidle2'});
        // await page.setViewport({ width: 1280, height: 720 });

        //Get Region Picker
        console.log("Get Region Picker");
        await page.waitForSelector(Dasboard_RegionPicker,{visible: true, hidden: false});
        await cursor.move(Dasboard_RegionPicker);
        await cursor.click();
        console.log("Region Picker Found");
        //////////
        // HUMAN INTERACTION TIMELINE
        const WaitTime = 10;
        var WaitCount=0;
        console.log("Need Human Interaction... for 10 sec");
        while(WaitCount<WaitTime)
        {
          console.log("Counting.... "+WaitCount);
          WaitCount++;
          await delay(1000);
        }
        console.log("Stop touching :)");
        await delay(2000);
        ////////////////////////////////
        //Get Region 
        console.log("Get Region Vietnam");
        await page.waitForSelector(Dashboard_RegionPicker_VN,{visible: true, hidden: false});
        await cursor.move(Dashboard_RegionPicker_VN);
        await cursor.click();
        console.log("Region Vietnam Found");
        //////////
        var Rando_Delay;
        console.log("Looking for register Button (1)");
        // // FULL VIEW
        // await page.waitForSelector(Dashboard_Signup_1,{visible: true, hidden: false});
        // await cursor.move(Dashboard_Signup_1);
        // await cursor.click();
        // //////////////////
        await page.waitForSelector(Menu_Option_NONFULL,{visible: true, hidden: false});
        await cursor.move(Menu_Option_NONFULL);
        await cursor.click();
        await page.waitForSelector(DashBoard_SignUp_NONFULL,{visible: true, hidden: false});
        await cursor.move(DashBoard_SignUp_NONFULL);
        await cursor.click();
        console.log("Register Button (1) Clicked");
        // await page.waitForNavigation({waitUntil: 'networkidle0'});
        // await page.waitForNavigation();
        // await delay(5000);
        console.log("Looking for register Button (2)");
        await page.waitForSelector(Dashboard_Signup_2);
        await cursor.move(Dashboard_Signup_2);
        await cursor.click();
        console.log("Register Button (2) Clicked");
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
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
  
        console.log("Looking for Region Dropdown");
        // await page.waitForSelector(Region_Signup);
        console.log("Region Dropdown Skip FOR NOW");
        // // await cursor.click(Region_Signup);
        // Rando_Delay = Math.floor(Math.random() * 100) + 50;
        // await page.select(Region_Signup, RegionVal, { delay: Rando_Delay });
        // // await page.type(Region_Signup, RegionVal, { delay: Rando_Delay });
        // console.log("entered Region");
  
        console.log("Looking for Gender Button");
        if(GenderVal=='m')
        {
          await page.waitForSelector(gender_male,{visible: true, hidden: false});
          await cursor.click(gender_male);
        }else if(GenderVal=='f')
        {
          await page.waitForSelector(gender_female,{visible: true, hidden: false});
          await cursor.click(gender_female);
        }
        console.log("entered Gender Button");
  
        console.log("Looking for Submit Button");
        await page.waitForSelector(submit,{visible: true, hidden: false});
        await cursor.click(submit);
        // await page.click(submit);
        console.log("submitted");
  
        console.log("email : "+emailVal+" - pass : "+passwordVal);
        await delay(5000);
        //COOKIE
  
        console.log("Waiting for Cookies...");
        const cookies = await page.cookies();
        // console.log("Reuse Cookies...");
        // ReuseCookies(page);
        console.log("Accepted Cookies...");
        console.log("Saving Cookies...");
        await fs.writeFile('./cookiesSignIn.json', JSON.stringify(cookies, null, 2));
        console.log("Cookies Saved...");
        // await page.waitForTimeout(1000);
        // await delay(5000);
        
        /////////////////////////////////
        // GO TO PROFILE
        console.log("Going to Profile");
        await page.waitForSelector(Menu_Option_NONFULL,{visible: true, hidden: false});
        await cursor.move(Menu_Option_NONFULL);
        await cursor.click();
        await page.waitForSelector(ProfileClick,{visible: true, hidden: false});
        await cursor.move(ProfileClick);
        await cursor.click();
        await page.waitForSelector(ProfileClick_step2,{visible: true, hidden: false});
        await cursor.move(ProfileClick_step2);
        await cursor.click();
        console.log("Go to Profile Section, Looking for Account Setting Button");
        await page.waitForSelector(ProfileClick_step3,{visible: true, hidden: false});
        await cursor.move(ProfileClick_step3);
        await cursor.click();
        console.log("Account Setting Found");

        console.log("Looking for Add Phone Number Button");
        await page.waitForSelector(AddNumber,{visible: true, hidden: false});
        await cursor.move(AddNumber);
        await cursor.click();
        console.log("Add Phone Number Button Found");
        //
        console.log("Looking for Phone Number Text Box");
        await page.waitForSelector(FillNumber);
        await cursor.move(AddNumber);
        await cursor.click();
        console.log("Phone Number Text Box Found");
        console.log("Asking for Phone Number");
        /////SMS-Activate;
        var phoneSMS_Activate ;
        //
        console.log("Phone Number is Given");
        console.log("Filling Phone Number");
        Rando_Delay = Math.floor(Math.random() * 100) + 50;
        await page.type(AddNumber, phoneSMS_Activate, { delay: Rando_Delay });
        console.log("Entered Phone Number");
        console.log("Looking for Send OTP Button");
        await page.waitForSelector(Send_OTPButton);
        await cursor.move(Send_OTPButton);
        await cursor.click();
        console.log("Send OTP Button Found");
        console.log("Waiting For OTP");
        console.log("While Waiting For OTP, System is Looking for OTP TextBox");
        await page.waitForSelector(OTPFill);
        await cursor.move(OTPFill);
        await cursor.click();
        console.log("OTP TextBox Found");
        if(OTPProvider == 'OTPProvider')
        {
          //SMS-Activate
          console.log("Still Waiting for OTP");

          console.log("OTP is given");
          //
        }
        console.log("Looking for Agree Button");
        await page.waitForSelector(AgreeButtonOTP);
        await cursor.move(AgreeButtonOTP);
        await cursor.click();
        console.log("it is agreed");
        console.log("Looking for Accept Button");
        await page.waitForSelector(OTPContinue);
        await cursor.move(OTPContinue);
        await cursor.click();
        console.log("OTP is given to Nike");

        console.log("Waiting for Cookies...");
        cookies = await page.cookies();
        // console.log("Reuse Cookies...");
        // ReuseCookies(page);
        console.log("Accepted Cookies...");
        console.log("Saving Cookies...");
        await fs.writeFile('./cookiesSuccess.json', JSON.stringify(cookies, null, 2));
        console.log("Cookies Saved...");

        // console.log("");
        const [jsCoverage, cssCoverage] = await Promise.all([
          page.coverage.stopJSCoverage(),
          page.coverage.stopCSSCoverage(),
        ]);
        let totalBytes = 0;
        let usedBytes = 0;
        const coverage = [...jsCoverage, ...cssCoverage];
        for (const entry of coverage) {
          totalBytes += entry.text.length;
          for (const range of entry.ranges) usedBytes += range.end - range.start - 1;
        }
        console.log(`Bytes used: ${(usedBytes / totalBytes) * 100}%`);
        
        return {
          status : true,
          Email : emailVal,
          Pass : passwordVal
        }
    }catch(err)
    {
      console.error("Create Account Error Log : "+err);
      var statsReturn;
      if(err.toString().includes("TimeoutError"))
      {
        console.log("Yo Internet too slow / cannot find button");
        statsReturn = "TimeoutError";
      }
      return {
        status : statsReturn
      }
    }     
};


