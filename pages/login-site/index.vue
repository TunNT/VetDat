<template>
    <div class="login_container">
        <b-container fluid class="text-center">
            <b-row class="m-auto" style="width: 370px">
                <nuxt-link to="/search">
                    <b-col cols="12" class="d-flex col-12 align-items-center justify-content-center mb-3">
                        <h1 class="title">VetDat site</h1>
                    </b-col>
                </nuxt-link>
                <b-col cols="12">
                    <el-form :model="formLogin" ref="formLogin" :rules="rules">
                        <el-form-item prop="codeID">
                            <el-input placeholder="Email hoặc số điện thoại" v-model="formLogin.codeID">
                                <i slot="prefix" class="el-input__icon el-icon-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input placeholder="Mật khẩu" v-model="formLogin.password" show-password>
                                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </b-col>
                <b-col class="d-flex col-12 align-items-between justify-content-between mb-2">
                    <el-checkbox v-model="checked" style="font-size: 1rem">Lưu tài khoản</el-checkbox>
                    <p class="p_label">Quên mật khẩu</p>
                </b-col>
                <b-col cols="12">
                    <el-button type="primary" class="w-100" @click="onLoginHandler">Đăng nhập</el-button>
                </b-col>
                <b-col class="col-12 mt-3 text-right">
                    <nuxt-link to="/register">
                        <p class="p_label">Đăng ký tài khoản mới</p>
                    </nuxt-link>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
  
<script>
import { mapActions, mapGetters } from "vuex";
import _ from "lodash";
export default {
    // middleware({ store, redirect }) {
    //     const user = store.getters["auth/me"];
    //     if (!_.isEmpty(user)) {
    //         return redirect("/card-deck-list");
    //     }
    // },
    data() {
        return {
            formLogin: {
                codeID: "",
                password: "",
            },
            rules: {
                codeID: [
                    {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                        trigger: "blur",
                    },
                ],
            },
            checked: false,
        };
    },
    methods: {
        ...mapActions({
            login: "auth-site/AUTH_SITE_LOGIN",
            fetchCurrentUser: "auth-site/GET_ME",
        }),
        onLoginHandler() {
            this.$refs.formLogin.validate((valid) => {
                if (valid) {
                    this.login(this.formLogin)
                        .then(({ error, data }) => {
                            if (error || !data) {
                                this.$notify({
                                    group: "all",
                                    title: "Đăng nhập thất bại",
                                    type: "error",
                                    text: "Tên đăng nhập hoặc mật khẩu không đúng!",
                                });
                            } else {
                                this.$notify({
                                    group: "all",
                                    title: "Đăng nhập thành công!",
                                    type: "success",
                                });
                                this.$router.push("/pet-site");
                            }
                        })
                        .catch((error) => {
                            this.$notify({
                                group: "all",
                                title: "Đăng nhập thất bại",
                                type: "error",
                                text: "Tên đăng nhập hoặc mật khẩu không đúng!",
                            });
                        });
                }
            });
        },
    },
    computed: {
        ...mapGetters({
            loading: "auth/loading",
            me: "auth/me",
        }),
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

.title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 3rem;
    color: #35495e;
    letter-spacing: 1px;
}

.p_label {
    font-size: 14px;
}
</style>
  