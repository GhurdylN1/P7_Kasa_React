import Lodgings from '../data/logements.json'

const lodgingsService = {
  getAll: () => {
    return Lodgings
  },
  getByUserName: (userName) => {
    return Lodgings.filter((Lodgings) => Lodgings.host.name === userName)
  },
  getById: (lodgingId) => {
    return Lodgings.filter((Lodgings) => Lodgings.id === lodgingId)
  },
}

export default lodgingsService
