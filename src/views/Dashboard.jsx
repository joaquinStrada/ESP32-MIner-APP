import React, { useContext, useState } from 'react'
import Card from '../components/Card'
import { faChartSimple, faCheck, faHardDrive, faServer, faSignal, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons/faBitcoinSign'
import { NavLink } from 'react-router-dom'
import { MinersContext } from '../context/MinersProvider'
import RowMinerDashboard from '../components/RowMinerDashboard'

const Dashboard = () => {
  const [columnsTable, setColumnsTable] = useState([
    {
      name: 'Nombre',
      property: 'name',
      unit: '',
      enabled: true
    },
    {
      name: 'HashRate',
      property: 'hashRate',
      unit: 'H/s',
      enabled: true
    },
    {
      name: 'Hashes validos',
      property: 'validHashes',
      unit: '',
      enabled: true
    },
    {
      name: 'Hashes invalidos',
      property: 'invalidHashes',
      unit: '',
      enabled: true
    },
    {
      name: 'CPU',
      property: 'cpu',
      unit: '%',
      enabled: true
    },
    {
      name: 'Memoria',
      property: 'memory',
      unit: '%',
      enabled: true
    },
    {
      name: 'Memoria flash',
      property: 'memoryFlash',
      unit: '%',
      enabled: true
    },
    {
      name: 'Disco',
      property: 'disk',
      unit: '%',
      enabled: true
    },
    {
      name: 'Red',
      property: 'red',
      unit: '%',
      enabled: true
    },
    {
      name: 'Ultima conexion',
      property: 'conected',
      unit: '',
      enabled: true
    },
  ])
  const { Miners, CountMiners } = useContext(MinersContext)
  const [columnVisibility, setColumnVisibility] = useState(false)
  const [searchMiner, setSearchMiner] = useState('')

  return (
    <>
      <h1 className="mb-2">Dashboard</h1>
      <div className="row">
        <Card
          color="bg-success"
          label="Hashes Validos"
          icon={faCheck}
          value="0"
        />
        <Card
          color="bg-danger"
          label="Hashes Invalidos"
          icon={faXmark}
          value="0"
        />
        <Card
          color="bg-warning"
          label="CPU"
          icon={faServer}
          value={
            <>
              53
              <sup className="font-size: 20px;">%</sup>
            </>
          }
        />
        <Card
          color="bg-info"
          label="Memoria"
          icon={faChartSimple}
          value={
            <>
              53
              <sup className="font-size: 20px;">%</sup>
            </>
          }
        />
        <Card
          color="bg-danger"
          label="Memoria Flash"
          icon={faChartSimple}
          value={
            <>
              53
              <sup className="font-size: 20px;">%</sup>
            </>
          }
        />
        <Card
          color="bg-warning"
          label="Disco"
          icon={faHardDrive}
          value={
            <>
              53
              <sup className="font-size: 20px;">%</sup>
            </>
          }
        />
        <Card
          color="bg-info"
          label="Red"
          icon={faSignal}
          value={
            <>
              53
              <sup className="font-size: 20px;">%</sup>
            </>
          }
        />
        <Card
          color="bg-success"
          label="Produciendo"
          icon={faBitcoinSign}
          value={
            <>
              53
              <sup className="font-size: 20px;">H/s</sup>
            </>
          }
        />
      </div>
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Mineros</h3>
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
                      onChange={e => setSearchMiner(String(e.currentTarget.value).toLowerCase())}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
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
                    Miners &&
                    Miners
                      .filter(miner => String(miner.name).toLowerCase().includes(searchMiner))
                      .map(miner => (
                        <RowMinerDashboard
                          miner={miner}
                          columns={columnsTable}
                          key={miner.id}
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
                  Mostrando desde 1 hasta 10 de {CountMiners} mineros
                </div>
              </div>
              {
                CountMiners > 10 &&
                (
                  <div className="col-sm-12 col-md-6">
                    <div
                      className="dataTables_paginate paging_simple_numbers"
                      id="example1_paginate"
                    >
                      <ul className="pagination">
                        <li
                          className="paginate_button page-item previous disabled"
                        >
                          <NavLink
                            to="#"
                            aria-controls="mineros"
                            data-dt-idx={0}
                            tabIndex={0}
                            className="page-link"
                          >
                            Previous
                          </NavLink>
                        </li>
                        <li className="paginate_button page-item active">
                          <NavLink
                            to="#"
                            aria-controls="example1"
                            data-dt-idx={1}
                            tabIndex={0}
                            className="page-link"
                          >
                            1
                          </NavLink>
                        </li>
                        <li className="paginate_button page-item next" id="example1_next">
                          <NavLink
                            to="#"
                            aria-controls="example1"
                            data-dt-idx={7}
                            tabIndex={0}
                            className="page-link"
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
    </>
  )
}

export default Dashboard