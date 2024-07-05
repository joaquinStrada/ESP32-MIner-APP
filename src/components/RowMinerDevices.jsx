import React from 'react'
import formatDate from '../utils/formatDate'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

const RowMinerDevices = ({ data, columns, onEdit, onDelete }) => {
    return (
        <tr className="odd">
            {
                columns.map((column, index) => {
                    if (column.enabled && column.property === 'id') {
                        return (
                            <td className="dtr-control sorting_1" tabIndex={0} key={index}>
                                {data.id}
                            </td>
                        )
                    } else if (column.enabled && column.property === 'createdAt') {
                        return (
                            <td key={index}>{formatDate(data.createdAt)}</td>
                        )
                    } else if (column.enabled && column.property === 'conected') {
                        return (
                            <td key={index}>{formatDate(data.conected)}</td>
                        )
                    } else if (column.enabled && column.property === 'actions') {
                        return (
                            <td key={index}>
                                <button 
                                    className="btn btn-primary d-block w-100 mb-3"
                                    onClick={() => onEdit(data.id)}
                                >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                </button>
                                <button
                                    className="btn btn-danger d-block w-100"
                                    onClick={() => onDelete(data.id)}
                                >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </td>
                        )
                    } else if(column.enabled) {
                        return (
                            <td key={index}>{data[column.property]}</td>
                        )
                    } else {
                        return null
                    }
                })
            }
        </tr>
    )
}

export default RowMinerDevices