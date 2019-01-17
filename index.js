const login = require('./login'),
      captcha = require('./login.captcha'),
      grade = require('./query.grade'),
      gcj = require('./generateCookie');

exports.login = login;
exports.captcha = captcha;
exports.query = {
  grade:grade
};
exports.generateCookie = gcj;
