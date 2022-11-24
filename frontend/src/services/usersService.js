import api from '../api/ApiKasaMongoDB'

// test interceptor axios qui fonctionne mais useEffect en boucle infinie si on ne laisse pas un array vide [] (et dans les autres composants)

import { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthProvider'

const useUsersService = () => {
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

  const usersService = {
    getUserById: async (_id) => {
      return (await api.get(`api/users/${_id}`)).data
    },
  }

  return usersService
}

export default useUsersService

// avant test axios interceptor

// const usersService = {
//   getUserById: async (_id) => {
//     return (await api.get(`api/users/${_id}`)).data
//   },
// }

// export default usersService
