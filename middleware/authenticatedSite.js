import _ from "lodash";
const authenticatedSite = ({ store, redirect }) => {
  try {
    const site = store.getters["auth-site/siteMe"];
    const isValidSite = _.isEmpty(site);
    if (isValidSite) {
      return redirect('/login-site');
    }
  } catch (error) {
    store.dispatch("auth-site/AUTH_SITE_LOGOUT");
    return;
  }
};

export default authenticatedSite;