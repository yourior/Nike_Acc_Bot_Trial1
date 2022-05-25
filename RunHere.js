var RunBot = require('./Internal/StartPanel');

// const { log } = require('console');

var readlineSync = require('readline-sync');
var fs = require('fs');
var startTime, endTime;

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
    var ProxyLocation = readlineSync.question('Proxy File Location? (if using localhost, just skip it) : ');
    var TotalAccGen = readlineSync.question('Total Acc Gen : ');
    var CustomPassword = readlineSync.question('Input Custom Password (if there is any) : ');
    var TotalAttempt = readlineSync.question('Total Attempt : ');
    console.log(TotalAccGen+" "+CustomPassword+" "+TotalAttempt);

    if(ProxyLocation!= null)
    {
        console.log(ProxyLocation);
        ProxyLocation = await Proxy(ProxyLocation);
        
    }else{
        ProxyLocation = null
    }
    var attempt=0;acc_gen=0,errorcount=0,attempt=0,proxy_run=null,BrowserCount=1;

    // RunBot.Cluster(parseInt("TotalAccGen"));
    start();
    while(TotalAccGen>acc_gen && TotalAttempt>=attempt)
    {
        console.log("Proxy Count : "+ ProxyLocation.length);
        console.log("Final Status : \n Total Acc Gen/Target Acc Gen/Attempt : "+await acc_gen+"/"+TotalAccGen+"/"+attempt);
        if(ProxyLocation!=null)
        {
            proxy_run = ProxyLocation[attempt%ProxyLocation.length];
            console.log(proxy_run);
        }
        attempt++;
        console.log("Running Acc Gen");
        var result = await RunBot.Run(BrowserCount,proxy_run,CustomPassword);
        if(result)
        {
            acc_gen++;
        }else{
            errorcount++;
        }
    }

    // for(var i=0;i<TotalAccGen;i++)
    // {
    //     // var result = await RunBot.Run(0,CustomPassword);
    //     if(result)
    //     {
    //         total_acc_gen++;
    //     }else{
    //         errorcount++;
    //     }
    // }
    console.log("Final Status : \n Total Acc Gen/Target Acc Gen : "+await acc_gen+"/"+TotalAccGen);
    console.log("Final Status : \n Total Acc Gen/Attempt : "+await acc_gen+"/"+TotalAttempt+" Percentage : "+((acc_gen/TotalAttempt)*100));
    console.log("Final Status : \n Total Error/Attempt : "+await errorcount+"/"+TotalAttempt+" Percentage : "+((errorcount/TotalAttempt)*100));
    end();
})();
async function Proxy(Location)
{
    var Proxy = fs.readFileSync(Location, 'utf-8');
//   var Proxy = JSON.parse(Proxy);
    i=0;
    var Array = Proxy.split("\n")
    console.log("Proxy Count : "+Array.length);
    return Array;
}
