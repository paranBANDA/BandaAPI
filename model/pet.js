const mongoose = require('mongoose');

const { Schema } = mongoose;
const petSchema = new Schema({
	petId: {
		type: Number, // 자료형
	},
	birthday: {
		type: Date,
	},
	familyId: {
		type: String,
	},
	gender: {
		type: String,
	},
	meetday: {
		type: Date,
	},
	petname: {
		type: String,
	},
	breed: {
		type: String,
	},
	walkingId: {
		type: Number,
	},
});

module.exports = mongoose.model('Grade', petSchema);
