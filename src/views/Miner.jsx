import React, { useState, useEffect, useContext } from 'react'
import Card from '../components/Card'
import { faChartSimple, faCheck, faHardDrive, faSignal, faXmark, faBitcoinSign } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { MinersContext } from '../context/MinersProvider'

const Miner = () => {
  const minerId = parseInt(useParams().minerid)
  const { Miners, connectMqtt } = useContext(MinersContext)
  const [ValidShares, setValidShares] = useState(0)
  const [InvalidShares, setInvalidShares] = useState(0)
  const [Hashrate, setHashrate] = useState(0)
  const [Memory, setMemory] = useState(0)
  const [MemoryPsram, setMemoryPsram] = useState(0)
  const [Disk, setDisk] = useState(0)
  const [Red, setRed] = useState(0)

  useEffect(() => {
    connectMqtt()
  })

  useEffect(() => {
    const { validShares, invalidShares,
      hashrate, memory, memoryPsram, disk, red
     } = Array.isArray(Miners) && Miners.find(miner => miner.id === minerId)
     
    setValidShares(validShares)
    setInvalidShares(invalidShares)
    setHashrate(hashrate)
    setMemory(Math.round(memory * 100) / 100)
    setMemoryPsram(Math.round(memoryPsram * 100) / 100)
    setDisk(Math.round(disk * 100) / 100)
    setRed(Math.round(red * 100) / 100)
  }, [Miners, minerId])


  return (
    <div className="row">
      <Card
        color="bg-success"
        label="Hashes Validos"
        icon={faCheck}
        value={
            ValidShares > 1000000 ?
              `${Math.round(ValidShares / 1000000)}MH`
            : ValidShares > 1000 ?
              `${Math.round(ValidShares / 1000)}KH`
            : ValidShares
          }
      />
      <Card
        color="bg-danger"
        label="Hashes Invalidos"
        icon={faXmark}
        value={
            InvalidShares > 1000000 ?
              `${Math.round(InvalidShares / 1000000)}MH`
            : InvalidShares > 1000 ?
              `${Math.round(InvalidShares / 1000)}KH`
            : InvalidShares
          }
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
              {
                Hashrate > 1000000 ?
                  Math.round(Hashrate/10000) / 100
                : Hashrate > 1000 ?
                  Math.round(Hashrate/10) / 100
                : Hashrate
              }
              <sup className="font-size: 20px;">
                {
                  Hashrate > 1000000 ?
                    `MH/s`
                  : Hashrate > 1000 ?
                    'KH/s'
                  : 'H/s'
                }
              </sup>
            </>
          }
      />
    </div>
  )
}

export default Miner