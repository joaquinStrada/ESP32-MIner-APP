import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGauge } from '@fortawesome/free-solid-svg-icons'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons/faMicrochip'

const Sidebar = () => {
    const userContext = useContext(UserContext)

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <NavLink to="/" className="brand-link">
                <img
                    src="dist/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".8" }}
                />
                <span className="brand-text font-weight-light">ESP32Miner</span>
            </NavLink>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        {
                            userContext.User?.imageSmall &&
                            <img
                                src={userContext.User.imageSmall}
                                className='img-circle elevation-2'
                                alt='Image user'
                            />
                        }
                    </div>
                    <div className="info">
                        <NavLink to="#" className="d-block">
                            {userContext.User?.fullname}
                        </NavLink>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                <FontAwesomeIcon icon={faGauge} className="nav-icon" />
                                <p>Dashboard</p>
                            </NavLink>
                            <NavLink to="/devices" className="nav-link">
                                <FontAwesomeIcon icon={faMicrochip} className="nav-icon" />
                                <p>Dispositivos</p>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    )
}

export default Sidebar