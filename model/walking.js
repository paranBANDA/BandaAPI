import mongoose from 'mongoose';
const { Schema } = mongoose;
const walkingSchema = new Schema({
	walkingId: {
		type: Number,
	},
	userId: {
		type: String,
	},
	petId: {
		type: Number,
	},
	walkingdata: {
		type: String,
	},
	walkingday: {
		type: String,
	},
	walkingtime: {
		type: String,
	},
	walkingfeel: {
		type: String,
	},
	walkingroute: {
		type: String,
	},
});

export default mongoose.model('Walking', walkingSchema);
