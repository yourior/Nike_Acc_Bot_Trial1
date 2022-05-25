var Browser = require('./BrowserProcess');
var Discord = require('./DiscordAPI');
var BDate_Gen = require('dates-generator');
var fs = require('fs').promises;
// var nameGenerator = require('unique-names-generator');
var ProfileGenerator = require('random-profile-generator');
var SMS_Activate = require('../SMS_Activate');
var EmailDomain = '@gmail.com';
var emailVal = 'TesterEmail' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@gmail.com';

var OTP_API = '88862e0e304d3e6dce193d1771ffb5A5';
var OTP_Region_Code = '10';
var passwordVal = 'Alkaline@tester123';
var fNameVal ;
var sNameVal ;
var bDayVal = '01/05/19'+(Math.floor((Math.random() * (99-55)) + 55)).toString(); //Replace with your birthday if you wish.
// var proxyUrl = "193.239.196.252:6112:XRzuBniNmo:LHy19njEuy"; //if proxy exists enter it in format IP:PORT, if not leave blank
var proxyUrl = null;
var proxyUser = null; //If proxy username/pass exists insert it here if not leave both variables blank
var proxyPass = null;
var GenderVal = 'm';
var BrowserTimeOut = 120000;

var RegionVal='Vietnam';
var NikeWeb = 'https://www.nike.com/';
var Chrome_Ubuntu = '/usr/bin/google-chrome';
var Chrome_Windows = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
var DiscordWebhook_Link = 'https://discord.com/api/webhooks/952973421443153960/_Vl9DMoaUo51C4zPRzyHMx-IKW17VIcGrVSt4CATnS7rEuv9Idp7Q9KTK_T_hgZK-pEX';
exports.Run = async (browserCount=0,CustomPass = null) =>
{
  if(CustomPass != null)
  {
    passwordVal = CustomPass;
  }
  try{

    Discord.registerDiscordWebhook(DiscordWebhook_Link);
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
      //////
      // var SMS_Activate_Balance = (await (await SMS_Activate.GetBalance(OTP_API)).data).replace('ACCESS_BALANCE:', '');
      var SMS_Activate_Balance = (await (await SMS_Activate.GetBalance(OTP_API)).data);
      var SMS_Activate_Phone_Count = await (await SMS_Activate.CountNikePhoneNumber(OTP_API,OTP_Region_Code)).data;
      console.log("SMS-Activate Balance : "+SMS_Activate_Balance);
      console.log("SMS-Activate Nike Vietnam Phone Count : "+SMS_Activate_Phone_Count.count+" - Cost : "+SMS_Activate_Phone_Count.cost);
      console.log("Can Create Approximately "+Math.floor(SMS_Activate_Balance/SMS_Activate_Phone_Count.cost)+' Account');
      console.log("Email : "+emailVal+"\nfname : "+fNameVal+"\nsname : "+sNameVal);
      console.log("bDayVal (MM/DD/YYY): "+bDayVal);
      if(SMS_Activate_Phone_Count==0)
      {
        console.log("not enough phone number on the region");
      }else{
        // var Phone = await SMS_Activate.GetNikeNumber(OTP_API, OTP_Region_Code)
        //   console.log(JSON.stringify(Phone))
        // console.log("SMS-Activate Balance + Cashback : "+await SMS_Activate.GetBalanceAndCashBack());
        var create = await Browser.Browser(browserCount,"Create Account",Chrome_Windows,BrowserTimeOut,5,proxyUrl,proxyUser,proxyPass,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,
            GenderVal,OTPProvider='SMS-Activate',OTP_API,OTP_Region_Code);
        if(create.status == true)
        {
          console.log("Account Created");
          Discord.DiscordWebhook(await create.Proxy,await create.Email,await create.Pass,await create.Region,await create.Phone);
          
          var userpass = (emailVal + ":" + passwordVal);
          fs.appendFile('Accounts.txt', '\n'+userpass, (err) => {  
            if (err) throw err;
            console.log('Added User/Pass To Accounts.txt!');
          return true;
          });
        }else{
          return false;
        }
        //save to .txt file
      }
  }catch(err)
  {
    console.error("StartPanel Error Log : "+err);
  }
}
async function Proxy()
{
  var Proxy = await fs.readFile('../Proxy.txt');
  // var Proxy = JSON.parse(Proxy);
  await page.setCookie(...cookies);
}