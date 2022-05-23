const puppeteer = require('puppeteer-extra');
const { createCursor } = require ("ghost-cursor");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// const request = require('request');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const {Create }= require('./Bot');
exports.Browser = async (Module,Chrome,Try,proxyUrl=null,proxyUser=null,proxyPass=null,emailVal,passwordVal,fNameVal=null,sNameVal=null,bDayVal=null,
    GenderVal=null,OTPProvider=null,OTP_API=null,OTP_Region_Code=null) => {
    // console.log("Generating Browser");
    // var Chrome = Chrome_Ubuntu;
    // var Chrome = Chrome_Windows;
    if(OTPProvider!=null && OTP_API== null && OTP_Region_Code==null)
    {
        console.log("OTP API is NULL");
        return false;
    }else if(OTPProvider==null)
    {
        OTP_API = null;
    }
    attempt=0;
    while(Try>attempt)
    {
      try {
        attempt++;
        isSuccess=false;
        // var page;
        if(proxyUrl != null)
        {
              // const page = await browser.newPage();
          browser = await puppeteer.launch({
              args: [
                '--use-gl=egl',
                // '--disable-web-security',
                // '--disable-features=IsolateOrigins',
                // '--disable-site-isolation-trials',
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--window-size=1280x720',
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
              executablePath: Chrome ,
              // devtools: true
            });
          
          if((await browser.pages())[0] == null)
          {
            console.log("Generating Browser");
            page = await browser.newPage();
          }else{
            console.log("Reuse Old Browser");
            page= (await browser.pages())[0]
          }
          cursor = createCursor(page);
  
          if(proxyUser != null &&proxyPass != null){
            console.log("authenticating proxy user/pass");
            await page.authenticate({ 
              username: proxyUser, 
              password: proxyPass 
            });
          }
        }else{
          browser = await puppeteer.launch(
            { 
                // devtools: true,
                executablePath: Chrome,
                args: [
                  '--use-gl=egl',
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
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
          // page = await browser.newPage();
          if((await browser.pages())[0] == null)
          {
            console.log("Generating Browser");
            page = await browser.newPage();
          }else{
            console.log("Reuse Old Browser");
            page= (await browser.pages())[0]
          }
          await page.setDefaultNavigationTimeout(120000);
          cursor = createCursor(page);
            // task
            var task ;
            if(Module == "Create Account")
            {
              task = await Create(page,cursor,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,GenderVal,OTPProvider,OTP_API,OTP_Region_Code);
            }else if(Module == "Reverify_Phone")
            {
                task = "Reverify Phone Number";
                if(await task.status == true)
                {
                  browser.close();
                  return {
                      Email : await task.Email,
                      Pass : await task.Pass
                  }
                }else if(await task.status == "TimeoutError"){
                  console.log("Closing browser");
                  browser.close();
                    //replay
                }
            }
        }
        }catch(err)
        {
          console.error("Browser Error Log : "+err);
          console.log("Closing browser");
          browser.close();
          process.exit();
        }
    }
}