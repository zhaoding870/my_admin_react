/**
 * 
 * @returns 系统根组件
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Admin from './pages/admin'
import Login from './pages/login'
import Home from './pages/home'
import Category from './pages/category'
import Product from './pages/product'
import User from './pages/user'
import Role from './pages/role'
import Bar from './pages/charts/bar'
import Line from './pages/charts/line'
import Pie from './pages/charts/pie'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Admin />} >
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="product/*" element={<Product />} />
          <Route path="user" element={<User />} />
          <Route path="role" element={<Role />} />
          <Route path="charts/bar" element={<Bar />} />
          <Route path="charts/line" element={<Line />} />
          <Route path="charts/pie" element={<Pie />} />
          <Route path="*" element={<Navigate to='/home' replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
