import React, {useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";import JoblyApi from "../api";

const Profile = () => {
 
    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: ''
    }
    
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [userInfo, setUserInfo] = useState(INITIAL_STATE);
    const [updateInfo, setUpdateInfo] = useState(INITIAL_STATE)
    const [isClicked, setIsClicked] = useState(false)
    const {username} = useParams();
    let isAfterFirstRender = useRef(false);



    useEffect(() => {
        async function fetchUser(username) {
            JoblyApi.token = localStorage.getItem("token")
            let res = await JoblyApi.getUser(username)
            setUserInfo({firstName: res.firstName, lastName: res.lastName, email: res.email})
        }
        fetchUser(username)
    }, [])


    useEffect(() => {
        if(isAfterFirstRender.current) {
            async function update(username, userInfo) {
                JoblyApi.token = localStorage.getItem("token")
                let res = await JoblyApi.updateUser(username, userInfo)
                setUserInfo(res)
            }
            update(username, updateInfo)
        }
        else {
            isAfterFirstRender.current = true;
        }
    }, [updateInfo])


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
        setUpdateInfo(info)
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
                    <button onClick={handleClick}>Back</button>
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