import React from 'react'
import formatDate from '../utils/formatDate'
import { Link } from 'react-router-dom'

const RowMinerDashboard = ({ data, columns }) => {
    return (
        <tr className="odd">
            {
                columns.map((column, index) => {
                    if (column.enabled && column.name === 'Nombre') {
                        return <td className="dtr-control sorting_1" tabIndex={0} key={index}>
                            <Link to={`/dashboard/${data.id}`}>{data.name}</Link>
                        </td>
                    } else if (column.enabled && column.name === 'Hashrate') {
                        if (data.hashrate > 1000000) {
                            return <td key={index}>{Math.round(data.hashrate / 10000) / 100}MH/s</td>
                        } else if (data.hashrate > 1000) {
                            return <td key={index}>{Math.round(data.hashrate / 10) / 100}KH/s</td>
                        } else {
                            return <td key={index}>{data.hashrate}H/s</td>
                        }
                    } else if (column.enabled && (column.name === 'Hashes validos' || column.name === 'Hashes invalidos')) {
                        if (data[column.property] > 1000000) {
                            return <td key={index}>{Math.round(data[column.property]/1000000)}MH</td>
                        } else if (data[column.property] > 1000) {
                            return <td key={index}>{Math.round(data[column.property]/1000)}KH</td>
                        } else {
                           return <td key={index}>{data[column.property]}</td> 
                        }
                    } else if (column.enabled && column.name === 'Ultima conexion') {
                        return <td key={index}>{formatDate(data.conected)}</td>
                    } else if (column.enabled) {
                        return <td key={index}>{data[column.property]}{column.unit}</td>
                    } else {
                        return null
                    }
                })
            }
        </tr>
    )
}

export default RowMinerDashboard