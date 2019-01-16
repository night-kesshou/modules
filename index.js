const login = require('./login'),
      captcha = require('./login.captcha'),
      grade = require('./query.grade');

exports.login = login;
exports.captcha = captcha;
exports.query = {
  grade:grade
};