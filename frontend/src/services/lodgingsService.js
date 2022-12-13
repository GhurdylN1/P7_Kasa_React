import api from '../api/ApiKasaMongoDB'

// interceptor concernant les logements pour les calls axios nécessitant le token

import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'

const useLodgingsService = () => {
  const { auth } = useContext(AuthContext)

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
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
  }, []) //array vide sinon boucle infinie (warning esLint)

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
