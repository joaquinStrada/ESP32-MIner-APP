import { config } from './config'
import axios from 'axios'

export const ApiUser = axios.create({
    baseURL: `${config.api.host}/api/v1/user`,
    timeout: 5000
})

export const ApiMiner = axios.create({
    baseURL: `${config.api.host}/api/v1/miner`,
    timeout: 5000
})