const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const workoutSchema = new Schema({
	day: Date,
	exercises: [
		{
			type: Schema.Types.ObjectId,
			ref: "exercise",
		},
	],
});

const workout = mongoose.model("workout", workoutSchema);

module.exports = workout;