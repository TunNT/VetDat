const permission = ({ store, redirect }) => {
  try {
    const user = store.getters["auth/me"];
    const { allowedRoutersAccess } = store.$helpers;
    const {
      currentRoute: { name }
    } = store.$router;
    if (allowedRoutersAccess(name, user.taro_role)) {
      return redirect("/card-deck-list");
    }
  } catch (error) {
    return;
  }
};

export default permission;