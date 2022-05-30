var Browser = require('./BrowserProcess');
var Discord = require('./DiscordAPI');
var BDate_Gen = require('dates-generator');
const { Cluster } = require('puppeteer-cluster');
var fs = require('fs').promises;
// var nameGenerator = require('unique-names-generator');
var ProfileGenerator = require('random-profile-generator');
var EmailDomain = '@gmail.com';
var emailVal = 'TesterEmail' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@gmail.com';

// var OTP_API = '88862e0e304d3e6dce193d1771ffb5A5';
var OTP_Region_Code = '10';
var passwordVal = 'Alkaline@tester123';
var fNameVal ;
var sNameVal ;
var bDayVal = '01/05/19'+(Math.floor((Math.random() * (99-55)) + 55)).toString(); //Replace with your birthday if you wish.
// var proxyUrl = "193.239.196.252:6112:XRzuBniNmo:LHy19njEuy"; //if proxy exists enter it in format IP:PORT, if not leave blank
var proxyUrl = null;
var proxyUser = null; //If proxy username/pass exists insert it here if not leave both variables blank
var proxyPass = null;
var GenderVal = null;
// var BrowserTimeOut = 120000;

var RegionVal='Vietnam';
var NikeWeb = 'https://www.nike.com/';
var Chrome_Ubuntu = '/usr/bin/google-chrome';
var Chrome_Windows = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
// var DiscordWebhook_Link = 'https://discord.com/api/webhooks/952973421443153960/_Vl9DMoaUo51C4zPRzyHMx-IKW17VIcGrVSt4CATnS7rEuv9Idp7Q9KTK_T_hgZK-pEX';
exports.Cluster = async(maxConcurrency)=>
{
  // Create a cluster with 2 workers
    const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: maxConcurrency,
    });

    // Define a task (in this case: screenshot of page)
    await cluster.task(async ({ page, data: url }) => {
        await page.goto(url);

        const path = url.replace(/[^a-zA-Z]/g, '_') + '.png';
        await page.screenshot({ path });
        console.log(`Screenshot of ${url} saved: ${path}`);
    });

    // Add some pages to queue
    cluster.queue('https://www.google.com');
    cluster.queue('https://www.wikipedia.org');
    cluster.queue('https://github.com/');

    // Shutdown after everything is done
    await cluster.idle();
    await cluster.close();

}
exports.Run = async (browserCount,BrowserTimeOut= 120000,proxyUrl,CustomPass = null) =>
{
  console.log("Start Panel Proxy : "+await proxyUrl);
  if(CustomPass != null)
  {
    passwordVal = CustomPass;
  }
    try{
  
      // Discord.registerDiscordWebhook(DiscordWebhook_Link);
      var presentDay = new Date();
      // console.log();
      var year = Math.floor((Math.random()*(presentDay.getFullYear() - 16 - (presentDay.getFullYear()-80 ))) + (presentDay.getFullYear()-80 ));
      var month = Math.floor((Math.random() * 12 )+ 1);
      var day = Math.floor((Math.random() * BDate_Gen.daysInMonth( year,  month) )+ 1);
      bDayVal = month+'/'+day+"/"+year;
      
      // var nameGenerate= (nameGenerator.Config = {
      //   dictionaries: [nameGenerator.names]
      // })
        //Generate random Names
        var rando = Math.random() * 1;
        var profile;
        if(rando == 0)
        {
          profile = ProfileGenerator.profile('female');
          GenderVal = "f";
        }else{
    
          profile = ProfileGenerator.profile('male');
          GenderVal = "m";
        }
        fNameVal =  profile.firstName;
        sNameVal =  profile.lastName;
    
        emailVal = fNameVal+sNameVal+'.'+(Math.floor((Math.random() * 9000) + 1000)).toString()+EmailDomain;
    
        /// Need Bday generator
        if(proxyUrl!=null)
        {
          var Proxy_Array = proxyUrl.split(":");
          proxyUrl = Proxy_Array[0]+":"+Proxy_Array[1];
          proxyUser = Proxy_Array[2];
          proxyPass = Proxy_Array[3];
          console.log("ProxyURL = "+proxyUrl);
          console.log("ProxyName = "+proxyUser);
          console.log("proxyPass = "+proxyPass);
        }
  
          var create = await Browser.Browser(browserCount-1,"Create Account",Chrome_Windows,BrowserTimeOut,proxyUrl,proxyUser,proxyPass,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,
              GenderVal,OTPProvider='SMS-Activate');
          console.log("Test Log : "+JSON.stringify(create));
          if(create.status == true)
          {
          
            console.log("Account Created");
            SaveData(await create.Email,await create.Pass,await create.Phone,await create.OTP ,await create.Region,await create.Proxy);
            return { status: true};
          
          }else if(await create.status == false){

            return { status: false, data : await create.data};
          }
          CountData(await create.Success_bytes,await create.Failed_bytes);
          //save to .txt file
        

    }catch(err)
    {
      console.error("StartPanel Error Log : "+err);
      return false;
    }
    // process.on('exit',() => {

    //   CountData(null,Failed_bytes);
    // });
}
async function SaveData(Email,Pass,OriginalPhone,OTP,Region,Proxy)
{
  var isSuccess=false;
  var LoginData = (Email + ":" + Pass);
  try{
    let date_ob = new Date();
    // var LoginData = await Email.concat(":", await Pass);
    
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);  
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();

    if(await OriginalPhone != null && await OTP != null && await LoginData != null)
    {
      isSuccess = true;
      console.log("Create Account Successful");
      Discord.DiscordWebhook(await Proxy,await Email,await Pass,await Region,await OriginalPhone,await OTP);
              
      fs.appendFile('Accounts_'+date+'_'+month+'_'+year+'.txt', '\n'+LoginData, (err) => {  
        if (err) throw err;
          console.log('Added User/Pass To Accounts.txt!');
        }
      );
    }else{
      isSuccess = false;
      console.log("Create Account Failed");
    }
  }catch(err){
    if(isSuccess)
    {
      console.log("While Error : "+LoginData+" Account Successfully Created");
    }
    console.log("SaveData Error Log : "+err);
  }
}
async function CountData(Success_bytes,Failed_bytes)
{
  try{
    var Success_Text = null,Failed_Text = null;
    let date_ob = new Date();
    // var LoginData = await Email.concat(":", await Pass);
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);
  
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
    // current year
    let year = date_ob.getFullYear();
    if(Success_bytes!= null)
    {
      Success_Text = "\nSuccess bytes: "+await Success_bytes;
    }
    if(Failed_bytes != null)
    {
      Failed_Text = "\nFailed bytes: "+await Failed_bytes;
    }
    var Combined_Text = Success_Text + Failed_Text;
    console.log("Saving Counted Data");
        // Discord.DiscordWebhook(await Proxy,await Email,await Pass,await Region,await OriginalPhone,await OTP);     
    fs.appendFile('Data_Used_'+date+'_'+month+'_'+year+'.txt', Combined_Text, (err) => {  
      if (err) throw err;
        console.log('Added data used To Data_Used.txt!');
    });

  }catch(err)
  {
    console.log("CountData Error Log : "+err);
  }
}