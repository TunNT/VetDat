import MutationTypes from "./mutation-types";

const mutations = {
  [MutationTypes.SET_OWNERS](state,  data ) {
    state.owners = data || []
  },

  [MutationTypes.SET_OWNER](state, { data }) {
    state.owner = data
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value
  }
}

export default mutations