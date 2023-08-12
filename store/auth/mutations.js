import MutationTypes from "./mutation-types";
const ROLE_ADMIN = true;

const mutations = {
  [MutationTypes.SET_TOKEN](state, { token }) {
    localStorage.setItem('access-token', token);
  },

  [MutationTypes.SET_CURRENT_USER](state, { data }) {
    const {isRoot} = data;
    state.me = data;
    state.canEdit = true
    state.canDelete = true;
    state.isAdmin = isRoot === ROLE_ADMIN ? 1 : 0;
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value;
  },

  [MutationTypes.RESET](state) {
    state.me = {};
    state.permissions = [];
    state.canEdit = false;
    state.canDelete = false;
    localStorage.removeItem('access-token');
    state.isAdmin = 0;
  }
};

export default mutations;