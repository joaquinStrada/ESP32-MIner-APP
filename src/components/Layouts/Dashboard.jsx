import React from 'react'
import { Outlet } from 'react-router-dom'
import ProtectedAuth from '../ProtectedAuth'
import TemplateDashboard from '../../views/templates/Dashboard'

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