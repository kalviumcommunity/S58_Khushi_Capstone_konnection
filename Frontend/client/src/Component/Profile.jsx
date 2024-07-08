import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function profile() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [bio,setBio]=useState(data.bio)

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
        setData(res.data);
        setBio(res.data.bio)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSave=()=>{
    axios.put(`http://localhost:8080/user/${id}/bio`,{bio}).then((res)=>{
      console.log(res.data)
    }).catch((error)=>{
      console.log("Error :", error)
    })
  }

  return (
    // data && 
    <div className='user-pg flex flex-dir align-centre'>
      <div className='user-header flex flex-dir align-centre justify-centre '>
        <div className='username'>{data.username}</div> 
        <div className='user-under '></div>
      </div>
      <div className=' flex align-centre user-mid-sec'>
        <div className='user-pfp flex align-centre justify-centre '>
          <div className='pfp-upload flex align-centre justify-centre '>Upload Picture</div>
        </div>
        <div className='bio-display '>
          <div className='bio-heading' >Describe yourself in few words</div>
          <div className='divider'></div>
          <textarea onChange={(e)=>{setBio(e.target.value);}} name="" id="" className='' value={bio}></textarea>
        </div>
      </div>
      <div>
        <button onClick={handleSave} className='konnect-btn save-btn'>Save</button>
      </div>

      
     
        
    </div>
  )
}
