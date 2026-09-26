const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const LoginRouter = express.Router();
const {LogInModel}= require('./Model/login');

const loginData = require('./Config/LogInData.json')
const UsersData = require('./Config/UsersData.json');
const Joi = require('joi');
const bcrypt = require('bcrypt')
const secretKey = process.env.SECRET_KEY
const  jwt =  require('jsonwebtoken');

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
  try {
      // Validate the input
      const { error, value } = signUpSchema.validate(req.body);
      if (error) {
          return res.status(400).json({ error: error.details[0].message });
      }
      const { username, password, email } = req.body;
      // Checking if it is kalvium email 
      const KalviumEmail = UsersData.some(e => e.email === email);
      const AlreadyEmail = await LogInModel.findOne({ email });
      if (!KalviumEmail || AlreadyEmail){
          return res.status(400).json({ error: 'Not a valid kalvium mail' });
      }
      // Check if username already exists
      const member = await LogInModel.findOne({ username });
      if (member) {
          return res.status(400).json({ error: "Username already exists" });
      }
      // Hashing the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      // insert new user into logIn database
      const newUser = { username, password: hashedPassword, email };
      const result = await LogInModel.insertMany(newUser);
      // creating token
      const payload = { username: newUser.username, id: result._id };
      const token = jwt.sign(payload, secretKey);
      res.status(201).json({ token });

  } catch (error) {
      console.log('Error posting the data:', error);
      res.status(500).json({ error: 'Failed to post the data' });
  }
});

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
        return res.status(400).send("Invalid username or password format");
      }
      else{
        const member = await LogInModel.findOne({ username: req.body.username });
        console.log(member)
        try{
          if(member && (await bcrypt.compare(req.body.password, member.password))){
            const payload = { username: member.username, id: member._id };
            const token = jwt.sign(payload, secretKey);
            res.json({ token,email: member.email  });
            
          } else{
            return res.status(401).send("Invalid username or password");
          } 
        }catch(error){
          res.status(500).send()
          console.log(error)
        }
      }
  })

  module.exports={LoginRouter} 