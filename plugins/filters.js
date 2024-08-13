import Vue from "vue";
import moment from 'moment';

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
Vue.filter('FormatDay', val => {
  if (val) {
      return moment(String(val)).format('MM/DD/YYYY')
  }
});
Vue.filter('FormatDate', val => {
  if (val) {
      return moment(String(val)).format('MM/DD/YYYY ss:mm:HH')
  }
});

