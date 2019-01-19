const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');
const urls = require('./urls'); //載入URL

function main({cookie}, callback){
  let options = {
    url:urls.main+urls.performance,
    jar:cookie
  }
  request(options, (e,r,d)=>{
    if(e||!d)
      return callback({error:'目標伺服器錯誤'});
    let data = (iconv.decode(d, "Big5")); // data translate to big5
    var temp = cheerio.load(data)('table[class="font-b t00 t07 collapse brk01 padding1 spacing1"]>tbody>tr>td');
    var performance = [];
    for(var i=8;i<temp.length;i+=7){
      performance.push({
        genre:temp.eq(i).text(),
        occur:temp.eq(i+1).text(),
        approve:temp.eq(i+2).text(),
        cause:temp.eq(i+3).text(),
        method:temp.eq(i+4).text(),
        offset:temp.eq(i+5).text()
      });
    }
    callback({
      data:data,
      buffer:d,
      result:performance.sort((a,b)=>new Date(a.occur)>new Date(b.occur))
    });
  });
  //table[class="font-b t00 t07 collapse brk01 padding1 spacing1"]>tbody>tr>td
  //start~end 8~14
}

module.exports = main;