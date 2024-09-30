import React, { useState } from 'react';
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [logIn, setLogIn] = useState(true);
  const[cPass,setCpass]=useState("")
  const navigate = useNavigate()
  const [info, setInfo]= useState({
    username:"",
    password:"",
    email:"",
  })
 

  const handleInfoChange = (e, field) => {
    if (field === "username") {
      setInfo({ ...info, username: e.target.value })
    }
    else if (field === "password") {
      setInfo({ ...info, password: e.target.value })
    }
    else {
      setInfo({ ...info, email: e.target.value })
    }
  }
  const handleSignUp=()=>{
    console.log(info)
    if (cPass== info.password){
      axios.post('http://localhost:8080/signUp', info)
    .then((response) => {
        console.log(response.data);
        // localStorage.setItem('konnection.email',response.data.email)
        localStorage.setItem('token',response.data.token)
        navigate('/home')
    })
    .catch((error) => {
        console.log(error);
    });
    }
  }

  const handleSignIn=()=>{
    console.log(info)
    axios.post('http://localhost:8080/LogIn', info)
    .then((response) => {
      // localStorage.setItem('konnection.email',response.data.email)
      localStorage.setItem('token',response.data.token)
        navigate('/home')
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });}

  



  return (
    <div className='flex'>
      <div className='left-login flex flex-dir align-centre '>
      <div className="logo">Konnection</div>
        <div className="signIn flex flex-dir align-centre">
          {logIn? <h1>Sign In To Account</h1>: <h1>Sign Up to Account</h1>}
          
          <div></div>
        </div>
      <div className="login-value flex flex-dir"> 
        <input value={info.username}  onChange={(e)=>handleInfoChange(e,"username")} type='text' placeholder='Username' className="username"></input>
        <input value={info.password}  onChange={(e)=>handleInfoChange(e,"password")} type='password' placeholder='Password' className='password'></input>
        {logIn?<div></div>:<div>
          <input value={cPass} type='password' placeholder='Confirm Password' className='c-password' onChange={(e)=>{setCpass(e.target.value)}}/>
          <input value={info.email} type="email" placeholder='Kalvium mail' className='email' onChange={(e)=>{handleInfoChange(e,"email")}} />
        </div>}
          
        </div>
         
        {logIn?
        <button className='main-btn' onClick={handleSignIn}>SIGN IN</button>: <button className='main-btn' onClick={handleSignUp}>SIGN UP</button>
        }
        
        
        <div className="or-divider flex align-centre">
          <div ></div>
          <span>OR</span>
          <div></div>
        </div>
       
        <div className="google">
          <div className="google-logo"></div>
          {logIn? <p>Sign in with Google</p>: <p>Sign Up with Google</p>}
        </div>
      </div>
      <div className='right-login flex flex-dir align-centre'>
        <h1>Hello User !</h1>
        {logIn?<p>New here? Sign Up and make new connection</p>:<p>Already have a account? Sign In and continue  your journey</p>}
        
        {logIn ? 
          <button className='side-btn' onClick={()=>setLogIn(false)}>SIGN UP</button> :
          <button className='side-btn' onClick={()=>{setLogIn(true)}}>SIGN IN</button>
        }
   
      </div>









      {/* <Link to={`home`}>
      <button>LogIn</button>
      </Link> */}
    </div>

  )
}
 