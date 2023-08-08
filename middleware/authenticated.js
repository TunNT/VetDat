import _ from "lodash";
const authenticated = ({ store, redirect }) => {
  try {
    const user = store.getters["auth/me"];
    const isValid = _.isEmpty(user);
    if (isValid) {
      return redirect('/');
    }
  } catch (error) {
    store.dispatch("auth/AUTH_LOGOUT");
    return;
  }
};

export default authenticated;