import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { formValidate } from '../utils/formValidate'
import InputDevice from '../components/InputDevice'
import { MinersContext } from '../context/MinersProvider'
import DataTable from '../components/DataTable'
import RowMinerDevices from '../components/RowMinerDevices'
import Swal from 'sweetalert2'

const Devices = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm()
  const { createMiner: createMinerApi, Miners, CountMiners, getMiner, deleteMiner: deleteMinerApi, updateMiner: updateMinerApi } = useContext(MinersContext)
  const [ formError, setFormError ] = useState(null)
  const [ columnsTable, setColumnsTable ] = useState([
    {
      name: 'Id',
      property: 'id',
      enabled: true
    },
    {
      name: 'Fecha de creacion',
      property: 'createdAt',
      enabled: true
    },
    {
      name: 'Nombre',
      property: 'name',
      enabled: true
    },
    {
      name: 'Descripcion',
      property: 'description',
      enabled: true
    },
    {
      name: 'Serie',
      property: 'serie',
      enabled: true
    },
    {
      name: 'Topico Base',
      property: 'baseTopic',
      enabled: true
    },
    {
      name: 'Url de la Pool',
      property: 'poolUrl',
      enabled: true
    },
    {
      name: 'Puerto de la Pool',
      property: 'poolPort',
      enabled: true
    },
    {
      name: 'Direccion de la billetera',
      property: 'walletAddress',
      enabled: true
    },
    {
      name: 'Ultima conexion',
      property: 'conected',
      enabled: true
    },
    {
      name: 'Acciones',
      property: 'actions',
      enabled: true
    }
  ])
  const [ editId, setEditId ] = useState(null)

  const onSubmit = data => {
    if (editId) {
      updateMiner(data)
    } else {
      createMiner(data)
    }
  }

  const createMiner = async data => {
    try {
      const newMiner = await createMinerApi(data)

      if (newMiner) {
        setFormError({
          state: 'success',
          message: 'Minero creado satisfactoriamente'
        })

        setTimeout(() => {
          setFormError(null)
          reset()
        }, 3000)
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

  const onUpdateMiner = async id => {
    try {
      const { data: miner } = await getMiner(id)

      // Seteamos los valores en el formulario
      setEditId(miner.id)
      setValue('name', miner.name)
      setValue('description', miner.description)
      setValue('serie', miner.serie)
      setValue('poolUrl', miner.poolUrl)
      setValue('poolPort', miner.poolPort)
      setValue('walletAddress', miner.walletAddress)
    } catch (err) {
      console.error(err)
    }
  }

  const onDeleteMiner = async id => {
    try {
      const miner = await getMiner(id)

      // Verificamos si el usuario realmente quiere eliminar el minero
      const { isConfirmed } = await Swal.fire({
        title: 'Eliminar minero',
        text: `¿Esta seguro de eliminar el minero: ${String(miner.data.name).toUpperCase()}?`,
        icon: 'question',
        confirmButtonText: 'Eliminar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        customClass: {
          confirmButton: 'btn btn-danger',
          cancelButton: 'btn btn-secondary'
        }
      })

      if (!isConfirmed) return

      // Eliminamos el minero
      const minerDeleted = await deleteMinerApi(id)

      // Le avisamos al usuario que su minero fue eliminado
      Swal.fire({
        title: 'Minero eliminado',
        text: minerDeleted.message,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true
      })
    } catch (err) {
      console.error(err)
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        timer: 3000,
        timerProgressBar: true
      })
    }
  }

  const updateMiner = async data => {
    try {
      const editMiner = await updateMinerApi(editId, data)

      if (editMiner) {
        setFormError({
          state: 'success',
          message: 'Minero editado satisfactoriamente'
        })

        setTimeout(() => {
          setFormError(null)
          reset()
          setEditId(null)
        }, 3000)
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
      <div className={`card card-${editId ? 'info' : 'success'}`}>
        <div className="card-header">
          <h3 className="card-title">
            {editId ? 'Editar' : 'Agregar'} Dispositivos
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
                required: editId ? false : formValidate.required,
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
              {editId ? 'Editar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>

      <DataTable
        title="Mineros"
        columnsTable={columnsTable}
        setColumnsTable={setColumnsTable}
        data={Miners}
        countData={CountMiners}
        Row={RowMinerDevices}
        onEdit={onUpdateMiner}
        onDelete={onDeleteMiner}
      />
    </div>
  )
}

export default Devices