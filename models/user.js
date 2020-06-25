var passportLocalMongoose    = require("passport-local-mongoose"),
    mongoose                 = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    avatar: String,
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);