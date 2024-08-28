import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectSquad, setSelectSquad] = useState(false);
  const [displayingUser, setDisplayingUser] = useState(false);
  // const [currentUser, setCurrentUser]=useState('')
  const navigate = useNavigate()
  const Squads = [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61];
  const email = localStorage.getItem('konnection.email')
  console.log(email)
  useEffect(() => {
    axios.get('http://localhost:8080/Users/')
      .then((response) => {
        setUsers( response.data) ;
        console.log(response.data) ;
      })
      .catch((error) => {
        console.log(error);
      });
  }, [] ); 
  const handleProfile=()=>{
    const current=users.filter(ele=> ele.email===email )
    console.log(current, email)
    navigate(`/profile/${current[0]._id}`)}

  const handleSquad = (squad) => {
    setDisplayingUser(true);
    setFilteredUsers(users.filter((user) => user.squad === squad));
  };

  return (
    <div className='home-pg'>
      <div className='flex justify-centre'>
        <div className='select-squad-bx flex align-centre justify-centre' onClick={() => {
          setSelectSquad(true);
          setDisplayingUser(false);
        }}>
          SELECT SQUAD
        </div>
      </div>

      {displayingUser ? (
        <div className='selectedUsers'>
          {filteredUsers.map((user) => (
            <Link to={`/user/${user._id}`} key={user._id}>
              <div className='user-block'>
                <div className='user-pfp flex align-centre justify-centre'>
                  <img src={user.pfp_url} alt={`${user.username}'s profile`} />
                </div>
                <h5>{user.username}</h5>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          {selectSquad ? (
            <div>
              <div className='flex align-centre justify-centre'>
                <div className='flex flex-dir align-centre selection-bxs'>
                  <div className='upper-sel-bx selection-bx'></div>
                  <div className='lower-sel-bx selection-bx'></div>
                </div>
                <div  className='squads-tile'>
                    { Squads.map((squad) => (
                      <div key={squad} onClick={() => handleSquad(squad)}>
                        <div className='squad-tile flex align-centre justify-centre'>
                          Squad {squad}
                        </div>
                      </div>
                    ))} 
                </div>
              </div>
            </div>
          ) : (
            <div className='circle-belt flex align-centre justify-centre'>
              
                <div className='home-profile-box flex align-centre justify-centre' onClick={handleProfile}>PROFILE</div>
             
              <Link to={`/Requests`}>
                <div className='home-req-box flex align-centre justify-centre'>REQUESTS</div>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
