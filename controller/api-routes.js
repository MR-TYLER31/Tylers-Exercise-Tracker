const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

// Home page route
router.get("/all", function(req, res) {
  db.Workout.find({})
    .sort({ _id: -1 })
    .populate("exercises")
    .then(function(dbWorkout) {
      res.send(dbWorkout);
    });
});

router.post("/", ({ body }, res) => {
  db.Workout.create(body)
    .then(dbUser => {
      res.redirect("/");
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/submit", ({ body }, res) => {
  //   id = req.params.id;
  db.Exercise.create(body)
    .then(({ _id }) =>
      db.Workout.findOneAndUpdate(
        {},
        { $push: { exercises: _id } },
        { new: true }
      )
    )
    .then(dbUser => {
      res.redirect("/");
    })
    .catch(err => {
      res.json(err);
    });
});

// router.put("/api/add/:id", function(req, res) {
//   let id = req.params.id;

//   db.Exercise.update(id, data => {
//     res.json(data);
//   });
// });

module.exports = router;
