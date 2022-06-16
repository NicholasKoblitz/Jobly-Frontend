import React, {useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";import JoblyApi from "../api";

const Profile = () => {
 
    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: ''
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [userInfo, setUserInfo] = useState(INITIAL_STATE);
    const [isClicked, setIsClicked] = useState(false)
    const {username} = useParams();

    useEffect(() => {
        async function fetchUser(username) {
            JoblyApi.token = localStorage.getItem("token")
            let res = await JoblyApi.getUser(username)
            setUserInfo({firstName: res.firstName, lastName: res.lastName, email: res.email})
        }
        fetchUser(username)
    }, [])


    const update = async (username, info) => {
        JoblyApi.token = localStorage.getItem("token")
        let res = await JoblyApi.updateUser(username, formData)
        setUserInfo(res)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        update(username, formData)
        setFormData(INITIAL_STATE);
        setIsClicked(!isClicked)
        
    }

    const handleClick = () => {
        setIsClicked(!isClicked)
    }
    

    return (
        <div>
            {isClicked ? 
                <div>
                    <form onSubmit={handleSubmit}>
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
                <button>Update</button>
                    </form>
                
                </div>
                :
                <div>
                    <button onClick={handleClick}>Update Information</button>
                    <h2>{username}</h2>
                    <p>{userInfo.firstName}</p>
                    <p>{userInfo.lastName}</p>
                    <p>{userInfo.email}</p>
                </div>}

        </div>
    )
}

export default Profile;