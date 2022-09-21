const User= require('./model/user');

app.post('/login',(req,res)=>{	//로그인 API
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err }); 
		return res.status(200).json({
		  success: true,
		  userInfo,
		});
	});
});