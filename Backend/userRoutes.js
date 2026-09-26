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
// usersRouter.delete('/postUsers',(req,res)=>{
//   usersModel.insertMany(UsersData)
//   .then((result) => {
//     res.send('Inserted ' + result.length + ' documents into the collection');
//   })
// .catch((error) => {
//    console.error('Error inserting documents:', error);
//    res.status(500).json({ error: 'Failed to insert data' });
//    });
// })

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

// get filtered user based on squad
usersRouter.get('/Users/squad/:squad', async (req,res)=>{
  try {
    const squadId = req.params.squad;  // Get squad ID from URL parameters
    const users = await usersModel.find({ squad: squadId });
    res.status(200).json(users);  // Send the retrieved users data
} catch (error) {
    res.status(500).json({ message: "Error retrieving users", error: error.message });
}
})

// get a particuler user based on email
usersRouter.get('/Users/:email', async (req,res)=>{
  try {
    const user = await usersModel.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  }catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



// // Delete : Delete all kalvians data
usersRouter.delete('/deleteUsers/', async (req,res)=>{
  try { 
      const deleteusers = await usersModel.deleteMany({})
      res.json(deleteusers)
  } catch (error) {
      console.log('Error deleting the data:', error);
      res.status(500).json({ error: 'Failed to delete the data' });
  }
})
 
// Delete : Deleting Any One Kalvian
usersRouter.delete('/user/:id', async (req,res)=>{
  try { 
      const deletedata = await usersModel.findByIdAndDelete(req.params.id);
      res.json(deletedata);
  } catch (error) {
      console.log('Error deleting the data:', error);
      res.status(500).json({ error: 'Failed to delete the data' });
  }
})

// updating the value of bio and profile
usersRouter.put('/user/:id/update', async (req, res) => {
  try {
    const updateFields = {};
    if (req.body.bio) {
      updateFields.bio = req.body.bio;
    }
    if (req.body.image) {
      updateFields.pfp_url = req.body.image;
    }
    const updatedData = await usersModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedData);
  } catch (error) {
    console.log('Error updating the data:', error);
    res.status(500).json({ error: 'Failed to update the data' });
  }
});


// get a perticular user
usersRouter.get('/user/:id', async (req,res)=>{
  try {
    const data= await usersModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    console.log('Error getting the data:', error);
    res.status(500).json({ error: 'Failed to get the data' });
  }
})


// Adding all user Logged into login database
usersRouter.post('/postlogin',(req,res)=>{
  LogInModel.insertMany(UsersData)
  .then((result) => {
    res.send('Inserted ' + result.length + ' documents into the collection');
  }) 
.catch((error) => {
   console.error('Error inserting documents:', error);
   res.status(500).json({ error: 'Failed to insert data' });
   });
})



module.exports={usersRouter}