const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');
const port = process.env.PUBLIC_PORT;
const {connection} = require('./Config/dbConnect')
const {usersRouter} = require('./userRoutes')
const {LoginRouter} = require('./loginRoutes')


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello world")  
}) 
app.use('/',usersRouter)
app.use('/',LoginRouter)



app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")  
    } catch (error) {
        console.log(`Error connecting: ${error}`)
    }
    console.log(`server is running on port ${port}`)
})
