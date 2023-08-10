import MutationTypes from "./mutation-types";

const mutations = {
  [MutationTypes.SET_OWNER_SITES](state,  data ) {
    state.ownerSites = data || []
  },

  [MutationTypes.SET_OWNER_SITE](state, { data }) {
    state.ownerSite = data
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value
  }
}

export default mutations