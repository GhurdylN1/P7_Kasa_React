import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'

// import api from './api/ApiKasaMongoDB'
// import AuthContext from './context/AuthProvider'
// import { useContext } from 'react'

// api.interceptors.request.use(
//   (config) => {
//     const { auth } = useContext(AuthContext)
//     if (!config.headers.authorization) {
//       config.headers.authorization = `Bearer ${auth?.token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// api.interceptors.request.use((request) => {
//   console.log(request)
//   return request
// })

// api.interceptors.response.use((response) => {
//   console.log(response.data)
//   return response
// })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
