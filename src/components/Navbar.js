import React, { useEffect, useState } from 'react'
import {  NavLink} from 'react-router-dom'
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


function Navbar() {
    const navigate = useNavigate()
    const [isadmin,setadmin] = useState(false);
    const [islogin,setlogin] = useState(false);
    const jwtToken = Cookies.get('jwtoken');
    const handleLogout = async() => {
      const decoded = jwtDecode(jwtToken);
      const userId = decoded._id;
        try {
          const response = await fetch(`http://localhost:5000/${userId}/logout`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
            },
            'credentials':'include',
              body: JSON.stringify({
              token: Cookies.get('jwtoken'),
            }),
          });
          if (response.ok) {
            console.log('Token revoked successfully.');
          } else {
            console.error('Failed to revoke token.');
          }
        } catch (error) {
          console.error('Error revoking token:', error);
        }

        Cookies.remove('jwtoken');
      navigate('/login')}



    useEffect(()=>{
        if(jwtToken){
            setlogin(true);
            const decoded = jwtDecode(jwtToken);
            if(decoded.Role==='admin'){setadmin(true);}
    
        }
    },[jwtToken])
  return (
    <div className='sticky-top'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark text-primary ">
        <NavLink className="navbar-brand ps-4" to="/">Home</NavLink>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#" /> */}
        <div className="collapse navbar-collapse justify-content-end pe-5" id="navbarNav">
            <ul className="navbar-nav">
                <li className={islogin?"nav-item px-2 fs-5 active":'d-none'}><NavLink className="nav-link" to="/account">Account</NavLink></li>
                <li className={islogin?'d-none':"nav-item px-2 fs-5 active"}><NavLink className="nav-link" to="/login">Login</NavLink></li>
                <li className={islogin?'d-none':"nav-item px-2 fs-5 active"}><NavLink className="nav-link" to="/signup">Register</NavLink></li>
                <li className={islogin?"nav-item px-2 fs-5 active":'d-none'}><NavLink className="nav-link" onClick={handleLogout}>logout</NavLink></li>
            </ul>
        </div>

        </nav>
    </div>
  )
}

export default Navbar
