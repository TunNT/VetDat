const getters = {
  prefix() {
    return '/owner-site';
  },
  ownerSites: state => state.ownerSites,
  ownerSite: state => state.ownerSite,
  loading: state => state.loading
}

export default getters