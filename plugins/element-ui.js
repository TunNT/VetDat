import Vue from "vue";
import Element from "element-ui";
import locale from "element-ui/lib/locale/lang/en";
import loading from "vuejs-loading-screen";
Vue.use(loading, {
  bg: "rgba(0, 0, 0, 0.7)",
  icon: "refresh",
  size: 3,
  slot: `
            <div class="px-5 py-3 bg-gray-800 rounded">
                        <h3 class="text-3xl text-white"><i class="fas fa-spinner fa-spin"></i> Loading...</h3>
            </div>
            `
});

Vue.use(Element, { locale });
