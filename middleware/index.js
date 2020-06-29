var express=require("express"),
	comment = require("../models/commentSchema"),
	blog = require("../models/blogSchema");
	
var middlewareObj={};

middlewareObj.isLoggedIn=function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

middlewareObj.checkBlogOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		blog.findById(req.params.id,function(err,fblog){
			if(err){
				res.redirect("/blogs");
			}
			else{
				if(fblog.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}
	else{
		res.redirect("back");
	}
}

middlewareObj.checkCommentOwnership=function(req,res,next){
	if(req.isAuthenticated()){
		comment.findById(req.params.comment_id,function(err,fcomment){
			if(err){
				res.redirect("/blogs");
			}
			else{
				if(fcomment.author.id.equals(req.user._id)){
					next();
				}
				else{
					res.redirect("back");
				}
			}
		});
	}
	else{
		res.redirect("back");
	}
}

module.exports=middlewareObj;
