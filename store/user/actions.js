import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

const actions = {
  async [ActionTypes.USER_LIST]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    try {
      const response = await this.$axios.$get("/api/users", {
        params: payload
      });
      commit(MutationTypes.SET_USERS, response);
    } catch (err) {
      // handle error
      commit(MutationTypes.SET_USERS, {});
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
  },

  async [ActionTypes.USER_DETAIL]({ commit }, payload) {
    commit(MutationTypes.SET_LOADING, true);
    let user = {};
    try {
      user = {}; // await [call api get user depend on payload]
      commit(MutationTypes.SET_USER, { user });
    } catch (err) {
      // handle error
    } finally {
      commit(MutationTypes.SET_LOADING, false);
    }
    return user;
  },

  [ActionTypes.USER_UPDATE](_, payload) {
    const response = this.$axios.$post("/api/users/role", payload);
    return response;
  },

  async [ActionTypes.USER_DELETE](_, id) {
    const response = this.$axios.$delete(`/api/users/${id}`);
    return response;
  }
};

export default actions;
