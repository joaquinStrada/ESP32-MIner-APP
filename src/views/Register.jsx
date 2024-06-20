import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import AuthInput from '../components/AuthInput'
import { useForm } from 'react-hook-form'
import { formValidate } from '../utils/formValidate'
import { config } from '../utils/config'
import { ApiUser } from '../utils/api'
import { UserContext } from '../context/UserProvider'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock'

const Register = () => {
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors }
    } = useForm()
    
    const userContext = useContext(UserContext)
    const [ formError, setFormError ] = useState(null)

    const onSubmit = async data => {
        const { fullname, email, user, password, image } = data
        const formData = new FormData()

        formData.append('fullname', fullname)
        formData.append('email', email)
        formData.append('user', user)
        formData.append('password', password)

        if (image.length > 0) {
            formData.append('image', image[0], image[0].name)
        }

        try {
            const { data } = await ApiUser.post('/register', formData)

            if (!data.error) {
                const { accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken } = data.data        
                userContext.login(accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken, true)
                setFormError(null)
                window.location.href = '/'
            }
        } catch (err) {
            if (err.response?.data?.error) {
               setFormError(err.response.data.message)
            } else {
                console.error(err)
            }
        }
    }

    return (
        <div className="hold-transition register-page">
            <div className="register-box">
                <div className="card card-outline card-primary">
                    <div className="card-header text-center">
                        <NavLink to="/" className="h1">
                            <b>ESP32</b>Miner
                        </NavLink>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Registrarse</p>
                        <form className="mb-2" onSubmit={handleSubmit(onSubmit)}>
                            { formError && 
                                (
                                    <div className="alert alert-danger" role="alert">
                                        {formError}
                                    </div>
                                )
                            }
                            <AuthInput
                                type="text"
                                placeholder="Nombre completo"
                                icon={faUser}
                                error={errors.fullname}
                                {...register('fullname', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(6),
                                    maxLength: formValidate.maxLength(100)
                                })}
                            />
                            <AuthInput
                                type="text"
                                placeholder="Correo"
                                icon={faEnvelope}
                                error={errors.email}
                                {...register('email', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(6),
                                    maxLength: formValidate.maxLength(255),
                                    pattern: formValidate.patternEmail
                                })}
                            />
                            <AuthInput
                                type="text"
                                placeholder="Usuario"
                                icon={faUser}
                                error={errors.user}
                                {...register('user', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(6),
                                    maxLength: formValidate.maxLength(50)
                                })}
                            />
                            <AuthInput
                                type="password"
                                placeholder="Contraseña"
                                icon={faLock}
                                error={errors.password}
                                {...register('password', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(8),
                                    maxLength: formValidate.maxLength(20)
                                })}
                            />
                            <AuthInput
                                type="password"
                                placeholder="Repetir Contraseña"
                                icon={faLock}
                                error={errors.rePassword}
                                {...register('rePassword', {
                                    required: formValidate.required,
                                    minLength: formValidate.minLength(8),
                                    maxLength: formValidate.maxLength(20),
                                    validate: value => value === getValues('password') || 'Las contraseñas no coinciden'
                                })}
                            />
                            <div className="mb-3">
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            className="custom-file-input"
                                            id="image-profile"
                                            {...register('image', {
                                                validate: value => {
                                                    if (value === undefined || value.length === 0) {
                                                        return true
                                                    }

                                                    const ext = value[0].name.split('.').pop()

                                                    if (!config.imageProfile.exts.includes(ext)) {
                                                        return 'Formato de archivo invalido'
                                                    } else {
                                                        return true
                                                    }
                                                }
                                            })}
                                        />
                                        <label className="custom-file-label" htmlFor="image-profile">
                                            Elegir archivo
                                        </label>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text">Subir</span>
                                    </div>
                                </div>
                                {errors.image &&
                                    (<p style={{
                                        display: 'block',
                                        fontSize: '18px',
                                        color: '#f00',
                                        margin: '1px 5px 0px 0px'
                                    }}>{errors.image.message}</p>)}
                            </div>
                            <div className="row justify-content-end">
                                <div className="col-8">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Registrarse
                                    </button>
                                </div>
                            </div>
                        </form>
                        <NavLink to="/login" className="text-center">
                            Iniciar Sesion
                        </NavLink>
                    </div>
                    {/* /.form-box */}
                </div>
                {/* /.card */}
            </div>
            {/* /.card */}
        </div>
    )
}

export default Register