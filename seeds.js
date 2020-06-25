var Campground = require("./models/campgrounds"),
    Comment    = require("./models/comment"),
    mongoose   = require("mongoose");

var data = [
  {
    name: "Cloud's Rest",
    image:
      "https://cdn.pixabay.com/photo/2016/02/09/16/35/night-1189929__340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },

  {
    name: "Lone Man's Camp",
    image:
      "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },

  {
    name: "Ghost Camps",
    image:
      "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

function seedDb() {
  Campground.remove({}, function(err){
    // if (err) {
    //   console.log(err);
    // } else {
    //   console.log("removed everything in the database");
    // }
    // data.forEach(function(seed){
    //   Campground.create(seed, function(err, campground){
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("added a campground!");
    //       Comment.create(
    //         {
    //           text: "This place is great but i wish it had internet!",
    //           author: "Homer",
    //         },
    //         function(err, comment){
    //           if (err) {
    //             console.log(err);
    //           } else {
    //             campground.comments.push(comment);
    //             campground.save();
    //             console.log("Created new comment");
    //           }
    //         }
    //       );
    //     }
    //   });
    // });
  });
}

module.exports = seedDb;