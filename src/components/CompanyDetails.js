import React, {useState, useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import JoblyApi from '../api';
import UserContext from "./UserContext";

const CompanyDetails = () => {

    const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
    const [company, setCompany] = useState(null)
    const {handle} = useParams()
    const user = localStorage.getItem("currentUser");
    const navigate = useNavigate();


    useEffect(() => {
        function auth() {
            if(user === '') {
                navigate('/', {replace: false})
            }
        }
        auth()
    }, [])

    useEffect(() => {
        async function fetchCompany(handle) {
            let result = await JoblyApi.getCompany(handle)
            setCompany(result)
        }
        fetchCompany(handle);
    },[])

    


    let details = company ? 
    <>
        <h2>{company.name}</h2>
            <section>
                <p>Number of Employees: {company.numEmployees}</p>
                <p>Description: {company.description}</p>
                <img src={company.logoUrl} alt={`${company.name} logo`} />
                <h3>Jobs Offered by {company.name}</h3>
                <ul>
                    {company.jobs.map(job => <li key={job.id}>{job.title}</li>)}
                </ul>
                
            </section> 
    </> :
    null;

    return (
        <div className="company">
            {details}
        </div>
    )

}

export default CompanyDetails;