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
        async function (response) {
            var data = JSON.stringify(await response.data);
            if(data.includes("ACCESS_BALANCE"))
            {
                var array = data.split(':');

                return {
                    status : true,
                    data : array[1].replace('"', '')
                }
            }else if(data == "BAD_KEY")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : data
                } ;
            }else if(data == "ERROR_SQL")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : data
                } ;
            }else{
                // console.log(data);
                return {
                    status : true,
                    data : data
                }
            }
        }
    ).catch(function (error) {
        async () =>
        {
            console.error("GetBalance error : "+await error);
            return {
                status : false,
                data : "Error"
            };
        }  
    });
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
        async function (response) {
            var data = JSON.stringify(await response.data);
            if(data.includes("ACCESS_BALANCE"))
            {
                var array = data.split(':');

                return {
                    status : true,
                    data : array[1].replace('"', '')
                }
            }else if(data == "BAD_KEY")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : data
                } ;
            }else if(data == "ERROR_SQL")
            {
                console.log("Bad API Key")
                return {
                    status : false,
                    data : data
                } ;
            }else{
                // console.log(data);
                return {
                    status : true,
                    data : data
                }
            }
        }
    ).catch(function (error) {
        async () =>
        {
            console.error("GetBalance error : "+error);
            return {
                status : false,
                data : "Error"
            };
        }   
    });
}
exports.CountNikePhoneNumber = async(api_key,country_code) =>
{
    var config = {
        method: 'get',
        url: 'https://api.sms-activate.org/stubs/handler_api.php?api_key='+await api_key+'&action=getPrices&service=ew&country='+await country_code,
        headers: { }
      };
      
      return await axios(config)
      .then(async function (response) {
          var data = await response.data[10].ew;
        //   console.log(data[10]);
        return {
            status : true,
            data : 
            {
                cost : await data.cost,
                count : await data.count
            }
        }
      })
      .catch(function (error) {
        async () =>
        {
            console.error("CountNikePhoneNumber error : "+await error);
            return {
                status : false,
                data : "Error"
            };
        } 
      });
}
exports.GetNikeNumber = async(api_key,country_code) =>
{
    var config = {
        method: 'get',
        url: 'https://sms-activate.org/stubs/handler_api.php?api_key='+api_key+'&action=getNumber&service=ew&country='+country_code,
        headers: { }
      };
      
      axios(config)
      .then(async function (response) {
        var data = (JSON.stringify(response.data));
        if(data.includes("ACCESS_NUMBER"))
        {
            var array = data.split(':');
            for(var i; i<data.length;i++)
            {
                array[i] = array[i].replace('"','');
            }
            return {
                status : true,
                data : {
                    id : array[1],
                    phone : array[2]
                }
            }
        }else if(data == "NO_NUMBERS")
        {
            return {
                status : false,
                data : data
            }
        }else if(data == "NO_BALANCE")
        {
            return {
                status : false,
                data : data
            }
        }else 
        {
            return {
                status : false,
                data : data
            }
        }
      })
      .catch(async function (error) {
        console.error("GetNikeNumber error : "+error);
        return {
            status : false,
            data : "Error"
        };
      });
}
exports.GetNikeOTP = async(api_key,id)=>
{
    var config = {
    method: 'get',
    url: 'https://api.sms-activate.org/stubs/handler_api.php?api_key='+await api_key+'&action=getStatus&id='+await id,
    headers: { }
    };

    return await axios(config)
    .then(async function (response) {
        // console.log(JSON.stringify(response.data));
        var data = JSON.stringify(await response.data);
        if(data.includes("ACCESS_NUMBER"))
        {
            var array = data.split(':');
            for(var i; i<data.length;i++)
            {
                array[i] = array[i].replace('"','');
            }
            return {
                status : true,
                data : array[1]
                
            }
        }else if(data.includes("STATUS_WAIT_CODE"))
        {
            console.log("Waiting for Code");
            return{
                status : false,
            }
        }else if(data.includes("STATUS_WAIT_RETRY"))
        {
            console.log("Retrying Code");
            return{
                status : false,
            }
        }
    })
    .catch(async function (error) {
        console.error("GetNikeOTP error : "+error);
        return {
            status : false,
            data : "Error"
        };
    });

}
exports.CancelOTP = async(api_key,id) =>
{
    var config = {
        method: 'get',
        url: 'https://api.sms-activate.org/stubs/handler_api.php?api_key='+await api_key+'&action=setStatus&status=8&id='+await id,
        headers: { }
      };
      
      return await axios(config)
      .then(async function (response) {
        var data = JSON.stringify(response.data);
        if(data == 'ACCESS_CANCEL ')
        {
            return{
                status : true
            };
        }
      })
      .catch(async function (error) {
        console.error("CancelOTP error : "+error);
            return {
                status : false,
                data : "Error"
            };
      });
}
