import api from '../api/logementApiTest'

const usersService = {
  getUserById: async (_id) => {
    return (await api.get(`api/users/${_id}`)).data
  },
}

export default usersService
