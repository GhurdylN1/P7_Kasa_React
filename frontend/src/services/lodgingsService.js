import api from '../api/logementApiTest'
// import Lodgings from '../data/logements.json'

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

export default lodgingsService

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
