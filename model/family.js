const mongoose = require('mongoose');

const { Schema } = mongoose;
const familySchema = new Schema({
	familyId: {
		type: String,
	},
});

module.exports = mongoose.model('family', familySchema);
