import MutationTypes from "./mutation-types";

const mutations = {
  [MutationTypes.SET_PET_SITES](state, data ) {
    state.petSites =  data || []
  },

  [MutationTypes.SET_PET_SITE](state, { data }) {
    state.petSite = data
    state.ownerPet = data.owner;
  },

  [MutationTypes.SET_LOADING](state, value) {
    state.loading = value
  }
}

export default mutations