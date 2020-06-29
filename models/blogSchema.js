var mongoose=require("mongoose");


var blogScema=new mongoose.Schema({
	title:String,
	image: String,
	body: String,
	created:{type: Date,default:Date.now()},
	comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "comment"
      }
   ],
	author:{
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		} ,
		username: String
	}
});

module.exports=mongoose.model("blog",blogScema);