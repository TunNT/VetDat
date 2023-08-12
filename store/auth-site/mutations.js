import MutationTypes from "./mutation-types";
const ROLE_READER = 2;

const mutations = {
  [MutationTypes.SET_TOKEN_SITE](state, { token }) {
    localStorage.setItem('access-token-site', token)
  },

  [MutationTypes.SET_CURRENT_SITE](state, { data }) {
    state.me = data;
    state.isSite = 2;
    state.canEdit = true;
    state.canDelete = true;
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value;
  },

  [MutationTypes.RESET_SITE](state) {
    state.me = {};
    state.isSite = 0;
    state.permissions = [];
    state.canEdit = false;
    state.canDelete = false;
    localStorage.removeItem('access-token-site');
  }
};

export default mutations;