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
    const {setToken} = useContext(TokenContext);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate()


    const registerUser = async () => {
        let res = await JoblyApi.register(formData);
        setToken(res)
        setUser(formData.username)
        localStorage.setItem("token", res.token)
        localStorage.setItem("currentUser", formData.username)
        navigate(`/users/${formData.username}`, {replace: true})
    }
     
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser();
        setFormData(INITIAL_STATE);
        
    }


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
                    type="password"
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
