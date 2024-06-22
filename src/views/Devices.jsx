import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formValidate } from '../utils/formValidate'
import InputDevice from '../components/InputDevice'
import { MinersContext } from '../context/MinersProvider'

const Devices = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const minersContext = useContext(MinersContext)
  const [ formError, setFormError ] = useState(null)

  const onSubmit = async data => {
    try {
      const newMiner = await minersContext.createMiner(data)

      if (newMiner) {
        setFormError({
          state: 'success',
          message: 'Minero creado satisfactoriamente'
        })

        setTimeout(() => setFormError(null), 5000)
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setFormError({
          state: 'danger',
          message: err.response.data.message
        })
      } else {
        console.error(err)
      }
    }
  }

  return (
    <div>
      <div className="card card-success">
        <div className="card-header">
          <h3 className="card-title">
            Agregar Dispositivos
          </h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body">
            {
              formError &&
              (
                <div className={`alert alert-${formError.state}`} role="alert">
                  {formError.message}
                </div>
              )
            }
            <InputDevice
              type="text"
              placeholder="Nombre"
              id="name"
              error={errors.name}
              {...register('name', {
                required: formValidate.required,
                minLength: formValidate.minLength(6),
                maxLength: formValidate.maxLength(50)
              })}
            />
            <div className="form-group">
              <label htmlFor="description">Descripcion:</label>
              <textarea
                col="2"
                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                placeholder="Descripcion"
                id="description"
                aria-invalid={errors.description ? 'true' : 'false'}
                {...register('description', {
                  required: formValidate.required,
                  minLength: formValidate.minLength(6),
                  maxLength: formValidate.maxLength(400)
                })}
              ></textarea>
              {
                errors.description &&
                <span className="error invalid-feedback">{errors.description.message}</span>
              }
            </div>
            <InputDevice
              type="text"
              placeholder="Serie"
              id="serie"
              error={errors.serie}
              {...register('serie', {
                required: formValidate.required,
                minLength: formValidate.minLength(1),
                maxLength: formValidate.maxLength(5)
              })}
            />
            <InputDevice
              type="password"
              placeholder="Contraseña"
              id="password"
              error={errors.password}
              {...register('password', {
                required: formValidate.required,
                minLength: formValidate.minLength(8),
                maxLength: formValidate.maxLength(20)
              })}
            />
            <InputDevice
              type="text"
              placeholder="Url de la pool"
              id="poolUrl"
              error={errors.poolUrl}
              {...register('poolUrl', {
                required: formValidate.required,
                minLength: formValidate.minLength(6),
                maxLength: formValidate.maxLength(100)
              })}
            />
            <InputDevice
              type="number"
              placeholder="Puerto de la pool"
              id="poolPort"
              error={errors.poolPort}
              {...register('poolPort', {
                required: formValidate.required,
                valueAsNumber: formValidate.asNumber,
                validate: {
                  minNumber: formValidate.minNumber(1),
                  maxNumber: formValidate.maxNumber(65535)
                }
              })}
            />
            <InputDevice
              type="text"
              placeholder="Direccion de la wallet"
              id="walletAddress"
              error={errors.walletAddress}
              {...register('walletAddress', {
                required: formValidate.required,
                minLength: formValidate.minLength(6),
                maxLength: formValidate.maxLength(255)
              })}
            />
          </div>
          <div className="card-footer d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Agregar
            </button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default Devices