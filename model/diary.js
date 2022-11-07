import mongoose from 'mongoose';

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
		type: String,
	},
	date: {
		type: Date,
	},
	text: {
		type: String,
	},
});

export default mongoose.model('diary', diarySchema);
