import './App.css'
import Home from "./Component/Home";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './Component/Profile'
import Login from './Component/Login';
import User from './Component/User';
import Requests from './Component/Requests';

function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route exact path='/home' Component={Home}/>
        <Route exact path='/user/:id' Component={User}/>
        <Route exact path='/profile/:id' Component={Profile}/>
        <Route exact path='/requests' Component={Requests}/>
        
      </Routes>
    
    </BrowserRouter>
    
    
    </>
  )
}

export default App
