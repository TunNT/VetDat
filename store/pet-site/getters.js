const getters = {
  prefix() {
    return '/pet-site';
  },
  petSites: state => state.petSites,
  petSite: state => state.petSite,
  loading: state => state.loading,
  ownerPet: state => state.ownerPet
}

export default getters