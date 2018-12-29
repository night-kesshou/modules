const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');

const urls = require('./urls');

function main(cookie, callback){
  let options = {
    url:urls.main+urls.profile,
    jar:cookie
  }

  callback({message:"其實沒必要"});
}

module.exports = main;
