
var json;
exports.SetRegion = async(code) =>
{
    // var json;
    switch(code)
    {
        case "vn":
            this.json = {
                SmsActivate_Region_Code : 10,
                NikeWeb_Location : '#gen-nav-footer > nav > div > div > div:nth-child(3) > div > a:nth-child(16)',
                Phone_Prefix_Length : 2
            }
            console.log("Region Picked Vietnam");
            break;
        case "my":
            this.json = {
                SmsActivate_Region_Code : 7,
                NikeWeb_Location : '#gen-nav-footer > nav > div > div > div:nth-child(3) > div > a:nth-child(9)',
                Phone_Prefix_Length : 2
            }
            console.log("Region Picked Malaysia");
            break;
        default:
            return false;

    }
    return await json ;
} 
exports.GetRegion = async() =>
{
    return await this.json;
}
