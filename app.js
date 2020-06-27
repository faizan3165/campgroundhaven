// VARIABLES
// ========================================================
    var Campground      = require("./models/campgrounds"), 
        Comment         = require("./models/comment"),      
        methodOverride  = require("method-override"),
        favicon         = require('express-favicon'),      
        LocalStrategy   = require("passport-local"), 
        flash           = require("connect-flash"),      
        User            = require("./models/user"),        
        bodyParser      = require("body-parser"),          
        passport        = require("passport"),             
        mongoose        = require("mongoose"),             
        express         = require("express"),              
        seedDb          = require("./seeds"),              
        app             = express();                       
// ========================================================




// REQUIRING ROUTES
// =========================================================
    var campgroundsRoutes = require("./routes/campgrounds"),                                                                                                                              
        commentRoutes     = require("./routes/comments"),   
        authRoutes        = require("./routes/auth");       
// =========================================================


// MONGOOSE CONFIG
// ===============================================================
    mongoose.connect(process.env.DATABASEURL,{
      useNewUrlParser: true,                                   
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false                               
    });                                                          
// ===============================================================



// APP CONFIG
// ===================================================
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
    app.set("view engine", "ejs");
    app.use(flash());
    // seedDb();
// ===================================================

    

// PASSPORT CONFIG
// =====================================================
    app.locals.moment = require("moment");

    app.use(require("express-session")({
      secret: "Harry Potter is a great series",                                                                                                                                 
      resave: false,
      saveUninitialized: false
    }));  

    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    app.use(function(req, res, next){
      res.locals.currentUser = req.user,
      res.locals.error = req.flash("error");
      res.locals.success = req.flash("success");
      next();
    });
// =====================================================



// ROUTER CONFIG
// ======================================================
    app.use("/", authRoutes);
    app.use("/campgrounds", campgroundsRoutes);
    app.use("/campgrounds/:slug/comments", commentRoutes);
// ======================================================



// LOCAL SERVER
// ==========================================
    app.listen(process.env.PORT || 3000, function(){
      console.log("Listening on port 3000");
    });
// ==========================================