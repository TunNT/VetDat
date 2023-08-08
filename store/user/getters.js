const getters = {
  prefix() {
    return '/user';
  },
  users: state => state.users,
  user: state => state.user,
  loading: state => state.loading
}

export default getters