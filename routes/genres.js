const express = require("express");
const router = express.Router();
const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { Genre, validate } = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  return res.send(genres);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({
    name: req.body.name
  });

  genre = await genre.save();
  return res.send(genre);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  return res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  return res.send(genre);
});

router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  return res.send(genre);
});

module.exports = router;
