var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment");


middlewareObj = {};

middlewareObj.campgroundOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
    Campground.findOne({slug: req.params.slug}, function(err, foundCampground){
        if(err) {
            req.flash("error", "You do not have permission to do that");
        res.redirect("back");
        } else {
        if(foundCampground.author.id.equals(req.user._id) || req.user.admin) {
            next();
        } else {
            res.redirect("back");
        }
        }
    });
    } else {
    res.redirect("back");
    }
};

middlewareObj.commentOwnership = function(req, res, next) {
    if(req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            req.flash("error", "You do not have permission to do that");    
        res.redirect("back");
        } else {
        if(foundComment.author.id.equals(req.user._id) || req.user.admin) {
            next();
        } else {
            res.redirect("back");
        }
        }
    });
    } else {
    res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You must be logged in first!");
    res.redirect("/login",);
};

module.exports = middlewareObj;