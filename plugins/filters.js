import Vue from "vue";

Vue.filter("ByUnkown", val => val || "Super Admin");

Vue.filter("MapFullname", val => {
  if (val.first_name && val.last_name)
    return `${val.first_name} ${val.last_name}`;

  return val.first_name || val.last_name;
});

Vue.filter("RoleDisplay", val => {
  switch (val) {
    case 1:
      return "User";
    case 2:
      return "Reader";
    default:
      return "Admin";
  }
});
