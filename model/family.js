const mongoose = require('mongoose');

const { Schema } = mongoose;
const familySchema = new Schema({
	familyId: {
		type: String, // 자료형
	},
	userId: {
		type: String,
	},
	petId: {
		type: String,
	},
});

module.exports = mongoose.model('family', familySchema);
