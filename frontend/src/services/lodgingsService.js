import api from '../api/ApiKasaMongoDB'
// import Lodgings from '../data/logements.json'

// test interceptor axios qui fonctionne mais useEffect en boucle infinie si on ne laisse pas un array vide [] (et dans les autres composants)

import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'

const useLodgingsService = () => {
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        // console.log('auth.token', auth.token)
        if (auth.token) {
          config.headers['Authorization'] = `Bearer ${auth.token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          return api(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      api.interceptors.request.eject(requestIntercept)
      api.interceptors.response.eject(responseIntercept)
    }
  }, [])

  const lodgingsService = {
    getAll: async () => {
      return (await api.get('/api/logements')).data
    },

    getByUserID: async (userId) => {
      return (await api.get(`api/logements/byUserId/${userId}`)).data
    },

    getByLodgingId: async (_id) => {
      return (await api.get(`api/logements/${_id}`)).data
    },
  }

  return lodgingsService
}

export default useLodgingsService

// function mapperTransformUrlBackend(response) {
//   response.pictures = response.pictures.map(
//     (picture) => 'http://localhost:5000' + picture
//   )
//   return response
// }

// avant test interceptor axios
// const lodgingsService = {
//   getAll: async () => {
//     return (await api.get('/api/logements')).data
//   },

//   getByUserID: async (userId) => {
//     return (await api.get(`api/logements/byUserId/${userId}`)).data
//   },

//   getByLodgingId: async (_id) => {
//     return (await api.get(`api/logements/${_id}`)).data
//   },
// }

// export default lodgingsService

// avant le backend
// const lodgingsService = {
//   getAll: () => {
//     return Lodgings
//   },
//   getByUserName: (userName) => {
//     return Lodgings.filter((Lodgings) => Lodgings.host.name === userName)
//   },
//   getById: (lodgingId) => {
//     return Lodgings.filter((Lodgings) => Lodgings.id === lodgingId)
//   },
// }

// export default lodgingsService
