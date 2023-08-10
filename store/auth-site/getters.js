const getters = {
  prefix() {
    return '/auth-site';
  },
  siteMe: state => state.siteMe,
  siteCanEdit: state => state.siteCanEdit,
  siteCanDelete: state => state.siteCanDelete,
  permissions: state => state.permissions,
  loading: state => state.loading,
  isSite: state => state.isSite,

}

export default getters