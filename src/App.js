import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import LayoutDashboard from './components/Layouts/Dashboard'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<LayoutDashboard />}>
        <Route index element={<Dashboard />} />
      </Route>
    </Routes>
  )
}

export default App
