const Browser = require('./BrowserProcess');

var emailVal = 'TesterEmail' + '.' + (Math.floor((Math.random() * 9000) + 1000)).toString() + '@nguyenluck.com';
var smsEmail = 'ENTER GETSMSCODE.COM EMAIL ADDRESS';
var token = 'ENTER GETSMSCODE API TOKEN';
var OTP_API = null
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
    await Browser.Browser("Create Account",Chrome,5,proxyUrl,proxyUser,proxyPass,emailVal,passwordVal,fNameVal,sNameVal,bDayVal,
        GenderVal,OTPProvider='SMS-Activate',OTP_API);
        
})();