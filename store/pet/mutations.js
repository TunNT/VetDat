import MutationTypes from "./mutation-types";

const mutations = {
  [MutationTypes.SET_PETS](state, {data}) {
    state.pets = data[0] || []
  },

  [MutationTypes.SET_PET_SEARCH](state, {data}) {
    state.petSearch = data[0] || []
  },

  [MutationTypes.SET_PET](state, { data }) {
    state.site = data
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value
  }
}

export default mutations