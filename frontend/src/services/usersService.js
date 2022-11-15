import api from '../api/ApiKasaMongoDB'

const usersService = {
  getUserById: async (_id) => {
    return (await api.get(`api/users/${_id}`)).data
  },
}

export default usersService
