let common = require("./utils/common")
let $ = new common.env("京东时间校对");
$.setOptions({
    headers: {
        'content-type': 'application/json',
        'user-agent': 'jdapp;iPhone;9.4.6;14.2;965af808880443e4c1306a54afdd5d5ae771de46;network/wifi;supportApplePay/0;hasUPPay/0;hasOCPay/0;model/iPhone8,4;addressid/;supportBestPay/0;appBuild/167618;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'referer': 'https://happy.m.jd.com',
    }
});
(async () => {
    let dog = 0; //1 测试狗狗,0 测试京东
    var t0 = new Date().getTime();
    if (dog) {
        console.log("狗狗")
        await $.curl({
            'url': `https://jdjoy.jd.com/common/gift/new/exchange?reqSource=h5&invokeKey=qRKHmL4sna8ZOP9F`,
            'body': `{"buyParam":{"orderSource":"pet","saleInfoId":11},"deviceInfo":{}}`,
        })
        var t1 = $.source.currentTime
    } else {
        console.log("东东")
        await $.curl('https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5')
        var t1 = $.source.currentTime2
    }
    var t2 = new Date().getTime();
    console.log("本地时间 1:", t0)
    console.log("服务器时间:", t1)
    console.log("本地时间 2:", t2)
    var t = t1 - t2
    console.log(`服务器比本地大概${t>0?'快':"慢"}${Math.abs(t)}毫秒`, )
    console.log("测试100次数据")
    let tt = 0
    for (let i = 0; i < 100; i++) {
        if (dog) {
            await $.curl({
                'url': `https://jdjoy.jd.com/common/gift/new/exchange?reqSource=h5&invokeKey=qRKHmL4sna8ZOP9F`,
                'body': `{"buyParam":{"orderSource":"pet","saleInfoId":11},"deviceInfo":{}}`,
            })
            var t1 = $.source.currentTime
        } else {
            await $.curl('https://api.m.jd.com/client.action?functionId=queryMaterialProducts&client=wh5')
            var t1 = $.source.currentTime2
        }
        var t2 = new Date().getTime();
        tt += t1 - t2
    }
    console.log(tt)
})();
