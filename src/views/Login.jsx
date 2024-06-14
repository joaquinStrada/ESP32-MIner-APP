import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import { useForm } from 'react-hook-form'
import { formValidate } from '../utils/formValidate'
import { ApiUser } from '../utils/api'
import { UserContext } from '../context/UserProvider'

const Login = () => {
    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm()
    const userContext = useContext(UserContext)
    const [ formError, setFormError ] = useState(null)

    const onSubmit = async formData => {
        try {
            const { data } = await ApiUser.post('/login', formData)

            if (!data.error) {
                const { accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken } = data.data
                userContext.login(accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken, formData.remember)
                setFormError(null)
                window.location.href = '/'
            }
        } catch (err) {
            if (err.response?.data?.error) {
                setFormError(err.response.data.message)
            } else {
                console.error(err);
            }
        }
    }

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center h1">
                        <b>ESP32</b>Miner
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Iniciar Session</p>
                        <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                            {formError &&
                                (
                                    <div className="alert alert-danger" role="alert">
                                        {formError}
                                    </div>
                                )
                            }
                            <AuthInput
                                type="text"
                                placeholder="Usuario"
                                icon="fas fa-user"
                                error={errors.user}
                                {...register('user', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(6),
                                    maxLength: formValidate.maxLength(255)
                                })}
                            />
                            <AuthInput
                                type="password"
                                placeholder="Contraseña"
                                icon="fas fa-lock"
                                error={errors.password}
                                {...register('password', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(8),
                                    maxLength: formValidate.maxLength(20)
                                })}
                            />
                            <div className="row">
                                <div className="col-6">
                                    <div className="icheck-primary">
                                        <input 
                                            type="checkbox"
                                            id="remember"
                                            {...register('remember')}
                                        />
                                        <label htmlFor="remember">Recordame</label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-6">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Inciar Session
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