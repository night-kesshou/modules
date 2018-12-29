const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');

const urls = {
  main:"http://210.70.131.56/online",
  login:"/login.asp"
};

function main({account, password, captcha, cookie}, callback){
  if(cookie==undefined)
    return callback({error:"Cookie is not defined"});
   let options = {
     url:urls.main+urls.login,
     jar:cookie,
     form:{
       division:"senior",
       Loginid:account,
       LoginPwd:password,
       Uid:"",
       vcode:parseInt(captcha)
     }
   }
   request.post(options, (e,r,d)=>{
     if(e||!d)throw e;
     let data = (iconv.decode(d, "Big5"))
     let $ = cheerio.load(data);
     //let result = new Object();
     let result = {
       buffer:d,
       source:data
     }
     if(data.indexOf(/物件已移動/g)>-1){
       result.message = "login succuess";
     }else{
       result.error = $("#msg").eq(0).attr("value");
     }
     callback(result);
   });
}

module.exports = main;
