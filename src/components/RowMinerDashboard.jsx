import React from 'react'
import formatDate from '../utils/formatDate'

const RowMinerDashboard = ({ miner, columns }) => {
    return (
        <tr className="odd">
            {
                columns.map((column, index) => {
                    if (column.enabled && column.name === 'Nombre') {
                        return (
                            <td className="dtr-control sorting_1" tabIndex={0} key={index}>
                                {miner.name}
                            </td>
                        )
                    } else if (column.enabled && column.name === 'Ultima conexion') {
                        return (
                            <td key={index}>{formatDate(miner.conected)}</td>
                        )
                    } else if (column.enabled) {
                        return (
                            <td key={index}>{miner[column.property]}{column.unit}</td>
                        )
                    }
                })
            }
        </tr>
    )
}

export default RowMinerDashboard