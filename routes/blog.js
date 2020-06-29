var express=require("express"),
	middleware=require("../middleware"),
	router=express.Router(),
	blog=require("../models/blogSchema");
	 

router.get("/blogs",function(req,res){
	blog.find({},function(err,blog){
		if(err){
			console.log(err);
		}
		else{
			res.render("index",{blog:blog});
		}
	})
})


//creating new blogs
router.get("/blogs/new",middleware.isLoggedIn,function(req,res){
	res.render("blog/new");
});

router.post("/blogs",middleware.isLoggedIn,function(req,res){
	req.body.blog.body=req.sanitize(req.body.blog.body);
	blog.create(req.body.blog,function(err,newBlog){
		if(err){
			console.log(err);
		}
		else{
			newBlog.author.id=req.user._id;
			newBlog.author.username=req.user.username;
			newBlog.save();
			console.log(newBlog);
			res.redirect("/blogs");
		}
	});
});

// show blog 
router.get("/blogs/:id",middleware.isLoggedIn,function(req,res){
	blog.findById(req.params.id).populate("comments").exec(function(err,fblog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("blog/show",{blog: fblog});
		}
	});
});


// Edit or Update blog
router.get("/blogs/:id/edit",middleware.checkBlogOwnership,function(req,res){
		blog.findById(req.params.id,function(err,fblog){
			res.render("blog/edit",{blog: fblog});
		});
});

router.put("/blogs/:id",middleware.checkBlogOwnership,function(req,res){
	req.body.blog.body=req.sanitize(req.body.blog.body);
		blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,fblog){
			if(err){
				res.redirect("/blogs");
			}
			else{
				res.redirect("/blogs/"+req.params.id);
			}
		});
});


// deleting blog (make it for user and admin only)
router.delete("/blogs/:id",middleware.checkBlogOwnership,function(req,res){
	blog.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/blogs");
		}else{
			res.redirect("/blogs");
		}
	});
})

module.exports=router;