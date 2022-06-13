import React, {} from "react";
import '../styles/Card.css'


const CompanyCard = ({handle, name, numEmployees}) => {

    return (
        <div>
            <div className="card">
                <div className="card-title">
                    <h2>{name}</h2>
                </div>
                <div className="card-body">
                    <p>Company Handle: {handle}</p>
                    <p>Number of Employees: {numEmployees}</p>
                </div>          
            </div>
        </div>
        
    )
}

export default CompanyCard;