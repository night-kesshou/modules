const login = require('./login'),
      captcha = require('./login.captcha'),
      grade = require('./query.grade'),
      performance = require('./query.performance'),
      attendance = require('./query.attendance');

exports.login = login;
exports.captcha = captcha;
exports.query = {
  grade:grade,
  performance:performance,
  attendance:attendance
};
