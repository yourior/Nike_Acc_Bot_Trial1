var puppeteer = require('puppeteer-extra');
// var {TimeoutError} = require('puppeteer/Errors');
// var SMSActivate = require('sms-activate');
var { createCursor } = require ("ghost-cursor");
var StealthPlugin = require('puppeteer-extra-plugin-stealth');
// var request = require('request');
var fs = require('fs').promises;
puppeteer.use(StealthPlugin());
var AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

var {installMouseHelper} = require('./mouse-view');
var SMS = require('./SMS_Activate');

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
var Region = require('./RegionManager');
var NikeWeb = 'https://www.nike.com/';
// var Chrome_Ubuntu = '/usr/bin/google-chrome';
// var Chrome_Windows = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
// From Main DashBoard
var Menu_Option_NONFULL = '#MobileMenuButton';
var DashBoard_SignUp_NONFULL = '#hf_title_joinus_membership';
var Dashboard_Signup_1 = '#gen-nav-commerce-header-v2 > div.pre-l-header-container > div.pre-l-brand-header.d-sm-h.d-lg-b.z3 > div > div > div:nth-child(3) > div > a';
var Dashboard_Signup_2 = '#\\39 a519619-fe20-4cc4-943f-3c70a8e36fe1 > div > div > div.YEqpdVMc.cta-container.hasText > a';
var Region_Signup = '#\\34 192d36c-1096-47c7-8637-dd56783efd1b';
var Email_Signup = '#f0735cfc-e551-49c2-8fb3-436310735e57';
var Dasboard_RegionPicker = '#gen-nav-footer > footer > div > div.l-sub-footer.ncss-row > div.ncss-col-sm-12.ncss-col-md-6.pt3-sm.pl5-sm.pl2-md > div > a';
// var Dashboard_RegionPicker_Country = await Region.GetRegion().NikeWeb_Location;
var ProfileClick = '#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > nav > div.pre-mobilemenu.d-sm-ib.d-lg-h.z2.pre-show > div.pre-panel.pre-panel-root > button.nav-btn.p0-sm.pre-link.pre-account-link > div > div';
var ProfileClick_step2 ='#gen-nav-commerce-header-v2 > div.pre-l-header-container > header > div > div.pre-l-wrapper.mauto-sm.d-sm-flx > div.pre-l-nav-box.flx-gro-sm-1 > nav > div.pre-mobilemenu.d-sm-ib.d-lg-h.z2.pre-show > div.pre-panel.pre-my-account-panel > a:nth-child(8)';
var ProfileClick_step3 = '#settings > div.css-5d5ho6 > div.ncss-headline-lg-brand.ncss-col-sm-12.ncss-col-lg-4.pb8-sm.pr6-lg.pl0-sm.va-sm-t.css-bdqskz > div:nth-child(1) > div';
var AddNumber = '#modal-root > div > div > div > div:nth-child(2) > div > form > div.account-form > div.mex-mobile-input-wrapper.ncss-col-sm-12.ncss-col-md-12.pl0-sm.pr0-sm.pb3-sm > div > div > div > div.ncss-col-sm-6.ta-sm-r.va-sm-m.flx-jc-sm-fe.d-sm-iflx > button';
var FillNumber = '#\\34 6d904c5-26fb-4cff-8de3-8a6642de060c';
var Send_OTPButton = '#\\39 1782026-e9af-47cc-9868-119a10f7cbcb';
var OTPFill = '#\\38 11824e8-cb24-482c-a1d7-f93de0355b02';
var AgreeButtonOTP = '#progressiveMobile > label';
var OTPContinue = '#\\37 a4b14c5-66fd-4af4-863d-a71181f2c81d';
//
var EmailDuplicate = '#deb378bc-824e-42b2-8470-3be499cfebd5';
var EmailNotValid = '#bfcbd896-8086-496b-8c4f-601c3b3b2da9 > div.error';
var PassNotValid = '#\\33 bc52eaf-24d9-4c97-8dc5-62c33ad80bcd > div.error';
var FnameNotValid = '#\\36 1c884b4-161f-42c8-b975-42ee6c4dd910 > div.error';
var SnameNotValid = '#a7aa3fd0-0dd0-4956-9e67-1d867ff43ed8 > div.error';
var DOBNotValid = '#\\32 6e24c95-5462-4038-9c4c-c8168280ac68 > div.error';
var GenderNotValid = '#\\30 eeb5b56-fecf-4d97-a2ee-158f7c3dce29 > div.error';
//
//GET DOM TRAVERSAL VALUES
var AcceptCookies = '#cookie-settings-layout > div > div > div > div.ncss-row.mt5-sm.mb7-sm > div:nth-child(2) > button';
var loginBtn = 'li.member-nav-item.d-sm-ib.va-sm-m > button';
var registerBtn = '.loginJoinLink.current-member-signin > a';
var email = 'input[type="email"]';
var password = 'input[type="password"]';
var fName = '.firstName.nike-unite-component.empty > input[type="text"]';
var sName = '.lastName.nike-unite-component.empty > input[type="text"]';
var dob = 'input[type="date"]';
var gender_male = 'li:nth-child(1) > input[type="button"]';
var gender_female = '#\\39 f257672-1e5e-47bd-8aa6-e8bab48284c9 > input[type=button]';
var submit = '.joinSubmit.nike-unite-component > input[type="button"]';
var phone = 'div.sendCode > div.mobileNumber-div > input';
var sendNum = '#nike-unite-progressiveForm > div > div > input[type="button"]';
var enterTheValue = 'input[type="number"]';
var storedSubmit = '#nike-unite-progressiveForm > div > input[type="button"]';

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
//     var page = await browser.newPage();
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
// var options = {
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
  var cookiesString = await fs.readFile('./diaoCookies_edited.json');
  var cookies = JSON.parse(cookiesString);
  await page.setCookie(...cookies);
}
// var page;
exports.Create = async (page,cursor,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,GenderVal,OTPProvider='SMS-Activate') => {
  console.log("The Bot is starting...");
  try{
      cursor = createCursor(page);
      await Promise.all([
        page.coverage.startJSCoverage(),
        page.coverage.startCSSCoverage(),
      ]);

      await installMouseHelper(page);//VIEW MOUSE
      // await page.goto('https://www.nike.com/vn/launch',{waitUntil: 'networkidle2'});
      await page.goto(NikeWeb,{waitUntil: 'networkidle0'});
        // await page.setViewport({ width: 1280, height: 720 });

        //Get Region Picker
        console.log("Get Region Picker");
        await page.waitForSelector(Dasboard_RegionPicker,{visible: true, hidden: false});
        await cursor.move(Dasboard_RegionPicker);
        await page.focus(Dasboard_RegionPicker);
        await cursor.click();
        console.log("Region Picker Found");
        //////////
        // HUMAN INTERACTION TIMELINE
        var WaitTime = 10;
        var WaitCount=0;
        console.log("Optional Human Interaction... for 10 sec");
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
        console.log("Get Region");
        console.log(await Region.GetRegion().NikeWeb_Location);//PROBLEM
        var Dashboard_RegionPicker_Country = await Region.GetRegion();
        console.log(JSON.stringify(Dashboard_RegionPicker_Country));
        await page.waitForSelector(Dashboard_RegionPicker_Country.NikeWeb_Location,{visible: true, hidden: false});
        await cursor.move(Dashboard_RegionPicker_Country.NikeWeb_Location);
        await page.focus(Dashboard_RegionPicker_Country.NikeWeb_Location);
        await cursor.click();
        console.log("Region Found");
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
        await page.focus(Menu_Option_NONFULL);
        await cursor.click();
        await page.waitForSelector(DashBoard_SignUp_NONFULL,{visible: true, hidden: false});
        await cursor.move(DashBoard_SignUp_NONFULL);
        await page.focus(DashBoard_SignUp_NONFULL);
        await cursor.click();
        console.log("Register Button (1) Clicked");

        // console.log("Join us Layout is Loading");
        // await page.waitForNavigation({waitUntil: 'networkidle0'});
        // console.log("Join us Layout is Loaded");

        console.log("Looking for register Button (2)");
        await page.waitForSelector(Dashboard_Signup_2);
        await cursor.move(Dashboard_Signup_2);
        await page.focus(Dashboard_Signup_2);
        await cursor.click();
        console.log("Register Button (2) Clicked");

        console.log("Register Page is Loading");
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log("Register Page is Loaded");

        var passedSignIn = false,attemptSignin=0,trySignIn= 3;
        while(!passedSignIn )
        {
          if(attemptSignin>trySignIn)
          {
            console.log("Too Many Wrong Attempt");
            return {
              status : false
            } 
          }
          attemptSignin++;
          console.log("Looking for Email TextBox");
          await page.waitForSelector(email,{visible: true, hidden: false});
          console.log("email: " + emailVal);
          await cursor.move(email);
          await page.focus(email);
          await cursor.click();
          Rando_Delay = Math.floor(Math.random() * 100) + 50;
          await page.type(email, emailVal, { delay: Rando_Delay });
          console.log("entered email");

          try {
            await page.waitForSelector(EmailDuplicate, {timeout: 1000});
            console.log("Email is Already Registered -> Trying to make a new One");
            //remaking Email
            var Array = email.split("@");
            Array[0] = Array[0]+"2";
            email = Array[0]+"@"+Array[1];
            /////
            //Then redo input
          } catch (e) {
              // Do something if this is a timeout.
            try{
              await page.waitForSelector(EmailNotValid, {timeout: 1000});
              console.log("Email is not Clicked or filled correctly");
              //reInput
            }catch (e) {
                passedSignIn = true;
              }
            }
        }
        passedSignIn = false,attemptSignin=0,trySignIn= 3;
        while(!passedSignIn )
        {
          if(attemptSignin>trySignIn)
          {
            console.log("Too Many Wrong Attempt");
            return {
              status : false
            } 
          }
          attemptSignin++;
          console.log("Looking for Password TextBox");
          await page.waitForSelector(password,{visible: true, hidden: false});
          await cursor.move(password);
          await page.focus(password);
          await cursor.click();
          Rando_Delay = Math.floor(Math.random() * 100) + 50;
          await page.type(password, passwordVal, { delay: Rando_Delay });
          console.log("entered Password");
          try {
            await page.waitForSelector(PassNotValid, {timeout: 1000});
            console.log("Password is not Valid");
            //reInput
          } catch (e) {
            passedSignIn = true;
          }
        }
        passedSignIn = false,attemptSignin=0,trySignIn= 3;
        while(!passedSignIn && trySignIn>attemptSignin)
        {
          attemptSignin++;
          console.log("Looking for Fname TextBox");
          await page.waitForSelector(fName,{visible: true, hidden: false});
          await cursor.move(fName);
          await page.focus(fName);
          await cursor.click();
          Rando_Delay = Math.floor(Math.random() * 100) + 50;
          await page.type(fName, fNameVal, { delay: Rando_Delay });
          console.log("entered Fname");
          try {
            await page.waitForSelector(FnameNotValid, {timeout: 1000});
            console.log("FName is not Valid");
            //reInput
          } catch (e) {
            passedSignIn = true;
          }
        }
        passedSignIn = false,attemptSignin=0,trySignIn= 3;
        while(!passedSignIn )
        {
          if(attemptSignin>trySignIn)
          {
            console.log("Too Many Wrong Attempt");
            return {
              status : false
            } 
          }
          attemptSignin++;
          console.log("Looking for sName TextBox");
          await page.waitForSelector(sName,{visible: true, hidden: false});
          await cursor.move(sName);
          await page.focus(sName);
          await cursor.click();
          Rando_Delay = Math.floor(Math.random() * 100) + 50;
          await page.type(sName, sNameVal, { delay: Rando_Delay });
          console.log("entered sName");

          try {
            await page.waitForSelector(SnameNotValid, {timeout: 1000});
            console.log("SName is not Valid");
            //reInput
          } catch (e) {
            passedSignIn = true;
          }
        }
        passedSignIn = false,attemptSignin=0,trySignIn= 3;
        while(!passedSignIn )
        {
          if(attemptSignin>trySignIn)
          {
            console.log("Too Many Wrong Attempt");
            return {
              status : false
            } 
          }
          attemptSignin++;
          console.log("Looking for DOB TextBox");
          await page.waitForSelector(dob,{visible: true, hidden: false});
          await cursor.move(dob);
          await page.focus(dob);
          // await cursor.click();
          Rando_Delay = Math.floor(Math.random() * 100) + 50;
          await page.type(dob, bDayVal, { delay: Rando_Delay });
          console.log("entered DOB");
          try {
            await page.waitForSelector(DOBNotValid, {timeout: 1000});
            console.log("DOB is not Valid");
            //reInput
          } catch (e) {
            passedSignIn = true;
          }
        }
        console.log("Looking for Region Dropdown");
        // await page.waitForSelector(Region_Signup);
        console.log("Region Dropdown Skip FOR NOW");
  
        passedSignIn = false,attemptSignin=0,trySignIn= 3;
        while(!passedSignIn )
        {
          if(attemptSignin>trySignIn)
          {
            console.log("Too Many Wrong Attempt");
            return {
              status : false
            } 
          }
          attemptSignin++;
          console.log("Looking for Gender Button");
          if(GenderVal=='m')
          {
            await page.waitForSelector(gender_male,{visible: true, hidden: false});
            await cursor.move(gender_male);
            await page.focus(gender_male);
            await cursor.click();
          }else if(GenderVal=='f')
          {
            await page.waitForSelector(gender_female,{visible: true, hidden: false});
            await cursor.move(gender_female);
            await page.focus(gender_female);
            await cursor.click();
          }
          try {
            await page.waitForSelector(GenderNotValid, {timeout: 1000});
            console.log("Gender is not Valid");
            //reInput
          } catch (e) {
            passedSignIn = true;
          }
        }
        console.log("entered Gender Button");
  
        console.log("Looking for Submit Button");
        await page.waitForSelector(submit,{visible: true, hidden: false});
        await cursor.move(submit);
        await page.focus(submit);
        await cursor.click();

        console.log("submitted");
        // await page.waitForNavigation({ waitUntil: 'networkidle0' });

        console.log("email : "+emailVal+" - pass : "+passwordVal);

        //COOKIE
        console.log("Waiting for Cookies...");
        var cookies = await page.cookies();
        console.log("Accepted Cookies...");
        console.log("Saving Cookies...");
        await fs.writeFile('./cookiesSignIn.json', JSON.stringify(cookies, null, 2));
        console.log("Cookies Saved...");
        /////////////////////////////////

        //RELOAD MAIN MENU
        console.log("Main Menu is Loading");
        await page.waitForNavigation({ waitUntil: 'networkidle0' });
        console.log("Main Menu is Loaded");
        //
        
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

        // console.log("Profile Section is Loading");
        // await page.waitForNavigation({ waitUntil: 'networkidle0' });
        // console.log("Profile Section is Loaded");

        console.log("Go to Profile Section, Looking for Account Setting Button");
        await page.waitForSelector(ProfileClick_step3,{visible: true, hidden: false});
        await cursor.move(ProfileClick_step3);
        await cursor.click();
        console.log("Account Setting Found");

        // console.log("Account Setting is Loading");
        // await page.waitForNavigation({ waitUntil: 'networkidle0' });
        // console.log("Account Setting is Loaded");

        console.log("Looking for Add Phone Number Button");
        await page.waitForSelector(AddNumber,{visible: true, hidden: false});
        await cursor.move(AddNumber);
        await cursor.click();
        console.log("Add Phone Number Button Found");
        //

        console.log("Looking for Phone Number Text Box");
        await page.waitForSelector(phone);
        await cursor.move(phone);
        await page.focus(phone);
        await cursor.click();
        console.log("Phone Number Text Box Found");
        console.log("Asking for Phone Number");

        /////SMS-Activate;
        var phoneSMS_Activate ;
        if(OTPProvider == 'SMS-Activate')
        {
          //SMS-Activate
          console.log("Waiting for Phone Number");
          var status = false,attempt=0,Chance=5;
          while(!status && Chance>attempt)
          {
            phoneSMS_Activate = await SMS.GetNikeNumber()
            if(await phoneSMS_Activate.status == true)
            {
              status= true;
            }else{
              if(phoneSMS_Activate.data == "NO_NUMBERS" || phoneSMS_Activate.data == "NO_BALANCE")
              {
                console.log("Cannot Create more Account (No More Number / Out of Balance)");
                return {
                  status : false,
                  data : phoneSMS_Activate.data
                }
              }
              await delay(60000);
            }
          }
          if(await phoneSMS_Activate.status == false)
          {
            console.log("Phone Provider Problem");
            return {
              status : false
            }
          }
          console.log("Phone Number is Given");
          //
        }
        //
        // Rando_Delay = Math.floor(Math.random() * 100) + 50;
        // await page.type(AddNumber, phoneSMS_Activate.phone, { delay: Rando_Delay });

        console.log("Phone Number is Given : "+await phoneSMS_Activate.data.phone);
        console.log("Filling Phone Number");
        Rando_Delay = Math.floor(Math.random() * 100) + 50;
        // console.log("Phone")
        await page.type(phone,await phoneSMS_Activate.data.phone, { delay: Rando_Delay });
        console.log("Entered Phone Number");
        console.log("Looking for Send OTP Button");
        await page.waitForSelector(sendNum);
        await cursor.move(sendNum);
        await page.focus(sendNum);
        await cursor.click();
        console.log("Send OTP Button Found");
        console.log("Waiting For OTP");
        console.log("While Waiting For OTP, System is Looking for OTP TextBox");
        await page.waitForSelector(enterTheValue);
        console.log("OTP TextBox Found");
        await cursor.move(enterTheValue);
        await page.focus(enterTheValue);
        await cursor.click();

        var OTP;
        if(OTPProvider == 'SMS-Activate')
        {
           //SMS-Activate
          console.log("Still Waiting for OTP");
          var OTP;
          var status = false,attempt=0,Chance=5;
          while(!status && Chance>attempt)
          {
            attempt++;
            OTP = await SMS.GetNikeOTP(await phoneSMS_Activate.data.id);
            if(await OTP.status == true)
            {
              status= true;
            }else{
              if(OTP.data == "STATUS_WAIT_CODE")
              {
                console.log("Waiting For Code ("+attempt+") Minute")
                await delay(60000);
              }
            }
          }
          if(await OTP.status == false)
          {
            console.log("OTP Verification Problem");
            console.log("Number "+await phoneSMS_Activate.data.phone +" is Cancelled");
            var deleteNum = await SMS.CancelOTP(await phoneSMS_Activate.data.id);
            if(deleteNum)
            {
              return {
                status : false
              }
            }
          }else{

            console.log("OTP is given : "+await OTP.data);
          }
          //
        }
        console.log("Filling OTP");
        Rando_Delay = Math.floor(Math.random() * 100) + 50;
        await page.type(enterTheValue,await OTP.data, { delay: Rando_Delay });

        console.log("Looking for Agree Button");
        await page.waitForSelector(AgreeButtonOTP);//need to be respecify
        await cursor.move(AgreeButtonOTP);
        await page.focus(AgreeButtonOTP);
        await cursor.click();
        console.log("it is agreed");
        console.log("Looking for Accept Button");
        await page.waitForSelector(storedSubmit);
        console.log("giving 20 second time to manualy check")
        await sleep(20000);
        await cursor.move(storedSubmit);
        await page.focus(storedSubmit);
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
        var [jsCoverage, cssCoverage] = await Promise.all([
          page.coverage.stopJSCoverage(),
          page.coverage.stopCSSCoverage(),
        ]);
        let totalBytes = 0;
        let usedBytes = 0;
        var coverage = [...jsCoverage, ...cssCoverage];
        for (var entry of coverage) {
          totalBytes += entry.text.length;
          for (var range of entry.ranges) usedBytes += range.end - range.start - 1;
        }
        console.log(`Bytes used: ${usedBytes} Total Bytes used: ${totalBytes} Percentage : ${(usedBytes / totalBytes) * 100}%`);
        var json = {
          status : true,
          Email : await emailVal,
          Pass : await passwordVal,
          Region : await (await Region.GetRegion()).Region_Code,
          Phone : await phoneSMS_Activate.data.original_phone
        }
        console.log(JSON.stringify(json));
        return json;
      
    }catch(err)
    {
      var [jsCoverage, cssCoverage] = await Promise.all([
        page.coverage.stopJSCoverage(),
        page.coverage.stopCSSCoverage(),
      ]);
      let totalBytes = 0;
      let usedBytes = 0;
      var coverage = [...jsCoverage, ...cssCoverage];
      for (var entry of coverage) {
        totalBytes += entry.text.length;
        for (var range of entry.ranges) usedBytes += range.end - range.start - 1;
      }
      console.log(`Until Error - Bytes used: ${usedBytes} Total Bytes used: ${totalBytes} Percentage : ${(usedBytes / totalBytes) * 100}%`);

      console.error("Create Account Error Log : "+err);
      var statsReturn;
      if(err.toString().includes("TimeoutError"))
      {
        console.log("Yo Internet too slow / cannot find button");
        statsReturn = "TimeoutError";
      }
      return {
        status : false,
        data : statsReturn
      }
    }     
};


