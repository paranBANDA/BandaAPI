import express from 'express';
import AWS from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import moment from 'moment'
AWS.config.update({
    region : 'ap-northeast-2',
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
})

const s3 = new AWS.S3();

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']
// s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data.Buckets);
//     }
//   });

const imageUploader = multer({
    storage:multerS3({
        s3:s3,
        bucket: 'bandabucket',
        key:(req,file,callback) =>{
            const useremail = req.query.useremail
            const petname = req.query.petname
            const extension = path.extname(file.originalname)
            const datetime = moment().format('YYYYMMDD');
            if(!allowedExtensions.includes(extension)){
                return callback(new Error('wrong extension'))
            }
            callback(null, `diary/${datetime}_${file.originalname}`)
        },
        acl : 'public-read-write'
    })  
})
var router = express.Router();

router.post('/uploaddiaryimage', imageUploader.single('image'),(req,res)=>{
    res.send('good!')
    console.log(res)
})

router.get('/', function (req, res) {
	res.send('hi1');
});

export default router;