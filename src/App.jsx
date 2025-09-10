/**
 * 
 * @returns 系统根组件
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/login'
import Admin from './pages/admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
