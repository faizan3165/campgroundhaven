var Campground = require("../models/campgrounds"),
    Comment    = require("../models/comment");
    express    = require("express"),
    router     = express.Router({mergeParams: true}),
    middleware = require("../middleware");

//ADD NEW COMMENT
router.get("/new", middleware.isLoggedIn, function(req, res){
    console.log(req.params.id);
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {  
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE A COMMENT
router.post("/", middleware.isLoggedIn,function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
        Comment.create(req.body.comment, function(err, comment){
            if(err){
                console.log(err);
            } else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success", "Comment added successfully");
                res.redirect('/campgrounds/' + campground._id);
            }
        });
        }
    });
});

// EDIT ROUTE
router.get("/:comment_id/edit", middleware.commentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE ROUTE
router.put("/:comment_id", middleware.commentOwnership, function(req, res){
        Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated")
            res.redirect("/campgrounds/" + req.params.id );
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