const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    type: {type:String,
        enum:['resistance','cardio'],
        required:true,
        defult:"resistance"},
	name: String,
	duration: Number,
	distance: Number,
	weight: Number,
	reps: Number,
	sets: Number,
});

const exercise = mongoose.model("exercise", exerciseSchema);

module.exports = exercise;
