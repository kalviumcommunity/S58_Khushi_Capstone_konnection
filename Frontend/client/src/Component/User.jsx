import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${id}`).then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    data && 
    <div className='user-pg flex flex-dir align-centre'>
      <div className='user-header flex flex-dir align-centre justify-centre '>
        <div className='username'>{data.username}</div> 
        <div className='user-under '></div>
      </div>
      <div className=' flex align-centre user-mid-sec'>
        <div className='user-pfp flex align-centre justify-centre '>
          <img  src={data.pfp_url} alt="" />
        </div>
        <div className='bio-display'>{data.bio}</div>
      </div>
      <div>
        <button className='konnect-btn'>Make Konnection</button>
      </div>

      
     
        
    </div>)}
