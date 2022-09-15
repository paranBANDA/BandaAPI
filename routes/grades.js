const express = require('express');
const router = express.Router();
const Grade = require('../model/grades');

// 사용자 전체 조회
router.get('/', (req, res, next) => {
    Grade.findOne(
        {student_id: 0},
        function (err, obj) {
            console.log(obj);
        }
    )
});

// 유저 생성
router.post('/', (req, res, next) => {
    const user = new User({
        name: req.body.name,
        age: req.body.age,
        married: req.body.married
    })
    user.save()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        })
})

module.exports = router;