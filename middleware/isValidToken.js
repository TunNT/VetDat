import _ from "lodash";
const isValidToken = async ({ store }) => {
  const hasUser = !_.isEmpty(store.getters["auth/me"]);
  const access_token = localStorage.getItem("access-token");
  if (!access_token) {
    await store.dispatch("auth/AUTH_LOGOUT");
    return;
  }
  if (!hasUser) {
    await store.dispatch("auth/GET_ME");
    return;
  }
  return;
};

export default isValidToken;