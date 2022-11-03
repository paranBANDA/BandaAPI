import express from 'express';
import Pet from '../model/pet.js';

var router = express.Router();

router.use(function (req, res, next) {
	next();
});
router.get('/', function (req, res) {
	res.send('hi1');
});

router.post('/showuserpet', function (req, res, next) {
	console.log(req.body)
	const userId = req.body.email;
	var findlUserPet = {
		userId: userId,
	};
	Pet.find(findlUserPet).exec(function (err, user) {
		if (err) {
			res.json({
				type: false,
				data: 'Error occured ' + err,
			});
		} else if (user) {
			console.log(user);
			res.json({
				type: true,
				data: user,
			});
		} else {
			res.json({
				type: false,
				data: 'please check email',
			});
		}
	});
});

export default router;
