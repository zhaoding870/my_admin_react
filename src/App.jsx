/**
 * 
 * @returns 系统根组件
 */

import React from 'react';

import {
  Navigate,
  createBrowserRouter,
  RouterProvider
}
  from 'react-router-dom';

import Admin from './pages/admin';
import Login from './pages/login';
import Home from './pages/home';
import Category from './pages/category';
import Product from './pages/product';
import User from './pages/user';
import Role from './pages/role';
import Bar from './pages/charts/bar';
import Line from './pages/charts/line';
import Pie from './pages/charts/pie';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/*",
    element: <Admin />,
    errorElement: <Navigate to='/home' replace />,
    children: [
      {
        index: true,
        element: <Navigate to='/home' replace />
      },
      {
        path: "home",
        element: <Home />
      },
      {
        path: "category",
        element: <Category />
      },
      {
        path: "product/*",
        element: <Product />
      },
      {
        path: "user",
        element: <User />
      },
      {
        path: "role",
        element: <Role />
      },
      {
        path: "charts/bar",
        element: <Bar />
      },
      {
        path: "charts/line",
        element: <Line />
      },
      {
        path: "charts/pie",
        element: <Pie />
      }
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
