const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({
	userId: {
		type: String,
	},
	pw: {
		type: String,
	},
	familyId: {
		type: String,
	},
	petId: {
		type: Number,
	},
	type: {
		type: String,
	},
	kakaoidentifier: {
		type: String,
	},
	name: {
		type: String,
	},
	nickname: {
		type: String,
	},
	lastwalking: {
		type: String,
	},
	locationallow: {
		type: Boolean,
	},
});

module.exports = mongoose.model('user', userSchema);
