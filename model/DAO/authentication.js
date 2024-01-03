var connect_DB = require('./connect_db');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

function checkNoEmpty(obj) {
  if (obj == null || typeof obj !== 'object' || JSON.stringify(obj) === '{}') return false;
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] == undefined || obj[key] == null || obj[key] == "") {
        return false;
      }
    }
  }
  return true;
}

function signin(res, obj) {
  connect_DB.query("SELECT * FROM members WHERE email = ?", [obj.email], function (err, result, field) {
    if (err) {
      return res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
    }
    
    if (result.length == 0) {
      return res.status(400).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập. Vui lòng thử lại" });
    }
    
    bcrypt
      .compare(obj.password, result[0].password)
      .then((passwordCheck) => {
        if (!passwordCheck) {
          return res.status(401).json({ message: "Người dùng không tồn tại hoặc sai thông tin đăng nhập. Vui lòng thử lại" });
        }
        
        const member = {
          student_id: result[0].student_id,
          student_name: result[0].student_name,
          email: result[0].email,
          avatar_url: result[0].avatar_url,
          state: result[0].state,
          join_date: result[0].join_date,
          permission: result[0].permission
        };
        const token = jwt.sign(member, "RANDOM-TOKEN", { expiresIn: "1h" });
        res.json({ member: member, token: token });
      })
      .catch((error) => {
        res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      });
  });
}

module.exports = { checkNoEmpty, signin }