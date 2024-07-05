/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const DataTable = ({ title, columnsTable, setColumnsTable, data, countData, Row, onEdit, onDelete }) => {

    const [columnVisibility, setColumnVisibility] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])

    const getPages = () => {
        if (!data) return

        const items = data.filter(item => String(item.name).toLowerCase().includes(search))
        let pages = Math.floor(items.length / 10)
        const restPages = items.length % 10
        const pagesArray = []

        if (restPages > 0) {
            pages++
        }

        for (let i = 0; i < pages; i++) {
            pagesArray.push(i + 1)
        }

        setTotalPages(pagesArray)
        
        if (pagesArray.length < 1) {
            setPage(1)
        } else if (page > pagesArray.length) {
            setPage(pagesArray.length)
        }
    }

    useEffect(() => {
        getPages()
    }, [countData, search])

    return (
        <div className="card">
            <div className="card-header">
                <h3 className="card-title">{title}</h3>
            </div>
            <div className="card-body">
                <div className="dataTables_wrapper dt-bootstrap4">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="dt-buttons btn-group flex-wrap">
                                <button
                                    className="btn btn-secondary buttons-copy buttons-html5"
                                    tabIndex={0}
                                    aria-controls="miners"
                                    type="button"
                                >
                                    <span>Copy</span>
                                </button>
                                <button
                                    className="btn btn-secondary buttons-csv buttons-html5"
                                    tabIndex={0}
                                    aria-controls="miners"
                                    type="button"
                                >
                                    <span>CSV</span>
                                </button>
                                <button
                                    className="btn btn-secondary buttons-excel buttons-html5"
                                    tabIndex={0}
                                    aria-controls="miners"
                                    type="button"
                                >
                                    <span>Excel</span>
                                </button>
                                <button
                                    className="btn btn-secondary buttons-pdf buttons-html5"
                                    tabIndex={0}
                                    aria-controls="miners"
                                    type="button"
                                >
                                    <span>PDF</span>
                                </button>
                                <button
                                    className="btn btn-secondary buttons-print"
                                    tabIndex={0}
                                    aria-controls="mineros"
                                    type="button"
                                >
                                    <span>Print</span>
                                </button>
                                <div className="btn-group">
                                    <button
                                        className="btn btn-secondary buttons-collection dropdown-toggle buttons-colvis"
                                        tabIndex={0}
                                        aria-controls="miners"
                                        type="button"
                                        aria-haspopup="true"
                                        onClick={() => setColumnVisibility(state => !state)}
                                    >
                                        <span>Column visibility</span>
                                        <span className="dt-down-arrow" />
                                    </button>
                                    <div className={`dt-button-collection ${columnVisibility ? '' : 'd-none'}`} style={{ top: 38, left: "285.469px" }}>
                                        <div className="dropdown-menu" role="menu">
                                            {
                                                columnsTable.map((column, index) => (
                                                    <div
                                                        className={`dt-button dropdown-item buttons-columnVisibility ${column.enabled ? 'active' : ''}`}
                                                        tabIndex={0}
                                                        key={index}
                                                        aria-controls="miners"
                                                        data-cv-idx={0}
                                                        onClick={() =>
                                                            setColumnsTable(state =>
                                                                state.map(columnUpdate => columnUpdate.name === column.name ? {
                                                                    ...columnUpdate,
                                                                    enabled: !columnUpdate.enabled
                                                                } : columnUpdate)
                                                            )}
                                                    >
                                                        <span>{column.name}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div id="example1_filter" className="dataTables_filter">
                                <label>
                                    Buscar:
                                    <input
                                        type="search"
                                        className="form-control form-control-sm"
                                        placeholder="Buscar"
                                        aria-controls="mineros"
                                        onChange={e => setSearch(String(e.currentTarget.value).toLowerCase())}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row w-100 overflow-auto">
                        <table className="table table-bordered table-hover dataTable dtr-inline">
                            <thead>
                                <tr>
                                    {
                                        columnsTable.map((column, index) => column.enabled && (
                                            <th
                                                className="sorting sorting_asc"
                                                tabIndex={0}
                                                key={index}
                                                aria-controls="miners"
                                                rowSpan={1}
                                                colSpan={1}
                                                aria-sort="ascending"
                                                aria-label={`${column.name}: activate to sort column descending`}
                                            >
                                                {column.name}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data &&
                                    data
                                        .filter(row => String(row.name).toLowerCase().includes(search))
                                        .slice((page * 10) - 10, page * 10)
                                        .map(row => (
                                            <Row
                                                data={row}
                                                columns={columnsTable}
                                                key={row.id}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                            />
                                        ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    {
                                        columnsTable.map((column, index) => column.enabled && (
                                            <th rowSpan={1} colSpan={1} key={index}>
                                                {column.name}
                                            </th>
                                        ))
                                    }
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div
                                className="dataTables_info"
                                id="example1_info"
                                role="status"
                                aria-live="polite"
                            >
                                Mostrando desde {(page * 10) - 9} hasta {page * 10} de {countData} mineros
                            </div>
                        </div>
                        {
                            totalPages.length > 1 &&
                            (
                                <div className="col-sm-12 col-md-6">
                                    <div
                                        className="dataTables_paginate paging_simple_numbers"
                                        id="example1_paginate"
                                    >
                                        <ul className="pagination">
                                            <li
                                                className={`paginate_button page-item previous ${page <= 1 ? 'disabled' : ''}`}
                                            >
                                                <NavLink
                                                    to="#"
                                                    aria-controls="dataTable"
                                                    data-dt-idx={0}
                                                    tabIndex={0}
                                                    className="page-link"
                                                    onClick={() => page > 1 && setPage(state => state - 1)}
                                                >
                                                    Previous
                                                </NavLink>
                                            </li>
                                            {
                                                totalPages.map((pageLink, index) => (
                                                    <li 
                                                        className={`paginate_button page-item ${pageLink === page ? 'active' : ''}`}
                                                        key={index}
                                                    >
                                                        <NavLink
                                                            to="#"
                                                            aria-controls="dataTable"
                                                            data-dt-idx={pageLink}
                                                            tabIndex={0}
                                                            className="page-link"
                                                            onClick={() => setPage(pageLink)}
                                                        >
                                                            {pageLink}
                                                        </NavLink>
                                                    </li>
                                                ))
                                            }
                                            <li
                                                className={`paginate_button page-item next ${page >= totalPages.length ? 'disabled' : ''}`}
                                            >
                                                <NavLink
                                                    to="#"
                                                    aria-controls="dataTable"
                                                    data-dt-idx={7}
                                                    tabIndex={0}
                                                    className="page-link"
                                                    onClick={() => page < totalPages.length && setPage(state => state + 1)}
                                                >
                                                    Next
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DataTable