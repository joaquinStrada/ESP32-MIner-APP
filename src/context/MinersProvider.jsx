import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserContext } from './UserProvider'
import { ApiMiner } from '../utils/api'

export const MinersContext = createContext()

const MinersProvider = ({ children }) => {
    const [ Miners, setMiners ] = useState(null)
    const [ CountMiners, setCountMiners ] = useState(0)
    const { AccessToken } = useContext(UserContext)

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
            const miners = dataMiners.map(miner => ({
                ...miner,
                validHashes: 0,
                invalidHashes: 0,
                cpu: 0,
                memory: 0,
                memoryFlash: 0,
                disk: 0,
                red: 0,
                hashRate: 0
            }))

            // Actualizamos el estado
            setCountMiners(count)
            setMiners(miners)
        } catch (err) {
            console.error(err)
        }
    }

    const createMiner = async formData => {
        try {
            const { data } = await ApiMiner.post('/', formData, {
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            })


            if (data.error) throw new Error(`Error: ${data.message}`)

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

    useEffect(() => {
        if (Miners === null && AccessToken !== null) {
            getMiners()
        }
    })
    return (
        <MinersContext.Provider value={{ Miners, CountMiners, createMiner }}>
            {children}
        </MinersContext.Provider>
    )
}

export default MinersProvider