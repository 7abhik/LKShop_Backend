const express = require("express");
const router = express.Router();
const { ErrorHandler } = require("../middlewares/error");
const { validate, validateMember } = require("../models/users.model");
const auth = require("../middlewares/auth");
const { me, createUser, createMember, memberList } = require("../controllers/user.controller");
const { validateListing } = require("../models/common.validation");

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

router.post("/member", async (req, res) => {
  const { error } = validateMember(req.body);
  if (error) throw new ErrorHandler(400, error.details[0].message);

  const user = await createMember(req);

	res.send({ user, status: "success" });
});

router.post("/member-list", async (req, res) => {
  const { error } = validateListing(req.body);
  if (error) throw new ErrorHandler(400, error.details[0].message);

  const user = await memberList(req);

	res.send({ user, status: "success" });
});

module.exports = router;
