import express from 'express';
import Walking from '../model/walking.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Pet from '../model/pet.js';
var jwtSecret = 'secret';
const key = 'Secret_Key';

var router = express.Router();
router.use(function (req, res, next) {
	next();
});

router.post('/walkinfo', async (req, res) => {
	const userId = req.body.userId;
	const petId = req.body.petId;
	const walkingDay = req.body.walkingStart; // walkingDay를 시작날짜 + 시간 walkingTime을 끝난날짜 + 시간으로 바꿔보는게 어떨까..
	const walkingTime = req.body.walkingEnd;
	const walkingFeel = req.body.walkingFeel;
	const walkingData = new Walking({
		userId: userId,
		petId: petId,
		walkingday: walkingDay,
		walkingtime: walkingTime,
		walkingfeel: walkingFeel,
	});
	walkingData.save();
	return res.status(200).json({
		code: 200,
		type: true,
		message: 'register',
	});
});

export default router;
