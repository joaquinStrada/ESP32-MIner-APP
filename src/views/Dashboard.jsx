import React, { useContext, useState } from 'react'
import Card from '../components/Card'
import { faChartSimple, faCheck, faHardDrive, faServer, faSignal, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons/faBitcoinSign'
import { MinersContext } from '../context/MinersProvider'
import RowMinerDashboard from '../components/RowMinerDashboard'
import DataTable from '../components/DataTable'

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
      <DataTable
        title="Mineros"
        columnsTable={columnsTable}
        setColumnsTable={setColumnsTable}
        data={Miners}
        countData={CountMiners}
        Row={RowMinerDashboard}
      />
    </>
  )
}

export default Dashboard