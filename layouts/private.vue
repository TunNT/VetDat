<template>
  <el-container style="height: 100vh" class="private-layout">
    <el-aside
      :width="isCollapse ? '64px' : '250px'"
      style="background-color: #001529"
    >
      <nuxt-link to="/search">
        <div
          class="
            d-flex
            justify-content-center
            align-items-center
            private-layout__menu-bar-top
            py-2
          "
        >
          <span v-show="!isCollapse">VetDat</span>
        </div>
      </nuxt-link>
      <el-menu
        :collapse="isCollapse"
        :default-openeds="['1', '2', '3']"
        :default-active="isAdmin ? activedMenu : activedMenuSite"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#fff"
        class="private-layout__menu-bar"
        :collapse-transition="false"
      >
        <el-submenu class="private-layout__menu-bar__submenu" index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title"> Quản lí </span>
          </template>
          <nuxt-link v-if="isAdmin" to="/site">
            <el-menu-item index="1-1"> Site </el-menu-item>
          </nuxt-link>
          <nuxt-link v-if="isAdmin" to="/pet">
            <el-menu-item index="1-2"> Thú cưng </el-menu-item>
          </nuxt-link>
          <nuxt-link v-if="isAdmin" to="/owner" name="card">
            <el-menu-item index="1-3"> Chủ sở hữu </el-menu-item>
          </nuxt-link>
          <nuxt-link v-if="isSite" to="/pet-site">
            <el-menu-item index="1-4"> Thú cưng </el-menu-item>
          </nuxt-link>
          <nuxt-link v-if="isSite" to="/owner-site" name="card">
            <el-menu-item index="1-5"> Chủ sở hữu </el-menu-item>
          </nuxt-link>
        </el-submenu>
        <!-- <el-submenu class="private-layout__menu-bar__submenu" index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title"> Quản lí (Site)</span>
          </template>
          <nuxt-link to="/pet-site">
            <el-menu-item index="2-1"> Thú cưng </el-menu-item>
          </nuxt-link>
          <nuxt-link to="/owner-site" name="card">
            <el-menu-item index="2-2"> Chủ sở hữu </el-menu-item>
          </nuxt-link>
        </el-submenu> -->
      
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="private-layout__header d-flex">
        <el-button
          class="private-layout__header--collapse"
          @click="isCollapse = !isCollapse"
        >
          <i :class="[isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
        </el-button>
        <div>
          <el-dropdown trigger="click" @command="handleCommand">
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info"
                ></el-dropdown-item
              >
              <el-dropdown-item v-if="isAdmin" command="logout">Thoát</el-dropdown-item>
              <el-dropdown-item v-else-if="isSite" command="logoutSite">Thoát</el-dropdown-item>
              <el-dropdown-item v-else command="logoutEmpty">Thoát</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="position-relative">
        <Nuxt />
      </el-main>
    </el-container>
    <notifications group="all" />
  </el-container>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
import { mapGetters } from "vuex";
import "element-ui/lib/theme-chalk/display.css";
export default {
  data() {
    return {
      ADMIN_ROLE: 1,
      SITE_ROLE: 2,
      // USER_ROLE: 1,
      isCollapse: false,
      activedMenu: "1-1",
      activedMenuSite: "1-3",
      windowWidth: 0,
    };
  },
  computed: {
    ...mapGetters({
      loading: "auth/loading",
      admin: "auth/isAdmin",
      site: "auth-site/isSite"
    }),
    isAdmin() {
      return this.admin === this.ADMIN_ROLE;
    },
    isSite() {
      return this.site === this.SITE_ROLE;
    },
  },
  watch: {
    windowWidth(val) {
      if (val < 1200 && this.isCollapse === false) {
        this.isCollapse = true;
      } else if (val > 1199 && this.isCollapse === true) {
        this.isCollapse = false;
      }
    },
  },
  methods: {
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$store.dispatch("auth/AUTH_LOGOUT");
          this.$router.push("/");
          return;
        case "logoutSite":
          this.$store.dispatch("auth-site/AUTH_SITE_LOGOUT");
          this.$router.push("/login-site");
          return;
        case "logoutEmpty":
          this.$router.push("/");
          return;
        default:
          return;
      }
    },
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  mounted() {
    this.$nextTick(function () {
      window.addEventListener("resize", this.getWindowWidth);

      //Init
      this.getWindowWidth();
    });
  },
  created() {
    const { name } = this.$route;
    this.activedMenu = this.$helpers.routerActived(name);
  },
};
</script>

<style lang="scss">
.private-layout {
  transition: 0.3s;
  a {
    &:hover {
      text-decoration: none !important;
    }
  }
  &__menu-bar-top {
    cursor: pointer;
    span {
      font-size: 24px;
      padding-left: 10px;
      font-weight: bolder;
      color: #fff;
      &:hover {
        text-decoration: none !important;
      }
    }
  }
  &__menu-bar {
    border-right: none !important;
    &__submenu {
      .el-menu-item:not(.is-active) {
        background-color: #000c17 !important;
        color: grey !important;
        &:hover {
          color: #fff !important;
        }
      }
      .el-menu-item.is-active {
        background-color: #1890ff !important;
      }
    }
  }
  &__header {
    justify-content: space-between;
    font-size: 12px;
    height: 52px !important;
    &--collapse {
      background: transparent;
      border: none;
      font-size: 20px;
      padding: 0;
      &:hover,
      &:focus {
        background: transparent;
        color: #606266 !important;
      }
    }
  }
}
</style>
