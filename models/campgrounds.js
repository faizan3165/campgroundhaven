var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Campground name cannot be blank.",
  },

  image: String,
  description: String,
  price: String,

  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },

  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],

  slug: {
    type: String,
    unique: true,
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

campgroundSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified("name")) {
      this.slug = await generateUniqueSlug(this._id, this.name);
    }
    next();
  } catch (err) {
    next(err);
  }
});

var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = Campground;

async function generateUniqueSlug(id, campgroundName, slug) {
  try {
    if (!slug) {
      slug = slugify(campgroundName);
    }
    var campground = await Campground.findOne({ slug: slug });
    if (!campground || campground._id.equals(id)) {
      return slug;
    }
    var newSlug = slugify(campgroundName);
    return await generateUniqueSlug(id, campgroundName, newSlug);
  } catch (err) {
    throw new Error(err);
  }
}

function slugify(text) {
  var slug = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, "") // Trim - from end of text
    .substring(0, 75); // Trim at 75 characters
  return slug + "-" + Math.floor(1000 + Math.random() * 9000); // Add 4 random digits to improve uniqueness
}
