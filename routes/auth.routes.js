const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User: User_Model } = require("../models/users.model");
const express = require("express");
const { ErrorHandler } = require("../middlewares/error");
const auth = require("../middlewares/auth");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  res.status(200).json({ status: "failed" });
});
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new ErrorHandler(400, error.details[0].message);
  let user = await User_Model.findOne({ email: req.body.email });
  if (!user) throw new ErrorHandler(400, "User not found.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) throw new ErrorHandler(400, "Invalid email or password.");

  const token = user.generateAuthToken();
  res.status(200).json({ token, status: "success" });
});

function validate(body) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(body);
}

module.exports = router;
