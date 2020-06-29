var express=require("express"),
	router=express.Router(),
	passport=require("passport"),
	user=require("../models/userSchema");

// blog front page

router.get("/",function(req,res){
	res.redirect("/blogs");
})


//auth routes

router.get("/register",function(req,res){
	res.render("register");
})

router.post("/register",function(req,res){
	user.register(new user({username: req.body.username}),req.body.password,function(err,user){
		if(err){
			consoe.log(err);
			res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			res.redirect("/blogs");
		});
	});
})

router.get("/login",function(req,res){
	res.render("login");
})

router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/blogs",
		failureRedirect: "/login"
	}),function(req,res){
});

router.get("/logout",function(req,res){
	req.logout(); 
	res.redirect("/blogs");
})


module.exports=router;