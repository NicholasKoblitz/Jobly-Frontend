import React, {useState, useEffect, useContext,} from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "../api";
import TokenContext from "./TokenContext";
import UserContext from "./UserContext";
import '../styles/LoginForm.css'


const LoginForm = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const INITIAL_STATE = {
        username: '',
        password: ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const {setToken} = useContext(TokenContext);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();


    const loginUser = async () => {
        let res = await JoblyApi.auth(formData);
        setToken(res)
        setUser(formData.username)
        localStorage.setItem("token", res.token)
        localStorage.setItem("currentUser", formData.username)
        navigate(`/users/${formData.username}`, {replace: false})
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
        await loginUser();
        setFormData(INITIAL_STATE);
    }


    return (
        <div className="login">
            <form className="login-form" onSubmit={handleSubmit}>
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
                <button>Login</button>
            </form>
        </div>
    )

}

export default LoginForm;