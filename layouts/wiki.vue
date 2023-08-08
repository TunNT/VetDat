<template>
  <div class="wrap__wiki">
    <el-row type="flex" justify="center" class="py-3">
      <el-col :span="18" :offset="3" class="text-center">
        <nuxt-link to="/">
          <LogoWiki />
        </nuxt-link>
      </el-col>
      <el-col :span="3" class="text-right">
        <!-- Login/logout actions -->
        <span class="wiki__actions" v-if="isEmpty(me)">
          <nuxt-link to="/"> Đăng nhập </nuxt-link>
        </span>
        <span class="wiki__actions" v-else @click="$store.dispatch('auth/AUTH_LOGOUT')">
          Đăng xuất
        </span>
      </el-col>
    </el-row>
    <el-row>
      <Nuxt />
    </el-row>
    <notifications group="all" />
  </div>
</template>

<script>
import isEmpty from "lodash/isEmpty";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isEmpty,
    };
  },
  computed: {
    ...mapGetters({
      me: "auth/me",
    }),
  },
};
</script>

<style lang="scss">
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  body {
    background-color: inherit;
  }
  .wrap__wiki {
    box-sizing: border-box;
    background-image: url("/ezgif.com-gif-maker.gif");
    background-color: transparent !important;
    background-repeat: no-repeat;
    background-size: cover;
    object-fit: cover;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    min-height: 100vh;
    width: 100%;
    height: 100%;
    a {
      color: white;
      &:hover {
        text-decoration: auto;
        color: skyblue !important;
      }
    }
    .wiki__actions {
      color: white;
      cursor: pointer !important;
      padding: 10px;
      &:hover {
        color: skyblue !important;
      }
    }
  }
}
</style>
