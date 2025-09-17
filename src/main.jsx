import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import storageUtils from './utils/storageUtils.js'
import memoryUtils from './utils/memoryUtils.js'

//读取local中保存的user,如果存在,保存到内存中
const user = storageUtils.getUser();
if (user && user._id) {
  memoryUtils.user = user;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
