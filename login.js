const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');

const urls = require('./urls');

function main({account, password, captcha, cookie}, callback){
  if(cookie==undefined)
    return callback({error:"Cookie is not defined"});
  else if(/\D/g.test(captcha))
    return callback({error:"Wrong CAPTCHA type"});
   let options = {
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
     if(e||!d)throw e;
     let data = (iconv.decode(d, "Big5"))
     let $ = cheerio.load(data);
     //let result = new Object();
     let result = {
       buffer:d,
       source:data
     }
     var r = $("#msg");
     if(r.length===0){
       result.message = "login succuess";
     }else{
       result.error = r.eq(0).attr("value");
     }
     callback(result);
   });
}

module.exports = main;
