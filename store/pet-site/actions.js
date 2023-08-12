import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

const actions = {
  async [ActionTypes.PET_SITE_LIST]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    try {
      const response = await this.$axios.$get("/site/pets", {
        params: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
        }
      });
      commit(MutationTypes.SET_PET_SITES, response);
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_PET_SITES, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },

  async [ActionTypes.PET_SITE_CREATE]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let response;
    try {
      response = await this.$axios.$post("/site/pets", {
        ...payload
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
        }
      });
    } catch (err) {
      // handle error
    } finally {
      commit(MutationTypes.SET_LOADING, false);
      return response;
    }
  },

  async [ActionTypes.PET_SITE_DETAIL]({ commit }, _id) {
    commit(MutationTypes.SET_LOADING, true);
    let pet = {};
    try {
      pet = await this.$axios.$get(`/site/pets/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
        }
      });
      commit(MutationTypes.SET_PET_SITE, pet);
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_PET_SITE, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
    return pet;
  },

  async [ActionTypes.PET_SITE_UPDATE](_, payload) {
    const response = await this.$axios.$put(`/site/pets/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
      }
    });
    return response;
  },
};

export default actions;
