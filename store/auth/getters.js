const getters = {
  prefix() {
    return '/auth';
  },
  me: state => state.me,
  canEdit: state => state.canEdit,
  canDelete: state => state.canDelete,
  permissions: state => state.permissions,
  loading: state => state.loading
}

export default getters