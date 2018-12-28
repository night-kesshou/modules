const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');

const urls = {
  main:"http://210.70.131.56/online",
  login:"/login.asp"
};
/*
login infomation:
  json:{
    division:"senior",
    Loginid:"account",
    LoginPwd:"password",
    Uid:"",
    vcode:"CAPTCHA"
  }

  split:
    division=senior
    Loginid=account
    LoginPwd=password
    Uid=
    vcode=6268

  source:division=senior&Loginid=account&LoginPwd=password&Uid=&vcode=6268
*/
//const loginPage = "http://210.70.131.56/online/login.asp";

function main({account, password}, callback){
  
}

module.export = main;
