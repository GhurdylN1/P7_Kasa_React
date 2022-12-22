// axios pour toutes les requetes API entre le front et back
import axios from 'axios'

const BASE_URL = 'https://marasco-antony-kasa-api.onrender.com/'

export default axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})
