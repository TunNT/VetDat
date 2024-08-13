const permission = ({ store, redirect }) => {
    try {
      const user = store.getters["auth-site/siteMe"];
      let role = 0;
      if (user) {
        role = 2;
      }
      const { allowedRoutersAccess } = store.$helpers;
      const {
        currentRoute: { name }
      } = store.$router;
      if (allowedRoutersAccess(name, role)) {
        return redirect("/pet-site");
      }
    } catch (error) {
      return;
    }
  };
  
  export default permission;
  