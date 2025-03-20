import React, { useContext, useState, useEffect } from 'react'
import Card from '../components/Card'
import { faChartSimple, faCheck, faHardDrive, faSignal, faXmark } from '@fortawesome/free-solid-svg-icons'
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
      name: 'Hashrate',
      property: 'hashrate',
      unit: 'H/s',
      enabled: true
    },
    {
      name: 'Hashes validos',
      property: 'validShares',
      unit: '',
      enabled: true
    },
    {
      name: 'Hashes invalidos',
      property: 'invalidShares',
      unit: '',
      enabled: true
    },
    {
      name: 'Memoria',
      property: 'memory',
      unit: '%',
      enabled: true
    },
    {
      name: 'Memoria Psram',
      property: 'memoryPsram',
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
  const { Miners, CountMiners, connectMqtt } = useContext(MinersContext)
  const [ ValidShares, setValidShares ] = useState(0)
  const [ InvalidShares, setInvalidShares ] = useState(0)
  const [ Hashrate, setHashrate ] = useState(0)
  const [ Memory, setMemory ] = useState(0)
  const [ MemoryPsram, setMemoryPsram ] = useState(0)
  const [ Disk, setDisk ] = useState(0)
  const [ Red, setRed ] = useState(0)

  useEffect(() => {
    connectMqtt()
  })

  useEffect(() => {
    let validShares = 0
    let invalidShares = 0
    let hashrate = 0
    let memory = 0
    let memoryPsram = 0
    let disk = 0
    let red = 0

    if (!Array.isArray(Miners)) return

    for (const Miner of Miners) {
      validShares += Miner.validShares
      invalidShares += Miner.invalidShares
      hashrate += Miner.hashrate
      memory += Miner.memory
      memoryPsram += Miner.memoryPsram
      disk += Miner.disk
      red += Miner.hashrate
    }

    setValidShares(validShares)
    setInvalidShares(invalidShares)
    setHashrate(hashrate)
    setMemory(Math.round((memory / CountMiners) * 100) / 100)
    setMemoryPsram(Math.round((memoryPsram / CountMiners) * 100) / 100)
    setDisk(Math.round((disk / CountMiners) * 100) / 100)
    setRed(Math.round((red / CountMiners) * 100) / 100)
  }, [Miners, CountMiners])

  return (
    <>
      <h1 className="mb-2">Dashboard</h1>
      <div className="row">
        <Card
          color="bg-success"
          label="Hashes Validos"
          icon={faCheck}
          value={ValidShares}
        />
        <Card
          color="bg-danger"
          label="Hashes Invalidos"
          icon={faXmark}
          value={InvalidShares}
        />
        <Card
          color="bg-info"
          label="Memoria"
          icon={faChartSimple}
          value={
            <>
              {Memory}
              <sup className="font-size: 20px;">%</sup>
            </>
          }
        />
        <Card
          color="bg-danger"
          label="Memoria Psram"
          icon={faChartSimple}
          value={
            <>
              {MemoryPsram}
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
              {Disk}
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
              {Red}
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
              {Hashrate}
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