import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

const actions = {
  async [ActionTypes.SITE_LIST]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    try {
      const response = await this.$axios.$get("/admin/sites", {
        params: payload
      });
      commit(MutationTypes.SET_SITES, response);
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_SITES, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },

  async [ActionTypes.SITE_CREATE]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let response;
    try {
        response = await this.$axios.$post("/admin/sites", {
            ...payload,
        });
    } catch (err) {
        // handle error
    } finally {
        commit(MutationTypes.SET_LOADING, false);
        return response;
    }
},

  async [ActionTypes.SITE_DETAIL]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let site = {};
    try {
      site = {}; // await [call api get site depend on payload]
      commit(MutationTypes.SET_USER, { site });
    } catch (err) {
      // handle error
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
    return site;
  },

  [ActionTypes.SITE_UPDATE](_, payload) {
    const response = this.$axios.$post("/api/users/role", payload);
    return response;
  },

  async [ActionTypes.SITE_DELETE](_, id) {
    const response = this.$axios.$delete(`/admin/sites/${id}`);
    return response;
  }
};

export default actions;
