var mongoose = require("mongoose");

var commentSchema = ({
    text: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref:  "User"
        },
        username: String
    },
    admin: {
        type: Boolean,
        default: false
    }
}); 

module.exports =  mongoose.model("Comment",commentSchema);