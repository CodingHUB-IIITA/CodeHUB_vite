import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import UserDataProvider from './Context/user.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <UserDataProvider>
     <App />
  </UserDataProvider>
)
