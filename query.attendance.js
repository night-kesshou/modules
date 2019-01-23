const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');
const urls = require('./urls'); //載入URL

function main({cookie}, callback){
  let options = {
    url:urls.main+urls.attendance,
    jar:cookie
  }
  request(options, (e,r,d)=>{
    if(e||!d)
      return callback({error:'目標伺服器錯誤'});
    let data = (iconv.decode(d, "Big5")); // data translate to big5
    var temp = cheerio.load(data)('table[class="si_12 collapse padding2 spacing0"]>tbody>tr>td[class="top center"]');
    var result = [["曠課", "遲到", "事假", "事假1", "病假", "病假1", "病假2", "公假", "喪假", "升降午缺", "升降午遲", "早缺", "早遲", "產前", "娩假", "流產", "育嬰", "生理"], [], []];
    for(var i=0, s=0;i<temp.length;i++){
      s+=(i%18==0);
      result[s].push(temp.eq(i).text());
    }
    callback({result:result});
  });
}

module.exports = main;