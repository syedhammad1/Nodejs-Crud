const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
exports.signUp = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newuser = await User.create({ userName, password: hashedPassword });
    res.status(200).json({
      status: "success",
      data: { user: newuser },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      res.status(400).json({
        status: "fail",
        message: "User not found",
      });
    }
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "incorrect username or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
