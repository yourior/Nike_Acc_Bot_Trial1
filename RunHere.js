var RunBot = require('./Internal/StartPanel');
var readlineSync = require('readline-sync');
(async() =>
{
    // var MultiTask = readlineSync.question('How Many Browser you want to run at the same time? : ');
    var TotalAccGen = readlineSync.question('Total Acc Gen : ');
    var CustomPassword = readlineSync.question('Input Custom Password (if there is any) : ');
    console.log(TotalAccGen+" "+CustomPassword);
    
    var acc_gen=0,errorcount=0;

    for(var i=0;i<TotalAccGen;i++)
    {
        var result = await RunBot.Run(0,CustomPassword);
        if(result)
        {
            total_acc_gen++;
        }else{
            errorcount++;
        }
    }
    

    console.log("Final Status : \n Total Acc Gen : "+await acc_gen+"/"+TotalAccGen+"\n Error Count : "+await errorcount);
    
})();