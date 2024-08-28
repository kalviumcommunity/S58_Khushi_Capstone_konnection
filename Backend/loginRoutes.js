const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const LoginRouter = express.Router();
const {LogInModel}= require('./Model/login');
const loginData = require('./Config/LogInData.json')
const UsersData = require('./Config/UsersData.json');
const Joi = require('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY

// signup Validate
const signUpSchema = Joi.object({
    username:Joi.string().required(),
    password: Joi.string().min(5).max(12).required(),
    email: Joi.string().email() 
})


// Adding all user Logged into login database
LoginRouter.post('/postlogged',(req,res)=>{
  LogInModel.insertMany(loginData)
  .then((result) => {
    res.send('Inserted ' + result.length + ' documents into the collection');
  })
.catch((error) => {
   console.error('Error inserting documents:', error);
   res.status(500).json({ error: 'Failed to insert data' });
   });
})


// deleting all user logged into login database
LoginRouter.delete('/deletelogged', async (req,res)=>{
  try { 
    const deleteusers = await LogInModel.deleteMany({})
    res.json(deleteusers)
} catch (error) {
    console.log('Error deleting the data:', error);
    res.status(500).json({ error: 'Failed to delete the data' });
}
})




// POSt : SIGNUP
LoginRouter.post('/signUp', async (req, res) => {
  const email=req.body.email
  console.log(email)
  if(UsersData.some(e=>e.email==email)){
    try{
      const salt = await bcrypt.genSalt();
      const hashedPassword= await bcrypt.hash(req.body.password, salt);
      const data = {
        "username": req.body.username,
        "password": hashedPassword,
        "email": req.body.email
      }
      const validateData = {
        "username": req.body.username,
        "password": req.body.password,
        "email": req.body.email
      }
      const {error,value}=signUpSchema.validate(validateData)
      if (error){
        console.log("Invalid request", error)
      }
      else{
        const members= await LogInModel.find()
        const member = members.find(member=> member.username === req.body.username)
        
        if( member==null){
          const result = await LogInModel.insertMany(data)
          res.json(result); 
        }else{
          res.json({error:"User Already Exist"})
        }
      }
    } catch (error) {
      console.log('Error posting the data:', error);
      res.status(500).json({ error: 'Failed to post the data' });
    }
  }else{
    console.log("Invalid email")
    res.status(400).json({ error: 'Invalid email' });
  }


    
  })
  // LOGIN For user
  LoginRouter.post('/LogIn', async (req, res) => {
      const validateData = {
        "username": req.body.username,
        "password": req.body.password
      }
      console.log(req.body)
      const {error,value}=signUpSchema.validate(validateData)
      if (error){
        console.log("Invalid request")
      }
      else{
        const members= await LogInModel.find()
        const member = members.find(member=> member.username === req.body.username)
        console.log(member)
        if( member==null){
          return res.status(400).send("User dont exist")
        }
        try{
          if(await bcrypt.compare(req.body.password, member.password)){
            const token = jwt.sign(member.username, secretKey);
            res.send(member,token)
          } else{
            res.send("Invalid password")
          } 
        }catch(error){
          res.status(500).send()
          console.log(error)
        }
      }
  })

  module.exports={LoginRouter}