import React, {useEffect, useState, useContext} from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import JobliApi from '../api';
import CompanyCard from "./CompanyCard";
import '../styles/Companies.css'
import UserContext from "./UserContext";

const Companies = () => {

    const INITAL_STATE = {
        name: '',
        minEmployees: '',
        maxEmployees: ''
    }
    const [companies, setCompanies] = useState([]);
    const [inputData, setInputData] = useState(INITAL_STATE);
    const [search, setSearch] = useSearchParams();
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
            let results = await JobliApi.getCompanies(search);
            setCompanies(results);
        }
        fetchCompanies();
    }, [search])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInputData({
            ...inputData,
            [name]: value
        })
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if(inputData.name === '') {
            delete inputData.name;
        }
        if(inputData.minEmployees === '') {
            delete inputData.minEmployees
        }
        if(inputData.maxEmployees === '') {
            delete inputData.maxEmployees
        }

        setSearch(inputData);
        setInputData(INITAL_STATE)

    }


    return (
        <div className="companies">
            <form onSubmit={handleSubmit}>
                <input 
                    type="search" 
                    name="name"
                    value={inputData.name}
                    onChange={handleChange}
                    placeholder="Company Name"
                    />
                <input 
                    type="text"
                    name="minEmployees"
                    value={inputData.minEmployees}
                    onChange={handleChange}
                    placeholder="Minimun Employees"
                />
                <input 
                    type="text"
                    name="maxEmployees"
                    value={inputData.maxEmployees}
                    onChange={handleChange}
                    placeholder="Maximun Employees"
                />
                <button>Search</button>
            </form>
            <div>
                {companies.map(company => 
                    <Link to={`/companies/${company.handle}`} key={company.handle}>
                        <CompanyCard
                            handle={company.handle} 
                            name={company.name}
                            numEmployees = {company.numEmployees}
                    
                        />
                    </Link>
                )}
            </div>
            
            
        </div>
    )

}

export default Companies;