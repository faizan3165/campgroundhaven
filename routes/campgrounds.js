const { campgroundOwnership } = require("../middleware");

var express    = require("express"),
    router     = express.Router(),
    Campground = require("../models/campgrounds"),
    middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
  if(err){
    console.log(err);
  } else {
    res.render("campgrounds/index",{campgrounds: allCampgrounds});
  }
  });
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, image: image, description: desc, author: author, price: price}
  Campground.create(newCampground, function(err, newlyCreated){
      if(err){
          console.log(err);
      } else {
        req.flash("success", "Campground created successfully!");
          res.redirect("/campgrounds");
      }
  });
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new"); 
});

// SHOW ROUTE
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          console.log(foundCampground);
          res.render("campgrounds/show", {campground: foundCampground});
      }
  });
});

// EDIT ROUTE
router.get("/:id/edit", middleware.campgroundOwnership, function(req, res){
  console.log("IN EDIT!");
  Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds/edit", {campground: foundCampground});
      }
  });
});

// UPDATE ROUTE
router.put("/:id", middleware.campgroundOwnership, function(req, res){
  var newData = {
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    description: req.body.description
  };
  Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
      if(err){
          req.flash("error", err.message);
          res.redirect("back");
      } else {
          req.flash("success","Successfully Updated!");
          res.redirect("/campgrounds/" + campground._id);
      }
  });
});
// DELETE ROUTE
router.delete("/:id", middleware.campgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err) {
      console.log(err);
      return res.redirect("/campgrounds");
    }
    req.flash("success", "Campground deleted!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;