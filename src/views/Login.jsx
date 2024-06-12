import React from 'react'
import { NavLink } from 'react-router-dom'

const Login = () => {
    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center h1">
                        <b>ESP32</b>Miner
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Iniciar Session</p>
                        <form className="mb-2" method="post">
                            <div className="input-group mb-3">
                                <input type="email" className="form-control" placeholder="Email" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-8">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Iniciar Sesion
                                    </button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <p className="mb-0">
                            <NavLink to="/register" className="text-center">
                                Crear una cuenta
                            </NavLink>
                        </p>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>
        </div>
    )
}

export default Login