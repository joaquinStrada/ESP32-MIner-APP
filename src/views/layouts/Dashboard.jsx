import React from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedAuth from '../../components/ProtectedAuth'
import TemplateDashboard from '../templates/Dashboard'

const Dashboard = () => {
  return (
    <ProtectedAuth>
        <TemplateDashboard>
            <Outlet />
        </TemplateDashboard>
    </ProtectedAuth>
  )
}

export default Dashboard