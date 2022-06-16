import React, {useState} from "react";
import '../styles/Card.css'
import JoblyApi from "../api";


const JobCard = ({id, title, salary, company}) => {


    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const user = localStorage.getItem("currentUser");
    let applyList = JSON.parse(localStorage.getItem("applied")) || [];
    let isApplied = applyList.filter(a => +id === a)

    const [apply, setApply] = useState(() => {
        if(isApplied[0] === +id) {
            return true;
        }
        else {
            return false;
        }
    })


    const applyForJob = async (user, id) => {
        JoblyApi.token = localStorage.getItem("token")  
        let res = await JoblyApi.apply(user, id);
        applyList.push(res.applied);
        localStorage.setItem("applied", JSON.stringify(applyList))
    }

    const handleClick = () => {
        setApply(true)
        applyForJob(user, id)
        
    }

    return (
        <div>
             <div className="card">
                <div className="card-title">
                    <h2>{title}</h2>
                </div>
                <div className='card-body'>
                    <p>Salary: {salary}</p>
                    <p>Company: {company}</p>
                    {apply ? <p>Applied</p> : <button onClick={handleClick} className="apply">Click to Apply</button>}
                </div>
                
            </div>
        </div>
    )
       
}

export default JobCard;