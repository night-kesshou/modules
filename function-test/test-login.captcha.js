var captcha = require("../login.captcha.js");

captcha((v)=>console.log(v), process.argv[2]!=undefined);
//console.log(captcha)
