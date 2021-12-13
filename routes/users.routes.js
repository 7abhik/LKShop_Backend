const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../middlewares/error");
const _ = require("lodash");
const { validate } = require("../models/users.model");
const auth = require("../middlewares/auth");
const { me, createUser } = require("../controllers/user.controller");

router.get("/me", auth, async (req, res) => {
  const user = await me(req);
  res.status(200).json({ status: "success", user });
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) throw new ErrorHandler(400, error.details[0].message);

  const user = await createUser(req);

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({ token, status: "success" });
});

module.exports = router;
