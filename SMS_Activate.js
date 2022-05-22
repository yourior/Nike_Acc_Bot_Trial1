var axios = require('axios');
exports.GetBalance = async(api_key) =>
{
    // const host = "https://api.sms-activate.org/stubs/handler_api.php";
    return await axios(
        {
            url:'https://api.sms-activate.org/stubs/handler_api.php?api_key='+api_key+'&action=getBalance',
            method:'get',
            timeout:10000,
            
        }
    ).then(
        async () =>{
            var result = await resu.data;
            if(result.ACCESS_BALANCE != null)
            {
                return {
                    status : true,
                    data : await result.ACCESS_BALANCE
                } ;
            }else if(result == "BAD_KEY")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : result
                } ;
            }else if(result == "ERROR_SQL ")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : result
                } ;
            }
        }
    ).catch(err)
    (
        async () =>
        {
            console.error("GetBalance error : "+err);
            return {
                status : true
            };
        }   
    )
}
exports.GetBalanceAndCashBack = async(api_key) =>
{
    // const host = "https://api.sms-activate.org/stubs/handler_api.php";
    return await axios(
        {
            url:'https://api.sms-activate.org/stubs/handler_api.php?api_key='+api_key+'&action=getBalanceAndCashBack',
            method:'get',
            timeout:10000,
        }
    ).then(
        async () =>{
            var result = await resu.data;
            if(result.ACCESS_BALANCE != null)
            {
                return {
                    status : true,
                    data : await result.ACCESS_BALANCE
                } ;
            }else if(result == "BAD_KEY")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : result
                } ;
            }else if(result == "ERROR_SQL ")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : result
                } ;
            }
        }
    ).catch(err)
    (
        async () =>
        {
            console.error("GetBalance error : "+err);
            return {
                status : true
            };
        }   
    )
}