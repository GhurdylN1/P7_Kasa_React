// axios pour toutes les requetes API entre le front et back
import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export default axios.create({
  baseURL: BASE_URL,
  // headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

// pour les interceptors avec le JWT token mais ça marche toujours pas...
// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true,
// })

// autre test interceptor........
// import axios from 'axios'

// import { useContext } from 'react'
// import AuthContext from '../context/AuthProvider'

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
// })

// api.interceptors.request.use(
//   (request) => {
//     const { auth } = useContext(AuthContext)
//     request.headers.common['Authorization'] = `Bearer ${auth.token}`
//     console.log('request sent')
//     return request
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// api.interceptors.response.use(
//   (response) => {
//     console.log('got response')
//     return response
//   },
//   (error) => {
//     console.log(error.response)
//     if (error.response.status === 404) {
//       // do something
//       console.log('NOT FOUND')
//     }
//     return Promise.reject(error)
//   }
// )

// export default api
