const getters = {
  prefix() {
    return '/owner';
  },
  owners: state => state.owners,
  owner: state => state.owner,
  loading: state => state.loading
}

export default getters