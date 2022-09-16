const mongoose = require('mongoose');

const { Schema } = mongoose;
const diarySchema = new Schema({
	diaryId: {
		type: String, // 자료형
	},
	picture: {
		type: String,
	},
	walkingId: {
		type: Number,
	},
	userId: {
		type: String,
	},
	petId: {
		type: Number,
	},
	date: {
		type: Date,
	},
	text: {
		type: String,
	},
});

module.exports = mongoose.model('Grade', diarySchema);
