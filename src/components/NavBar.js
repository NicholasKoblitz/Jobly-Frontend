import React, { useContext, useState } from "react";
import {NavLink} from 'react-router-dom'
import '../styles/Navbar.css'
import TokenContext from "./TokenContext";
import UserContext from "./UserContext";


const NavBar = () => {

    const {setToken} = useContext(TokenContext);
    const user = localStorage.getItem("currentUser")
    const {setUser} = useContext(UserContext)
    let logedin = localStorage.getItem("token") ?  true : false

    const removeToken = () => {
        setToken('');
        setUser('')
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
    }

    return (
        <div className='navbar'>
            <div className="navbar-title">
                <NavLink to="/">Jobly</NavLink>
            </div> 
            <div className="navbar-links">
               {logedin ? 
                <div className="navbar-signin-login">
                    <NavLink to={`/users/${user}`}>{user}</NavLink>  <NavLink to='/' onClick={removeToken}>Logout</NavLink>
                </div> :
                <div className="navbar-signin-login">
                    <NavLink to='/signup'>Sign Up</NavLink> / <NavLink to="/login">Login</NavLink>
                </div>
                }
                <div className="navbar-navigate">
                    <NavLink to="/companies">Companies</NavLink>
                    <NavLink to="/jobs">Jobs</NavLink>
                </div>
                
            </div>
        </div>
    )

}

export default NavBar;