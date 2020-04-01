const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  await user.save();

  return res.send(_.pick(user, ["id", "name", "email"]));
});

module.exports = router;
