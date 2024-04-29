const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const usersRouter = express.Router();
const {usersModel}= require('./Model/users');
const UsersData = require('./Config/UsersData.json');




//Create : Add all user data to mongodb
usersRouter.post('/postUsers',(req,res)=>{
    usersModel.insertMany(UsersData)
    .then((result) => {
      res.send('Inserted ' + result.length + ' documents into the collection');
    })
  .catch((error) => {
     console.error('Error inserting documents:', error);
     res.status(500).json({ error: 'Failed to insert data' });
     });
  })

module.exports={usersRouter}