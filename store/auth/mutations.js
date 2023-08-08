import MutationTypes from "./mutation-types";
const ROLE_READER = 2;
const ROLE_ADMIN = 3;

const mutations = {
  [MutationTypes.SET_TOKEN](state, { token }) {
    localStorage.setItem('access-token', token)
  },

  [MutationTypes.SET_CURRENT_USER](state, { data }) {
    const { taro_role = 0 } = data;
    state.me = data;
    state.canEdit = taro_role === ROLE_READER || taro_role === ROLE_ADMIN;
    state.canDelete = taro_role === ROLE_ADMIN;
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
  }
};

export default mutations;