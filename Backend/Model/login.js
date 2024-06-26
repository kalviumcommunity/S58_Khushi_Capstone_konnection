const mongoose = require('mongoose')
const LogInSchema= mongoose.Schema({
    username : String,
    password : String,
    email : String
})
mongoose.pluralize(null)
const LogInModel = mongoose.model("Login",LogInSchema)
module.exports = {LogInModel}

