const { User: User_Model } = require("../models/users.model");
const bcrypt = require("bcrypt");
const { ErrorHandler } = require("../middlewares/error");
const _ = require("lodash");

module.exports = {
  me: async (req) => {
    return await User_Model.findById(req.user._id).select("-password");
  },
  createUser: async (req) => {
    let user = await User_Model.findOne({ email: req.body.email });
    if (user) throw new ErrorHandler(400, "User already registered.");
    user = new User_Model(
      _.pick(req.body, ["firstName", "lastName", "email", "password"])
    );
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    return user;
  },

  createMember: async (req) => {
    let user = await User_Model.findOne({ mobile: req.body.mobile });
    if (user) throw new ErrorHandler(400, "User already registered.");
    user = new User_Model(req.body);
    await user.save();
    return user;
  },
};
