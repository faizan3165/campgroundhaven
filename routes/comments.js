var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment");
    express    = require("express"),
    router     = express.Router({mergeParams: true}),
    middleware = require("../middleware");

//ADD NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findOne({slug: req.params.slug}, function(err, campground){
        if(err){
            req.flash("error", err.message);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE A COMMENT
router.post("/", middleware.isLoggedIn,function(req, res){
    Campground.findOne({slug: req.params.slug}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        } else {
        Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", err.message);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added successfully");
                    res.redirect('/campgrounds/' + campground.slug);
                }
            });
        }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.commentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_slug: req.params.slug, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.commentOwnership, function(req, res){
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
            req.flash("error", err.message);
        } else {
            req.flash("success", "Comment updated")
            res.redirect("/campgrounds/" + req.params.slug);
        }
    });
});

// DELETE ROUTE
router.delete("/:comment_id", middleware.commentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted successfully!")
            res.redirect("back");
        }
    });
});

module.exports = router;
