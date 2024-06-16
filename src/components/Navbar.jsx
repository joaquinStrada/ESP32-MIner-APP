import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to="#" className="nav-link" data-widget="pushmenu" role="button">
                        <i className="fas fa-bars" />
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar