import mongoose from 'mongoose';
const { Schema } = mongoose;

const petSchema = new Schema({
	petId: {
		type: Number, // 자료형
	},
	birthday: {
		type: Date,
	},
	userId: {
		type: String,
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
export default mongoose.model('pet', petSchema);
