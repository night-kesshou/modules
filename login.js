const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');

const urls = require('./urls'); //載入URL

function main({account, password, captcha, cookie}, callback){
  if(cookie==undefined) //若找不到 cookie 則回傳錯誤
    return callback({error:"Cookie is not defined"});
  else if(/\D/g.test(captcha))  // 若驗證碼格式錯誤 回傳驗證碼錯誤
    return callback({error:"Wrong CAPTCHA type"});
   let options = {  // 登入用form
     url:urls.main+urls.login,
     jar:cookie,
     form:{
       division:"senior",
       Loginid:account,
       LoginPwd:password,
       Uid:"",
       vcode:captcha
     }
   };
   request.post(options, (e,r,d)=>{
     if(e||!d)
      return callback({error:"connect server error", status:r.statusCode});
     //throw e; // 連線錯誤 中止應用程式, 預期修改為回傳連線失敗
     let data = (iconv.decode(d, "Big5")); // 將資料轉型為Big5
     let $ = cheerio.load(data);
     //let result = new Object();
     let result = {
       buffer:d, // 將完整buffer網頁資料還傳 (用於debug)
       source:data // 將轉型的資料回傳 (用於debug)
     }
     var res = $("#msg"); // 尋找 id=msg 的錯誤訊息標籤, 並嘗試將該訊息回傳
     if(res.length===0){ // 若找不到 #msg 則表示網頁並未回傳錯誤， 即為登入成功
       result.message = "login succuess"; // 設置登入成功訊息
     }else{
       result.error = res.eq(0).attr("value"); // 設置錯誤
     }
     callback(result); // 回傳結果
   });
}

module.exports = main;
