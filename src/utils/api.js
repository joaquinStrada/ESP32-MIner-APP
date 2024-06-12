import { config } from './config'
import axios from 'axios'

export const ApiUser = axios.create({
    baseURL: `${config.api.host}/api/v1/user`
})