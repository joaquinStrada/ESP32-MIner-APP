/* eslint-disable eqeqeq */
import React, { createContext, useContext, useEffect, useState } from 'react'
import mqtt from 'mqtt'
import { config } from '../utils/config'
import { UserContext } from './UserProvider'
import { ApiMiner } from '../utils/api'

export const MinersContext = createContext()

const MinersProvider = ({ children }) => {
    const [ Miners, setMiners ] = useState(null)
    const [ CountMiners, setCountMiners ] = useState(0)
    const [ clientMqtt, setClientMqtt ] = useState(null)
    const { AccessToken, User } = useContext(UserContext)

    const getMiners = async () => {
        try {
            const { data } = await ApiMiner.get('/', {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })

            if (data.error) return

            const { count, data: dataMiners } = data

            // Adaptamos el objeto dataMiners
            /*
            {
                "validShares": 0,
                "invalidShares": 123933229,
                "memory": 29.57999992,
                "memoryPsram": 0,
                "disk": 0,
                "red": 68,
                "hashrate": 0
            }
            */
            const miners = dataMiners.map(miner => ({
                ...miner,
                validShares: 0,
                invalidShares: 0,
                memory: 0,
                memoryPsram: 0,
                disk: 0,
                red: 0,
                hashrate: 0
            }))

            // Actualizamos el estado
            setCountMiners(count)
            setMiners(miners)
        } catch (err) {
            console.error(err)
        }
    }

    const getMiner = async id => {
        try {
            const { data } = await ApiMiner.get(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })

            return data
        } catch (err) {
            throw err
        }
    }

    const createMiner = async formData => {
        try {
            const { data } = await ApiMiner.post('/', formData, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })

            // agregamos el miner al array de miners y actualizamos el count miners
            const newMiner = {
                ...data.data,
                validHashes: 0,
                invalidHashes: 0,
                cpu: 0,
                memory: 0,
                memoryFlash: 0,
                disk: 0,
                red: 0,
                hashRate: 0
            }

            setMiners(state => [...state, newMiner])
            setCountMiners(state => state + 1)

            return true
        } catch (err) {
            throw err
        }
    }

    const deleteMiner = async id => {
        try {
           const { data } = await ApiMiner.delete(`/${id}`, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })

            // Eliminamos el minero de la lista de mineros
            setMiners(state => state.filter(miner => miner.id != data.idMiner))

            return data
        } catch (err) {
            throw err
        }
    }

    const updateMiner = async (id, formData) => {
        if (formData.password === '') {
            delete formData.password
        }

        try {
          const { data } = await ApiMiner.put(`/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${AccessToken}`
            }
          })
        
          // Editamos el minero
          const editMiner = [...Miners].find(miner => miner.id === id)
          
          for (const key in data.data) {
            editMiner[key] = data.data[key]
          }

          setMiners(state => state.map(miner => miner.id == editMiner.id ? editMiner : miner))
          return true
        } catch (err) {
            throw err
        }
    }

    const handleConnect = () => {
        console.log('conectado a mqtt!!!')
        
        // Nos suscribimos a los topicos
        Miners.forEach(({ baseTopic }) => {
            clientMqtt.subscribe(baseTopic, err => err && console.error(err))
        })
    }

    const handleError = err => {
        console.error(err)
        clientMqtt.end(() => setClientMqtt(null))
    }

    const handleMessage = (topic, message) => {
        const data = JSON.parse(message.toString())

        // Obtenemos el minero a actualizar
        const updateMiner = Miners.find(miner => miner.baseTopic === topic)
        
        // Actualizamos el minero individualmente
        updateMiner.validShares = Math.round(data.validShares)
        updateMiner.invalidShares = Math.round(data.invalidShares)
        updateMiner.hashrate = Math.round(data.hashrate)
        updateMiner.memory = Math.round(data.memory * 100) / 100
        updateMiner.memoryPsram = Math.round(data.memoryPsram * 100) / 100
        updateMiner.disk = Math.round(data.disk * 100) / 100
        updateMiner.red = Math.round(data.red * 100) / 100

        // Actualizamos el array de los mineros con el minero actualizado
        setMiners(state => state.map(miner => miner.baseTopic === topic ? updateMiner : miner))
    }

    const connectMqtt = () => {
        if (User === null || Miners === null) return

        // nos conectamos a mqtt
        if (!clientMqtt) {
            const { mqttUser, mqttPassword } = User
            const optionsMqtt = {
                port: config.mqtt.port,
                clientId: `clientWeb_${Math.floor(Math.random() * 255)}`,
                username: mqttUser,
                password: mqttPassword,
                keepalive: 60
            }

            setClientMqtt(mqtt.connect(`ws://${config.mqtt.host}:${config.mqtt.port}/mqtt`, optionsMqtt))
            return
        }

        // Atendemos a los eventos del mqtt
        clientMqtt.on('connect', handleConnect)

        clientMqtt.on('error', handleError)

        clientMqtt.on('message', handleMessage)
    }

    useEffect(() => {
        if (Miners === null && AccessToken !== null) {
            getMiners()
        }
    })

    return (
        <MinersContext.Provider value={{ Miners, CountMiners, createMiner, getMiner, deleteMiner, updateMiner, connectMqtt }}>
            {children}
        </MinersContext.Provider>
    )
}

export default MinersProvider