const axios = require("axios");
(async () => {
    try{
        const host = "https://www.nike.com/vn";
        
        //console.log("body : "+JSON.stringify(Bodytemplate(data)));
        var resu = await axios(
            {
                url:host,
                method:'get',
                timeout:20000,
                withCredentials: true,
                // headers : {
                //     access_token : OAkey 
                // },
                // data:Bodytemplate(data)
            }
        );
        try{
            var stringi2 = await resu;
            // var countstringy = Object.keys( stringi2.data ).length;
            console.log("Cookies : \n"+stringi2);
        }catch(err)
        {
            console.error(err)
            return false
        }
    // console.log("result : "+JSON.stringify(resu.data));
        // return {
        //     value:stringi2,
        //     count:countstringy
        // }
    }catch(err)
    {
        console.error("error : "+err);
        return (false);
    }
})