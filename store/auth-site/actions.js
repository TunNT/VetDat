import ActionTypes from "./action-types";
import MutationTypes from "./mutation-types";

const actions = {
    async [ActionTypes.AUTH_SITE_LOGIN]({ commit }, { codeID, password }) {
        commit(MutationTypes.SET_LOADING, true);
        let response = {}
        try {
            response = await this.$axios.$post('/site/sites/login', {
                login: codeID,
                password
            })
            const { data, error } = response;
            if (!data || error) throw error;
            commit(MutationTypes.SET_TOKEN_SITE, data)
        } catch (err) {
            console.log({ err })
                // handle error      
        } finally {
            commit(MutationTypes.SET_LOADING, false);
        }
        return response
    },

    async [ActionTypes.GET_ME]({ commit }, payload) {
        commit(MutationTypes.SET_LOADING, true);
        try {
            const response = await this.$axios.$get('/api/users/me')
            commit(MutationTypes.SET_CURRENT_USER, response)
        } catch (err) {
            // reset auth store
            console.log('error')
            commit(MutationTypes.RESET)
        } finally {
            commit(MutationTypes.SET_LOADING, false);
        }
    },

    [ActionTypes.AUTH_REGISTER](_, payload) {
        const response = this.$axios.$post('/api/auth/signup', payload);
    },

    async [ActionTypes.AUTH_FORGOT](_, payload) {
        const response = true //
        return response
    },

    async [ActionTypes.AUTH_LOGOUT]({ commit }) {
        commit(MutationTypes.RESET)
    }
}

export default actions