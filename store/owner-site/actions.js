import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

const actions = {
  async [ActionTypes.OWNER_SITE_LIST]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    try {
      const response = await this.$axios.$get("/site/owners", {
        params: payload,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
        }
      });
      commit(MutationTypes.SET_OWNER_SITES, response);
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_OWNER_SITES, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },

  async [ActionTypes.OWNER_SITE_CREATE]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let response;
    try {
      response = await this.$axios.$post(
        "/site/owners",
        {
          ...payload
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
          }
        }
      );
    } catch (err) {
      // handle error
    } finally {
      commit(MutationTypes.SET_LOADING, false);
      return response;
    }
  },

  async [ActionTypes.OWNER_SITE_DETAIL]({ commit }, _id) {
    commit(MutationTypes.SET_LOADING, true);
    let owner = {};
    try {
      owner = await this.$axios.$get(`/site/owners/${_id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
        }
      });
      commit(MutationTypes.SET_OWNER_SITE,  owner );
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_OWNER_SITE, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
    return owner;
  },

  [ActionTypes.OWNER_SITE_UPDATE](_, payload) {
    const response = this.$axios.$put(`/site/owners/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access-token-site")}`
      }
    });
    return response;
  },

  async [ActionTypes.OWNER_DELETE](_, id) {
    const response = this.$axios.$delete(`/admin/sites/${id}`);
    return response;
  }
};

export default actions;
