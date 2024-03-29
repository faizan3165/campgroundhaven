var Campground = require("../models/campgrounds"), 
    User       = require("../models/user"),
    passport   = require("passport"),
    express    = require("express"),
    router     = express.Router();

//ROOT ROUTE
router.get("/", function(req, res){
    res.render("landing");
});

// REGISTER ROUTE
router.get("/register", function(req, res){
res.render("register"); 
});

//SIGN UP LOGIC
router.post("/register", function(req, res){
    var newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            avatar: req.body.avatar
        });
    if(req.body.adminCode === "secretcode") {
        newUser.admin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp " + user.username + " !");
        res.redirect("/campgrounds"); 
        });
    });
});

//LOGIN ROUTE
router.get("/login", function(req, res){
res.render("login"); 
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local",    
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res){
});

// LOGOUT ROUTE
router.get("/logout", function(req, res){
req.logout();
req.flash("success", "You have been logged out!");
res.redirect("/campgrounds");
});

// USER PROFILE ROUTE
router.get("/users/:id", function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
    if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
    }
    Campground.find().where('author.id').equals(foundUser._id).exec(function(err, campgrounds) {
        if(err) {
        req.flash("error", "Something went wrong.");
        return res.redirect("/");
        }
        res.render("users/show", {user: foundUser, campgrounds: campgrounds});
    })
    });
});

module.exports = router;