const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// Home page route
router.get("/all", function(req, res) {
  db.Workout.find({})
    .populate("exercises")
    .then(function(dbWorkout) {
      res.send(dbWorkout);
    });
});

router.post("/", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/submit", ({ body }, res) => {
  db.Exercise.create(body)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        {},
        { $push: { exercises: _id } },
        { new: true }
      )
    )
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
