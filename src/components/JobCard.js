import React, {} from "react";
import '../styles/Card.css'


const JobCard = ({title, salary, company}) => {

    return (
        <div>
             <div className="card">
                <div className="card-title">
                    <h2>{title}</h2>
                </div>
                <div className='card-body'>
                    <p>Salary: {salary}</p>
                    <p>Company: {company}</p>
                </div>
                
            </div>
        </div>
    )
       
}

export default JobCard;