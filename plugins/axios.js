import Vue from "vue";

export default function({ $axios, redirect }, inject) {
  $axios.onRequest(config => {
    config.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
      "access-token"
    )}`;
  });
  $axios.onError(error => {
    if (error.response.status === 404) {
      Vue.notify({
        group: "all",
        title: "Hệ thống đang bận",
        type: "error",
        text: error
      });
      // redirect("/404");
    }
    if (error.response.status === 500) {
      // redirect("/500");
      Vue.notify({
        group: "all",
        title: "Hệ thống đang bận",
        type: "error",
        text: error
      });
    }

    throw error.response.status;
  });

  inject("axios", $axios);
}
