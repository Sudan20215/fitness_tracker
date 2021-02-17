const express = require('express');
const path = require('path')
const logger = require("morgan");
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require("./models");


const app = express();
const url = 'mongodb://localhost:meroshare';



MongoClient.connect(url, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('sampledb');
    const exerciseCollection = db.collection('exercise');

  })

app.use(logger("dev"));  
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get("/exercise", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", (req, res) => {
	db.Workout.find({}, null, { sort: { day: 1 } })
		.populate("exercises")
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});


app.put("/api/workouts/:id", (req, res) => {
	var workoutID = req.params.id;
	db.Exercise.create(req.body)
		.then(({ _id }) =>
			db.Workout.findOneAndUpdate(
				{ _id: workoutID },
				{ $push: { exercises: _id } },
				{ new: true }
			)
		)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});


app.post("/api/workouts", (req, res) => {
	db.Workout.create(req.body)
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

app.get("/api/workouts/range", (req, res) => {
	db.Workout.find({}, null, { sort: { day: 1 } })
		.populate("exercises")
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = app;