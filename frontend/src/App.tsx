import React from 'react'
import Home from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import SignupPage from './pages/Signup'
import SigninPage from './pages/Signin'

const App = () => {
  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App