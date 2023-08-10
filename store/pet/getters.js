const getters = {
  prefix() {
    return '/pet';
  },
  pets: state => state.pets,
  pet: state => state.pet,
  loading: state => state.loading
}

export default getters