const request = require("request").defaults({encoding:null});
const cookie = require('cookie');
const urls = {
  main:"http://210.70.131.56/online",
  home:"/information.asp",
  captcha:"/image/vcode.asp?vcode=0",
}

function setup(returnIt){
  var jar = request.jar();
  let options = {
    url:urls.main+urls.home,
    jar:jar
  }
  request(options, (e,r,d)=> returnIt((r&&r.statusCode===200?{jar:jar}:{error:e})) );
}

function main(callback, urlcode = false){
  setup(({error, jar})=>{
    if(!error&&jar){
      let options = {
        url:urls.main+urls.captcha,
        jar:jar
      }
      request(options, (e,r,d)=>{
        if(e||!d||r.statusCode!==200)
          return callback({error:"Get CAPTCHA error"});
        let captcha = new Buffer(d).toString("base64");
        let data = `data:image/Gif;base64,${captcha}`;
        //let cookie = jar['_jar']['store']['idx']['210.70.131.56']['/'];
        //let key = Object.keys(cookie).pop();
        //  data = `data:${r.headers["content-type"]}base64,${captcha}`;
        return callback({cookie:jar, captcha:urlcode?data:captcha});
      });
    }else{
      return callback( {error:"Set cookie error"} );
    }
  });
}
//main((v)=>console.log(v));
module.exports = main;
