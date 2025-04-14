const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});
//Username And Password Schema already defined by Password-locaL-Mongoose package 

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);