const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const validateGenre = genre => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  });
  return schema.validate(genre);
};

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  }
});

const Genre = mongoose.model("Genre", genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
