var bcrypt = require("bcrypt");
var registration_model = require("../model/DAO/registration");

module.exports = {
  register: function (req, res) {
    if (!req.body.password || !req.body.student_id || !req.body.student_name || !req.body.email) {
      return res.status(400).json({ message: "Vui lòng không để trống trường nào!" });
    }
    
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const member = {
          student_id: req.body.student_id,
          student_name: req.body.student_name,
          email: req.body.email,
          password: hashedPassword,
          avatar_url: req.body.avatar_url
        };
        registration_model.register(res, member);
      })
      .catch((error) => {
        res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
      });
  },
};