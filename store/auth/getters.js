const getters = {
  prefix() {
    return '/auth';
  },
  me: state => state.me,
  permissions: state => state.permissions,
  loading: state => state.loading,
  isAdmin: state => state.isAdmin,

}

export default getters