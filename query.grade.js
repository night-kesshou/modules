const request = require('request').defaults({encoding:null}), 
      cheerio = require('cheerio'),
      iconv = require('iconv-lite');

const urls = require('./urls'); //載入URL

function main({jar, year}, callback){
  if(jar==undefined)
    return callback({error:"cookie is not define"});
  let y = parseInt(year);
  if(isNaN(y)||y>4||y<0)
    return callback({error:"Useless request"});
  let options = {
    url:urls.main+urls.grade[y],
    jar:jar
  }
  request(options, (e,r,d)=>{
    if(e||!d)
      return callback({error:"connect server error", status:r.statusCode});
      let data = (iconv.decode(d, "Big5")); // data translate to big5
      var temp = cheerio.load(data)('table[class="collapse le_06 padding3 spacing0"]>tbody>tr>td');
      var grade = {subject:[], credit:[], elective:[], score:{0:[], 1:[]}, total:[]};
      //var grade = {0:[], 1:[], total:[], subject:[]};
      for(var i=11;i<temp.length-2;i+=8){ // 排除非必要資訊, 因此 i從11開始至 html.group(td).length-2 結束
        grade['subject'].push(temp.eq(i).text());
        grade['credit'].push(parseInt(temp.eq(i+5).text()));
        grade['elective'].push(temp.eq(i+4).text());
        grade['score'][0].push(parseInt(temp.eq(i+3).text()));
        grade['score'][1].push(parseInt(temp.eq(i+6).text()));
        grade['total'].push(parseInt(temp.eq(i+7).text()));
      }
      return callback({
        data:data,
        grade:grade
      });
  });
}

module.exports = main;
