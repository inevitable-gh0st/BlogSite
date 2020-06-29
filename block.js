var express=require("express"),
	mongoose=require("mongoose"),
	bodyParser=require("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	methodOverride =require("method-override"),
	LocalStrategy =require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose"),
	passport=require("passport"),
	user=require("./models/userSchema");

//requiring routes
var commentRoutes    = require("./routes/comment"),
    blogRoutes = require("./routes/blog"),
    indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost/blog");
var app=express();
app.use(expressSanitizer());

app.use(require("express-session")({
	secret: " hey this is good blogsite",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(methodOverride("_method"));

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	next();
});

app.use(indexRoutes);
app.use(blogRoutes);
app.use(commentRoutes);



app.listen(3000,function(){
	console.log("server has started");
});

		