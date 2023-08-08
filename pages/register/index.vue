<template>
  <div class="login_container">
    <b-container fluid class="text-center">
      <b-row class="m-auto" style="width: 370px">
        <HeaderPublic />
        <b-col cols="12">
          <h1 class="sub_title mb-3">Đăng ký</h1>
        </b-col>
        <b-col cols="12">
          <el-form :model="formRegister" ref="formRegister" :rules="rules">
            <el-form-item prop="email">
              <el-input
                placeholder="Địa chỉ email"
                v-model="formRegister.email"
              >
                <i slot="prefix" class="el-input__icon el-icon-postcard"></i>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-col :span="12">
                <el-form-item prop="first_name">
                  <el-input placeholder="Họ" v-model="formRegister.first_name">
                    <i slot="prefix" class="el-input__icon el-icon-user"></i>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="last_name">
                  <el-input
                    placeholder="Tên"
                    v-model="formRegister.last_name"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-form-item prop="telephone">
              <el-input
                placeholder="Số điện thoại"
                v-model="formRegister.telephone"
              >
                <el-select
                  v-model="formRegister.prefix"
                  slot="prepend"
                  placeholder="Mã"
                  style="min-width: 90px"
                >
                  <el-option label="+84" value="84"></el-option>
                </el-select>
                <i
                  slot="prefix"
                  class="el-input__icon el-icon-mobile-phone"
                ></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                placeholder="Mật khẩu"
                v-model="formRegister.password"
                show-password
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>

            <el-form-item prop="confirmPassword">
              <el-input
                placeholder="Xác nhận mật khẩu"
                v-model="formRegister.password_confirmation"
                show-password
              >
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>
          </el-form>
        </b-col>
        <b-col class="d-flex col-12 align-items-center justify-content-between">
          <el-button type="primary" class="w-50" @click="onRegisterHandler"
            >Đăng ký</el-button
          >
          <p class="p_label my-auto w-50 text-right">
            <nuxt-link to="/"> Bạn đã có tài khoản? </nuxt-link>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  middleware({ store, redirect }) {
    const user = store.getters["auth/me"];
    if (!_.isEmpty(user)) {
      return redirect("/card-deck-list");
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập mật khẩu"));
      } else {
        if (this.formRegister.password_confirmation !== "") {
          this.$refs.formRegister.validateField("password_confirmation");
        }
        callback();
      }
    };
    const validatePassConfirm = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Vui lòng nhập mật khẩu xác nhận"));
      } else if (value !== this.formRegister.password) {
        callback(new Error("Mật khẩu xác nhận không chính xác"));
      } else {
        callback();
      }
    };
    return {
      formRegister: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        password_confirmation: "",
        telephone: "",
        prefix: "84",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Vui lòng nhập email",
            trigger: "blur",
          },
        ],
        first_name: [
          {
            required: true,
            message: "Vui lòng nhập họ",
            trigger: "blur",
          },
        ],
        last_name: [
          {
            required: true,
            message: "Vui lòng nhập tên",
            trigger: "blur",
          },
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        password_confirmation: [
          { validator: validatePassConfirm, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      registerAccount: "auth/AUTH_REGISTER",
    }),
    onRegisterHandler() {
      this.$refs.formRegister.validate((valid) => {
        if (valid) {
          this.registerAccount(this.formRegister)
            .then(() => {
              this.$notify({
                group: "all",
                title: "Tạo tài khoản thành công",
                type: "success",
              });
              this.$router.push("/");
            })
            .catch((error) => {
              this.$notify({
                group: "all",
                title: "Tạo tài khoản thất bại",
                type: "error",
                text: error,
              });
            });
        }
      });
    },
  },
};
</script>

<style>
.login_container {
  margin: 0 auto;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title,
.sub_title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 3rem;
  color: #35495e;
  letter-spacing: 1px;
}
.sub_title {
  font-size: 1.5rem;
}
.p_label {
  font-size: 14px;
}
</style>
