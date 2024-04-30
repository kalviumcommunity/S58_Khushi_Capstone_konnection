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
//Create : Add all kalvians data to mongodb
usersRouter.delete('/postUsers',(req,res)=>{
  usersModel.insertMany(UsersData)
  .then((result) => {
    res.send('Inserted ' + result.length + ' documents into the collection');
  })
.catch((error) => {
   console.error('Error inserting documents:', error);
   res.status(500).json({ error: 'Failed to insert data' });
   });
})

// GET : Display all user data that is in mongodb
usersRouter.get('/Users/', async (req,res)=>{
  try {
    const data= await usersModel.find();
    res.json(data);
  } catch (error) {
    console.log('Error getting the data:', error);
    res.status(500).json({ error: 'Failed to get the data' });
  }
})

// // Delete : Delete all kalvians data
usersRouter.delete('/deleteUsers', async (req,res)=>{
  try { 
      const deleteusers = await usersModel.deleteMany({})
      res.json(deleteusers)
  } catch (error) {
      console.log('Error deleting the data:', error);
      res.status(500).json({ error: 'Failed to delete the data' });
  }
})

module.exports={usersRouter}