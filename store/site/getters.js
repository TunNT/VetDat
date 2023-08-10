const getters = {
  prefix() {
    return '/site';
  },
  sites: state => state.sites,
  site: state => state.site,
  loading: state => state.loading
}

export default getters