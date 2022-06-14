import React, {useState, useEffect, useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import JobliApi from '../api';
import JobCard from "./JobCard";
import UserContext from "./UserContext";
import '../styles/Jobs.css'

const Jobs = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const [jobs, setJobs] = useState([]);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        function auth() {
            if(!localStorage.getItem("currentUser")) {
                navigate('/', {replace: false})
            }
        }
        auth()
    }, [])

    useEffect(() => {
        async function fetchCompanies() {
            let results = await JobliApi.getJobs();
            setJobs(results);
        }
        fetchCompanies();
    }, [])

    return (
        <div className="jobs">
            
            {jobs.map(job => 
            <Link to={`/jobs/${job.id}`} key={job.id}>
                 <JobCard
                    title={job.title}
                    salary={job.salary}
                    company={job.companyName}
                    
                />
            </Link>
            )}
        </div>
        
    )

}

export default Jobs;