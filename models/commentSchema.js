var mongoose=require("mongoose");

var commentSchema=new mongoose.Schema({
	author: String,
	comment:String,
	created:{type: Date,default:Date.now()},
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		} ,
		username: String
	}
});

module.exports=mongoose.model("comment",commentSchema);