import React from 'react';
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Requests() {
  return (
    <div className='request-bg'>
      <Link to={`home`}>
        <button>back</button>
      </Link>   
    </div>
  )}
  