var RunBot = require('./Internal/StartPanel');
// const { log } = require('console');
var Region = require('./Internal/RegionManager');
var SMS_Activate = require('./Internal/SMS_Activate');
var readlineSync = require('readline-sync');
var fs = require('fs');
var startTime, endTime;
var Discord = require('./Internal/DiscordAPI.js')
function start() {
  startTime = new Date();
};

function end() {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  console.log("Time Wasted : "+seconds + " seconds");
}
(async() =>
{
    // var API_Key = readlineSync.question('SMS-Activate API Key : ');

    var ProxyLocation =  "Setting.txt";
    
    try{
        SettingLocation = await Setting(ProxyLocation);
    }catch(error)
    {
        console.log("Setting Location Log : "+error);
        console.log("Setting.txt is not found");
        var SettingLocation = readlineSync.question('Setting File Location? : ');
        if(SettingLocation == null)
        {
            console.log("Setting Must be registered");
            process.exit();
        }else{
            console.log(SettingLocation);
            SettingLocation = await Setting(await SettingLocation,false);
        }
    }

    if(await SettingLocation.ProxyLocation!= null)
    {
        try{

            ProxyLocation = await Proxy(await SettingLocation.ProxyLocation);
        }catch(err)
        {
            console.log("System can't find it , Please Input Manually");
            ProxyLocation = readlineSync.question('Setting Proxy Location? (if using localhost, just skip it) : ');
            console.log("Location Result : "+await ProxyLocation);
            if(ProxyLocation.includes(".txt"))
            {
                ProxyLocation = await Proxy(await ProxyLocation);
            }else{
                ProxyLocation = null
            }
        }
    }else{
        ProxyLocation = null
    }

    if(await SettingLocation.SMS_Activate_API == null)
    {
        console.log("Must Have Phone Number API Key");
        process.exit();
    }else{
        var result = await Region.SetRegion(await SettingLocation.RegionCode);
        // console.log("Test Region : "+JSON.stringify(await Region.GetRegion()))
        result = await Region.GetRegion();
        await SMS_Activate.SetSMSActivate(await SettingLocation.SMS_Activate_API, await result.SmsActivate_Region_Code);
        // console.log("Test Number : "+JSON.stringify(SMS_Activate.GetNikeNumber()));
        // console.log("Test GetSMSActivate : "+JSON.stringify(await SMS_Activate.GetSMSActivate()));
        var SMS_Activate_Balance = (await (await SMS_Activate.GetBalance()).data);
        console.log("SMS-Activate Balance : "+await SMS_Activate_Balance);
        // var SMS_Activate_Phone_Count = await SMS_Activate.CountNikePhoneNumber();
        var SMS_Activate_Phone_Count = await (await SMS_Activate.CountNikePhoneNumber()).data;
        // console.log("SMS_Activate_Phone_Count : " +await SMS_Activate_Phone_Count.count);

        console.log("SMS-Activate Nike ( "+await SettingLocation.RegionCode+" ) Phone Count : "+await SMS_Activate_Phone_Count.count+" - Cost : "+await SMS_Activate_Phone_Count.cost);
        var Approx = Math.floor(await SMS_Activate_Balance/await SMS_Activate_Phone_Count.cost);
        console.log("Can Create Approximately "+Approx+' Account');

        if(await SMS_Activate_Phone_Count.count<=0 || Approx<=0)
        {
            console.log("No Account can be created");
            process.exit();
        }
    }
    if(await SettingLocation.DiscordWebhook_Link != null)
    {
        Discord.registerDiscordWebhook(await SettingLocation.DiscordWebhook_Link);
    }

    var TotalAccGen = readlineSync.question('Total Acc Gen : ');
    try{
        var CustomPassword = readlineSync.question('Input Custom Password (if there is any) : ');
        if(CustomPassword.length < 8)
        {
            CustomPassword = "DefaultP@ssw0rd";
            console.log("Using Default Pass : "+CustomPassword);
        }
    }catch(err)
    {
        console.log("Password Error Log : "+err);
        process.exit();
    }
    var TotalAttempt = readlineSync.question('Total Attempt : ');
    console.log("Target Acc Gen : "+TotalAccGen+" - Password : "+CustomPassword+" - TotalAttemptGiven : "+TotalAttempt);
    var attempt=0;acc_gen=0,errorcount=0,attempt=0,proxy_run=null,BrowserCount=1;

    if(ProxyLocation != null)
    {
        console.log("Proxy Count : "+ ProxyLocation.length);
    }
    start();
    while(TotalAccGen>acc_gen && TotalAttempt>attempt)
    {
        try{
            attempt++;
            console.log("Status : \n Total Acc Gen/Target Acc Gen/Attempt : "+await acc_gen+"/"+TotalAccGen+"/"+attempt);
            if(ProxyLocation!=null)
            {
                proxy_run = ProxyLocation[attempt%ProxyLocation.length];
                console.log(proxy_run);
            }
            console.log("Running Acc Gen");
            
            await Region.GetRegion();
            var result = await RunBot.Run(BrowserCount,120000,proxy_run,CustomPassword);
            if(result.status)
            {
                acc_gen++;
            }else {
                if(await result.data == "NO_NUMBERS" || await result.data == "NO_BALANCE")
                {
                    break;
                }else{
                    errorcount++;
                }
            }
        }catch(err)
        {
            console.log("RunHere Error Log : "+ err);
            errorcount++;
        }
    }

        console.log("Final Status : \n Total Acc Gen/Target Acc Gen : "+await acc_gen+"/"+TotalAccGen);
        console.log("Final Status : \n Total Acc Gen/Attempt : "+await acc_gen+"/"+attempt+" Percentage : "+((acc_gen/attempt)*100));
        console.log("Final Status : \n Total Error/Attempt : "+await errorcount+"/"+attempt+" Percentage : "+((errorcount/attempt)*100));
    process.on('SIGINT', async() =>{
        console.log("Final Status : \n Total Acc Gen/Target Acc Gen : "+await acc_gen+"/"+TotalAccGen);
        console.log("Final Status : \n Total Acc Gen/Attempt : "+await acc_gen+"/"+attempt+" Percentage : "+((acc_gen/attempt)*100));
        console.log("Final Status : \n Total Error/Attempt : "+await errorcount+"/"+attempt+" Percentage : "+((errorcount/attempt)*100));
    });
    end();
    process.exit();
})();
async function Proxy(Location)
{
    // Location = Location.trim();
    // console.log(Location);
    var Proxy = fs.readFileSync(Location, 'utf-8');
//   var Proxy = JSON.parse(Proxy);
    i=0;
    var Array = Proxy.split("\n")
    console.log("Proxy Count : "+Array.length);
    return Array;
}
async function Setting(Location,isfound = true)
{
    // Location = Location.trim();
    // if(!Location || Location[0] == 'undefined') return;


        var Proxy = fs.readFileSync(await Location, 'utf-8');
    
    var ProxyLocation = null;
    var SMS_Activate_API = null;
    var RegionCode = null;
    var DiscordWebhook_Link = null
//   var Proxy = JSON.parse(Proxy);
    i=0;
    var Array = await Proxy.split("\n")
    for(var i =0;i<await Array.length;i++)
    {
        // console.log(Array[i]);
        if(await Array[i].includes("Proxy_Location"))
        {
            ProxyLocation = await Array[i].split("=")
            ProxyLocation = await ProxyLocation[1];
            console.log("ProxyLocation = " +ProxyLocation);
            // ProxyLocation = await ProxyLocation.replace('"','');
            // console.log(ProxyLocation);
            ProxyLocation = ProxyLocation.trim();
        }else if(await Array[i].includes("SMS_Activate_API"))
        {
            SMS_Activate_API = await Array[i].split("=")
            SMS_Activate_API = await SMS_Activate_API[1];
            console.log("SMS_API = " +SMS_Activate_API);
            // SMS_API = await SMS_API.replace('"','');
            SMS_Activate_API = SMS_Activate_API.trim();
        }else if(await Array[i].includes("Region"))
        {
            RegionCode = await Array[i].split("=")
            RegionCode = await RegionCode[1];
            console.log("RegionCode = " +RegionCode);
            // RegionCode = await RegionCode.replace('"','');
            RegionCode = RegionCode.trim();
        }else if(await Array[i].includes("DiscordWebhook_Link"))
        {
            DiscordWebhook_Link = await Array[i].split("=")
            DiscordWebhook_Link = await DiscordWebhook_Link[1];
            console.log("DiscordWebhook_Link = " +DiscordWebhook_Link);
            // DiscordWebhook_Link = await DiscordWebhook_Link.replace('"','');
            DiscordWebhook_Link = DiscordWebhook_Link.trim();
        }
    }
    return {
        ProxyLocation : await ProxyLocation,
        SMS_Activate_API : await SMS_Activate_API,
        RegionCode : await RegionCode,
        DiscordWebhook_Link : await DiscordWebhook_Link
    }
}
