//-----------------------------router---------------------------------
const qs = require('querystring');
const url = require('url');
const fs = require('fs');


function core(applicationName){
  this.name = applicationName
  this.routeRequest = [];
  this.middlewareRequest = [];
  this.publicPath = "";
}

core.prototype.route = function(req, res){
  var _this = this;
  var q = url.parse(req.url, true);
  req.query = q.query;
  req.pathname = q.pathname;

  var body = '';
  req.on('data', function (data) {
    body += data;
    if(body.length>1e6)
      req.connection.destroy();
  });

  req.on('end', function(){
    req.post = qs.parse(body);
    _this.middleware(req, res);
  });
}

core.prototype.middleware = function(req, res, index = 0){
  if(index<this.middlewareRequest.length){
    var _this = this;
    return this.middlewareRequest[index](req, res, ()=>{
      return _this.middleware(req, res, index+1);
    });
  }else{
    return this.request(req, res, this);
  }
}

core.prototype.set = function(func){
  this.middlewareRequest.push(func);
}

core.prototype.use = function(path, func){
  this.routeRequest[path.toLowerCase()] = func
}

core.prototype.setPublic = function(path){
  this.publicPath = (path);
}

core.prototype.request = (req, res, _this) => {
  var routeFunc = _this.routeRequest[req.pathname.toLowerCase()];
  if(routeFunc===undefined&&_this.publicPath.length===0){
    return res.end('404 not found');
  }else if(routeFunc!==undefined){
    return routeFunc(req, res);
  }else if(_this.publicPath.length){
    return _this.readFromPublic(req, res);
  }
}

core.prototype.readFromPublic = function(req, res){
  var target = this.publicPath+req.pathname;
  fs.readFile(target, function (err, buffer) {
    if(err){
      res.end("404 not found");
    }else{
      res.end(buffer);
    }
  });
}

//-----------------------------router--------------------------------
const http = require('http');
const login = require("./login"),
      captcha = require("./login.captcha");
var app = new core('simple server');
var session = new Object();
app.setPublic(__dirname+'/public');

app.set((req, res, next)=>{
  console.log(req.method, req.url);
  next();
});

app.use('/', (req, res)=>{
  captcha((result)=>{
    session.cookie = result.cookie;
    res.end(`<form method="POST" action="/login">
    Account: <input name="account"><br/>
    Password: <input name="password"><br/>
    <img src="${result.captcha}"><br/>
    CAPTCHA: <input name="captcha"><br/>
    <input type="submit">
    </form>`)
  }, 1);
});

app.use('/login', (req, res)=>{
  //console.log(req.post);
  req.post.cookie = session.cookie;
  if(req.post.cookie==undefined)
    return res.end('<a href="/">請重新登入</a>');
  res.setHeader('Content-Type', 'text/plain');
  login(req.post, (result)=>{
    res.end(result);
  })
});

http.createServer((req, res)=>app.route(req, res)).listen(3000);
/*const http = require('http'),
      { URL } = require('url');
const captcha = require("./login.captcha");
//console.log(URL);
var session = new Object();
http.createServer((req, res)=>{
  if(req.url=="/"){
    captcha((result)=>{
      session.cookie = result.cookie;
      res.end(`<form>
      Account: <input name="account"><br/>
      Password: <input name="password"><br/>
      <img src="${result.captcha}"><br/>
      CAPTCHA: <input name="captcha"><br/>
      <input type="submit">
      </form>`)
    }, 1);
  }else{
    let query = (URL.parse(req.url, true));
    console.log(query)
  }
}).listen(3000);*/
