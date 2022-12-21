// axios pour toutes les requetes API entre le front et back
import axios from 'axios'

const BASE_URL = 'http://localhost:5000'

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
