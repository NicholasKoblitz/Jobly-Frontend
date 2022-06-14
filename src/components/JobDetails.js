import React, {useState, useEffect, useContext, useRef} from "react";
import { useParams } from "react-router-dom";
import JoblyApi from '../api';

const JobDetails = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const [job, setJob] = useState()
    const {id} = useParams()
    const user = localStorage.getItem("currentUser");
    const [apply, setApply] = useState(false)
    const [isRendered, setIsRendered] = useState(false)
    let applyList = JSON.parse(localStorage.getItem("applied"))
    let isApplied = applyList.filter(a => +id === a)

    useEffect(() => {
        async function fetchJob(id) {
            let result = await JoblyApi.getJob(id)
            setJob(result)
        }
        fetchJob(id);
    },[])

    useEffect(() => {
        async function applyForJob(user, id, data) {  
            JoblyApi.token = localStorage.getItem("token")  
            let res = await JoblyApi.apply(user, data, id);
            applyList.push(res.applied);
            localStorage.setItem("applied", JSON.stringify(applyList))
            setIsRendered(false)
        }
        if(isRendered) {
            applyForJob(user, {}, id)
        }
        else {
            setIsRendered(true)
        }   
    },[apply])

    const handleClick = () => {
        setApply(!apply)
    }



    let details = job ? 
        <>
            <h2>{job.title}</h2>
            <section>
                <p>Company: {job.company.name}</p>
                <p>Salary: {job.salary}</p>
                {job.equity ? 
                <p>Equity: {job.equity}</p>
                 : 
                 null}
                 {isApplied[0] === +id ? <p>Applied</p> : <button onClick={handleClick}>Click to Apply</button>}
            </section>
        </> :  
        null;

    return (
        
        <div className="job">
            {details}
        </div>
    )

}

export default JobDetails;