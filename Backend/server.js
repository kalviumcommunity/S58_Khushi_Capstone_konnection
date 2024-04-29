const express = require('express');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PUBLIC_PORT;
const {connection} = require('./Config/dbConnect')
const {usersRouter} = require('./userRoutes')


app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello world")
}) 
app.use('/',usersRouter)



app.listen(port,async()=>{
    try {
        await connection;
        console.log("Connected to DB")  
    } catch (error) {
        console.log(`Error connecting: ${error}`)
    }
    console.log(`server is running on port ${port}`)
})
