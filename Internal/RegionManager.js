exports.getRegion = async(code) =>
{
    var json;
    switch(code)
    {
        case "vn":
            json = {
                SmsActivate_Region_Code : 10,
                NikeWeb_Locaion : '#gen-nav-footer > nav > div > div > div:nth-child(3) > div > a:nth-child(16)'
            }
            console.log("Region Picked Vietnam");
            break;
        case "my":
            json = {
                SmsActivate_Region_Code : 7,
                NikeWeb_Locaion : '#gen-nav-footer > nav > div > div > div:nth-child(3) > div > a:nth-child(9)'
            }
            console.log("Region Picked Malaysia");
            break;
        default:
            return false;

    }
    return await json ;
} 