import MutationTypes from "./mutation-types";

const mutations = {
  [MutationTypes.SET_SITES](state, data) {
    state.sites = data
  },

  [MutationTypes.SET_SITE](state, { data }) {
    state.site = data
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value
  }
}

export default mutations