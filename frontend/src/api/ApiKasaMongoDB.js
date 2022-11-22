// axios pour toutes les requetes API entre le front et back

import axios from 'axios'
const BASE_URL = 'http://localhost:5000'

export default axios.create({
  baseURL: BASE_URL,
})

// pour les interceptors avec le JWT token
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
