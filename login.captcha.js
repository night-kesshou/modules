const request = require("request").defaults({encoding:null});

const urls = require('./urls')

function setup(callback){// 將含驗證碼的cookie回傳
  var jar = request.jar(); // 宣告 request 用的 cookie
  let options = {
    url:urls.main+urls.home,
    jar:jar
  }
  /*
  line 20:{
    if(r&&r.statusCode===200){
      return callback({jar:jar});
    }else{
      return callback({error:e});
    }
  }
  */
  request(options, (e,r,d)=> callback((r&&r.statusCode===200?{jar:jar}:{error:e})) );
}

function main(callback, urlcode = false){
  setup(({error, jar})=>{ // 嘗試取得包含驗證碼的cookie
    if(!error&&jar){ // 成功獲得 cookie
      let options = {
        url:urls.main+urls.captcha,
        jar:jar
      }
      request(options, (e,r,d)=>{ // 取得 CAPTCHA
        if(e||!d||r.statusCode!==200)
          return callback({error:"Get CAPTCHA error", status:r.statusCode});
        let captcha = new Buffer(d).toString("base64");
        //let cookie = jar['_jar']['store']['idx']['210.70.131.56']['/'];
        //let key = Object.keys(cookie).pop();
        //  data = `data:${r.headers["content-type"]}base64,${captcha}`;
        /*
        return {
          cookie:jar,
          captcha: if(urlcode){// encode to url type
              return `data:{...}`
          }else
            just return captcha of base64
        }
        */
        return callback({cookie:jar, captcha:urlcode?(`data:image/Gif;base64,${captcha}`):captcha});
      });
    }else{ // 取得cookie失敗
      return callback( {error:"Set cookie error"} );
    }
  });
}
//main((v)=>console.log(v));
module.exports = main;
