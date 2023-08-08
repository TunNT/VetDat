import MutationTypes from "./mutation-types";

const mutations = {
  [MutationTypes.SET_USERS](state, { data }) {
    state.users = data
  },

  [MutationTypes.SET_USER](state, { data }) {
    state.user = data
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value
  }
}

export default mutations