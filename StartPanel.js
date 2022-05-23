const Browser = require('./BrowserProcess');
const nameGenerator = require('unique-names-generator');
const SMS_Activate = require('./SMS_Activate');
var EmailDomain = '@gmail.com';
var emailVal = 'TesterEmail' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@gmail.com';
var smsEmail = 'ENTER GETSMSCODE.COM EMAIL ADDRESS';
var token = 'ENTER GETSMSCODE API TOKEN';
var OTP_API = '88862e0e304d3e6dce193d1771ffb5A5';
var passwordVal = 'Alkaline@tester123';
var fNameVal = 'BAKAYAROU';
var sNameVal = 'BAKA';
var bDayVal = '01/05/19'+(Math.floor((Math.random() * (99-55)) + 55)).toString(); //Replace with your birthday if you wish.
var proxyUrl = null; //if proxy exists enter it in format IP:PORT, if not leave blank
var proxyUser = null; //If proxy username/pass exists insert it here if not leave both variables blank
var proxyPass = null;
var GenderVal = 'm';
var info;
var themessage;
var phoneNum;
var userpass;
var RegionVal='Vietnam';
var NikeWeb = 'https://www.nike.com/';
var Chrome_Ubuntu = '/usr/bin/google-chrome';
var Chrome_Windows = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
(async() =>
{
  var nameGenerate= (nameGenerator.Config = {
    dictionaries: [nameGenerator.names]
  })
    //Generate random Names
    fNameVal =   nameGenerate.dictionaries[0][Math.floor(Math.random() * nameGenerate.dictionaries[0].length)];
    sNameVal =  nameGenerate.dictionaries[0][Math.floor(Math.random() * nameGenerate.dictionaries[0].length)];

    emailVal = fNameVal+sNameVal+'.'+(Math.floor((Math.random() * 9000) + 1000)).toString()+EmailDomain;
    //////
    // var SMS_Activate_Balance = (await (await SMS_Activate.GetBalance(OTP_API)).data).replace('ACCESS_BALANCE:', '');
    var SMS_Activate_Balance = (await (await SMS_Activate.GetBalance(OTP_API)).data);
    var SMS_Activate_Phone_Count = await (await SMS_Activate.CountNikePhoneNumber(OTP_API,10)).data;
    console.log("SMS-Activate Balance : "+SMS_Activate_Balance);
    console.log("SMS-Activate Nike Vietnam Phone Count : "+SMS_Activate_Phone_Count);
    console.log("Email : "+emailVal+"\nfname : "+fNameVal+"\nsname : "+sNameVal);

    if(SMS_Activate_Phone_Count==0)
    {
      console.log("not enough phone number on the region");
    }else{

      // console.log("SMS-Activate Balance + Cashback : "+await SMS_Activate.GetBalanceAndCashBack());
      // await Browser.Browser("Create Account",Chrome_Windows,5,proxyUrl,proxyUser,proxyPass,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,
      //     GenderVal,OTPProvider='SMS-Activate',OTP_API);
    }
        
})();