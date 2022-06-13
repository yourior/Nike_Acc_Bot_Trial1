const puppeteer = require('puppeteer-extra');
const randomUseragent = require('random-useragent');
const { createCursor } = require ("ghost-cursor");
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
var readlineSync = require('readline-sync');
const DM = require('./DeviceManager');
// const request = require('request');
puppeteer.use(StealthPlugin());
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker')
puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const {Create }= require('./Bot');
exports.Browser = async (count,Module,Chrome,BrowserTimeOut=120000,proxyUrl=null,proxyUser=null,proxyPass=null,emailVal,passwordVal,fNameVal=null,sNameVal=null,bDayVal=null,
    GenderVal=null) => {

  attempt=0;
  var browser;
  
  attempt++;
  isSuccess=false;
  var page;
  var isbrowserFinished = false;
  // var browserLoading;
  
      try{
        if(await proxyUrl != null)
        {
          console.log("Proxy used : "+await proxyUrl+":"+await proxyUser+":"+await proxyPass);
              // const page = await browser.newPage();
          browser = await puppeteer.launch({
            // userDataDir: './Log/Temp_Cache.txt',
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
                '--ignore-certificate-errors',
                '--ignore-certificate-errors-spki-list',
                // '--disable-dev-shm-usage',
                // '--disable-infobars',
                '--lang=en-US,en',
                '--window-size=1920x1080',
                // '--disable-extensions',
                // '--disable-blink-features=AutomationControlled',
                '--proxy-server=http://'+await proxyUrl
              ], 
              headless: false, 
              // slowMo: 150,
              
                executablePath: Chrome ,
              
              // devtools: true
            });
          
          if((await browser.pages())[count] == null)
          {
            console.log("Generating Browser");
            page = await browser.newPage();
          }else{
            console.log("Reuse Old Browser");
            page= (await browser.pages())[count]
          }
          cursor = createCursor(page);
      
          if(proxyUser != null &&proxyPass != null){
            console.log("authenticating User : "+await proxyUser+" - Pass : "+await proxyPass);
            await page.authenticate({ 
              username: await proxyUser, 
              password: await proxyPass 
            });
          }
        }else{
          console.log("Proxy used : LocalHost");
          browser = await puppeteer.launch(
            { 
                // devtools: true,
                // userDataDir: './Log/Temp_Cache.txt',
                executablePath: Chrome,
                args: [
                  '--use-gl=egl',
                  '--no-sandbox',
                  '--disable-setuid-sandbox',
                  // '--disable-accelerated-2d-canvas',
                  // '--no-zygote',
                  // '--renderer-process-limit=1',
                  // '--no-first-run',
                  '--ignore-certificate-errors',
                  '--ignore-certificate-errors-spki-list',
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
          if((await browser.pages())[count] == null)
          {
            console.log("Generating Browser");
            page = await browser.newPage();
          }else{
            console.log("Reuse Old Browser");
            page= (await browser.pages())[count]
          }
          proxyUrl = "LocalHost"
        }
        // resolve(await browser);
      }catch(e)
      {
        console.log("Browser Error Log : "+await e);
        // var checker = false;
        // do{
        //   var ChromeLocation = readlineSync.question('ChromeFile is not found \n'+
        //    'Please Input the correct location : ');
        //   if(ChromeLocation == null)
        //   {
        //     console.log('ChromeFile is cannot be null \n');
        //   }else{
        //     checker = true;
        //     Chrome = await DM.SetChromeFile(ChromeLocation);
        //   }
        // }while(!checker)
        // reject(e);
      }
  //set User Agent - Random
  console.log("Set User Agent");
  var userAgent = await randomUseragent.getRandom(); 
  await page.setUserAgent(
    userAgent
    // randomUseragent.getRandom() 
    // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36'
  );
  ///////////////////////
  await Promise.all([
    await page.coverage.startJSCoverage(),
    await page.coverage.startCSSCoverage(),
  ]);

  console.log("Proxy Used : "+await proxyUrl);

  try {
    // await await page.setRequestInterception(true);
    // await page.on('request', request => {
    //   if (request.resourceType() === 'image') request.abort();
    //   else request.continue();
    // });
    await page.setDefaultNavigationTimeout(BrowserTimeOut);
    cursor = createCursor(page);
    // task
    var task ;
    if(Module == "Create Account")
    {
      task = await Create(page,cursor,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,GenderVal);
      if(task.status == true)
        {
          var Success_bytes=null;
          if(await task.Success_bytes != null && await task.Total_Success_bytes != null)
          {
            Success_bytes = await task.Success_bytes+":"+await task.Success_bytes;
            console.log(Success_bytes);
          }
          console.log(Failed_bytes);
          browser.close();
          var json = {
            status : true,
            Email : await task.Email,
            Pass : await task.Pass,
            Region : await task.Region,
            Phone : await task.Phone,
            OTP : await task.OTP,
            Proxy : await proxyUrl,
            Success_bytes : Success_bytes
          }

          console.log(JSON.stringify(json));
          return json;

        }else if(task.status == false){
          console.log("Closing browser");
          browser.close();
          var Failed_bytes = null;
          if(await task.Failed_bytes != null && await task.Total_Failed_bytes != null)
          {
            Failed_bytes = await task.Failed_bytes+":"+await task.Total_Failed_bytes;
            console.log(Failed_bytes);
          }
          if(await task.data == "TimeoutError")
          {
            
            // browser.close();
            return {
              status : false,
              Failed_bytes : await Failed_bytes
            }
              //replay
          }else if(task.data == "NO_NUMBERS" || task.data == "NO_BALANCE"){
            // browser.close();
            return {
              status : false,
              data : await task.data,
              Failed_bytes : await Failed_bytes
            }
          }else{
            // browser.close();
            return {
              status : false,
              Failed_bytes : await Failed_bytes
            }
          }
        }
    }else if(Module == "Reverify_Phone")
    {
        task = "Reverify Phone Number";
        // if(await task.status == true)
        // {
        //   browser.close();
        //   return {
        //       Email : await task.Email,
        //       Pass : await task.Pass
        //   }
        // }else if(await task.status == false){
        //   if(await task.data == "TimeoutError")
        //   {
        //     console.log("Closing browser");
        //     browser.close();
        //       //replay
        //   }
        }
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
    console.log(`Until Error Browser - Bytes used: ${usedBytes} Total Bytes used: ${totalBytes} Percentage : ${(usedBytes / totalBytes) * 100}%`);

    console.error("Browser Error Log : "+err);
    console.log("Closing browser");
    browser.close();
    return {
      status : false,
      Failed_bytes : await usedBytes+":"+await totalBytes
    }
  }
}
