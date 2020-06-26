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
router.get("/:slug", function(req, res){
  Campground.findOne({slug: req.params.slug}).populate("comments").exec(function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds/show", {campground: foundCampground});
      }
  });
});

// EDIT ROUTE
router.get("/:slug/edit", middleware.campgroundOwnership, function(req, res){
  Campground.findOne({slug: req.params.slug}, function(err, foundCampground){
      if(err){
          console.log(err);
      } else {
          res.render("campgrounds/edit", {campground: foundCampground});
      }
  });
});

// UPDATE ROUTE
router.put("/:slug", middleware.campgroundOwnership, function(req, res){
  Campground.findOne({slug: req.params.slug}, function(err, campground){
    if(err){
        res.redirect("/campgrounds");
    } else {
        campground.name        = req.body.campground.name;
        campground.image       = req.body.campground.image;
        campground.price       = req.body.campground.price
        campground.description = req.body.campground.description;
        campground.save(function (err) {
          if(err){
            console.log(err);
            res.redirect("/campgrounds");
          } else {
            res.redirect("/campgrounds/" + campground.slug);
          }
        });
    }
  });
});

// DELETE ROUTE
router.delete("/:slug", middleware.campgroundOwnership, function(req, res){
  Campground.findOneAndRemove({slug: req.params.slug}, function(err){
    if(err) {
      console.log(err);
      req.flash("error", err.message)
      return res.redirect("/campgrounds");
    }
    req.flash("success", "Campground deleted!");
    res.redirect("/campgrounds");
  });
});

module.exports = router;