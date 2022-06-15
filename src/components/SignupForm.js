import React, {useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import TokenContext from "./TokenContext";
import UserContext from "./UserContext";
import '../styles/SignupForm.css'


const SignupForm = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const INITIAL_STATE = {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [userInfo, setUserInfo] = useState(INITIAL_STATE);
    const {setToken} = useContext(TokenContext);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate()
    
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let info = {...formData}
        setUserInfo(info)
        setFormData(INITIAL_STATE);
        
    }


    useEffect(() => {
        async function registerUser() {
            let res = await JoblyApi.register(userInfo);
            setToken(res)
            setUser(userInfo.username)
            localStorage.setItem("token", res.token)
            localStorage.setItem("currentUser", userInfo.username)
            navigate(`/users/${userInfo.username}`, {replace: true})
        }
        registerUser();
    },[userInfo])


    return (
        <div className="signup">
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <label htmlFor="firstName">First Name</label>
                <input 
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
                <label htmlFor="lastName">Last Name</label>
                <input 
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input 
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                
                <button>Join</button>
            </form>
        </div>
    )

}

export default SignupForm;
