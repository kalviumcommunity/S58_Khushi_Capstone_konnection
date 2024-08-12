const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username:String,
    squad: Number,
    bio: String,
    email: String,
    pfp_url : String
})
mongoose.pluralize(null)
const usersModel = mongoose.model("users",userSchema)
module.exports = {usersModel}
// npm create vite@latest