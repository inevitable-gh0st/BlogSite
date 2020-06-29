var express=require("express"),
	router=express.Router(),
	middleware=require("../middleware"),
	comment = require("../models/commentSchema"),
	blog = require("../models/blogSchema");

//comments

router.get("/blogs/:id/comment/new",middleware.isLoggedIn,function(req,res){
	blog.findById(req.params.id,function(err,blog){
		if(err){
			console.log(err);
		}
		else{
			res.render("comments/new",{blog:blog});
		}
	});
});
router.post("/blogs/:id/comment",middleware.isLoggedIn,function(req,res){
	blog.findById(req.params.id,function(err,newBlog){
		if(err){
		console.log(err);		
		}
		else{
			comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}
				else{
					comment.author.id = req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					newBlog.comments.push(comment);
					newBlog.save();
					res.redirect('/blogs/'+newBlog._id);
				}
			});
		}
	});
});

router.get("/blogs/:id/comment/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	comment.findById(req.params.comment_id,function(err,fcomment){
		if(err){
			console.log(err);
		}else{
			res.render("comments/edit",{comment: fcomment, blog_id:req.params.id });
		}
		});
	
});
router.put("/blogs/:id/comment/:comment_id",middleware.checkCommentOwnership,function(req,res){
	//req.body.blog.body=req.sanitize(req.body.blog.body);
comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,fcomment){
		if(err){
			res.redirect("back");
		}
		else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
});

router.delete("/blogs/:id/comment/:comment_id",middleware.checkCommentOwnership,function(req,res){
	comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/blogs/"+req.params.id);
		}
	});
})



module.exports=router;