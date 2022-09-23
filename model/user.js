import mongoose from 'mongoose';
const { Schema } = mongoose;
const userSchema = new Schema({
	userId: {
		type: String,
	},
	email: {
		type: String,
	},
	pw: {
		type: String,
	},
	familyId: {
		type: String,
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
	walkingstate: {
		type: Boolean,
	},
	locationallow: {
		type: Boolean,
	},
	jsonWebtoken:{
		type: String
	}
});
export default mongoose.model('User', userSchema);