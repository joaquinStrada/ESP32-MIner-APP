import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';

const Card = ({ color, value, label, icon }) => {
    return (
        <div className="col-lg-3 col-6">
            <div className={`small-box ${color}`}>
                <div className="inner">
                    <h3>{value}</h3>
                    <p>{label}</p>
                </div>
                <div className="icon">
                    <FontAwesomeIcon icon={icon} />
                </div>
                <NavLink to="#" className="small-box-footer">
                    More info <FontAwesomeIcon icon={faCircleArrowRight} />
                </NavLink>
            </div>
        </div>
    )
}

export default Card