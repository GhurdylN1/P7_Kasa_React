import api from '../api/ApiKasaMongoDB'

// interceptor concernant les users pour les calls axios nécessitant le token

import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'

const useUsersService = () => {
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

  const usersService = {
    getUserById: async (_id) => {
      return (await api.get(`api/users/${_id}`)).data
    },
  }

  return usersService
}

export default useUsersService
