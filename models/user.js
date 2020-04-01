const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateUser = user => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  });
  return schema.validate(user);
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
});

const User = mongoose.model("User", userSchema);

exports.userSchema = userSchema;
exports.User = User;
exports.validate = validateUser;
