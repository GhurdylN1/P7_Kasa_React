// axios pour toutes les requetes API entre le front et back

import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:5000',
})
