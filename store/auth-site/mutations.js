import MutationTypes from "./mutation-types";
const ROLE_READER = 2;

const mutations = {
  [MutationTypes.SET_TOKEN_SITE](state, { token }) {
    localStorage.setItem('access-token-site', token)
  },

  [MutationTypes.SET_CURRENT_SITE](state, { data }) {
    state.siteMe = data;
    state.isSite = 2;
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value;
  },

  [MutationTypes.RESET_SITE](state) {
    state.siteMe = {};
    state.isSite = 0;
    localStorage.removeItem('access-token-site');
  }
};

export default mutations;