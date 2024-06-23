import React from 'react'
import formatDate from '../utils/formatDate'

const RowMinerDashboard = ({ data, columns }) => {
    return (
        <tr className="odd">
            {
                columns.map((column, index) => {
                    if (column.enabled && column.name === 'Nombre') {
                        return (
                            <td className="dtr-control sorting_1" tabIndex={0} key={index}>
                                {data.name}
                            </td>
                        )
                    } else if (column.enabled && column.name === 'Ultima conexion') {
                        return (
                            <td key={index}>{formatDate(data.conected)}</td>
                        )
                    } else if (column.enabled) {
                        return (
                            <td key={index}>{data[column.property]}{column.unit}</td>
                        )
                    } else {
                        return null
                    }
                })
            }
        </tr>
    )
}

export default RowMinerDashboard