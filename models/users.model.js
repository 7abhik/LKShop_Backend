const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
  },
  mobile: {
    type: String,
    minlength: 10,
    maxlength: 15,
  },
  joinDate: {
    type: String,
  },
  age: {
    type: Number,
  },
  role: {
    type: String,
  },
  desc: {
    type: String,
    maxlength: 250,
  },
  profileImage: {
    type: String,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
  return token;
};
const User = mongoose.model("User", userSchema);

/****************************Validator******************************** */

const Joi = require("joi");
function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    conf_password: Joi.string()
      .min(5)
      .max(255)
      .valid(Joi.ref("password"))
      .required()
      .label("Confirm password")
      .options({ messages: { "any.only": "{{#label}} does not match" } }),
  });
  return schema.validate(user);
}

function validateMember(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    email: Joi.string().allow(null, ""),
    mobile: Joi.string().min(10).max(15).required(),
    joinDate: Joi.string().required(),
    age: Joi.number().required(),
    role: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    desc: Joi.string().max(250),
    profileImage: Joi.string(),
  });
  return schema.validate(user);
}

exports.validate = validateUser;
exports.validateMember = validateMember;
exports.User = User;
