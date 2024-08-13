import _ from "lodash";
const isValidTokenSite = async ({ store }) => {
  const hasUser = !_.isEmpty(store.getters["auth-site/siteMe"]);
  const access_token = localStorage.getItem("access-token-site");
  if (!access_token) {
    await store.dispatch("auth-site/AUTH_SITE_LOGOUT");
    return;
  }
  if (!hasUser) {
    await store.dispatch("auth-site/GET_SITE_ME");
    return;
  }
  return;
};

export default isValidTokenSite;