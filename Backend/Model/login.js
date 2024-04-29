const mongoose = require('mongoose')
const LogInSchema= mongoose.Schema({
    username : String

})
mongoose.pluralize(null)
const LogInModel = mongoose.model("Login",LogInSchema)
module.exports = {LogInModel}