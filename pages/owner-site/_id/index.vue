<template>
    <div>
        <template class="main">

            <div class="main-container">
                <b-row class="m-auto form-create">
                    <h3 class="title-content-pet">
                        Thông tin của chủ sở hữu: {{ ownerSite.name }}
                    </h3>
                    <b-col cols="2"></b-col>
                    <b-col cols="12" md="5" lg="5" class="mt-5 text-center">
                        <ul class="field-list">
                            <li class="field-item">
                                <span class="field-label">Trạng thái::</span>
                                <span class="field-value">{{
                                    ownerSite.status === 0
                                    ? "not activated "
                                    : ownerSite.status === 1
                                        ? "Ok"
                                        : ownerSite.status === 2
                                            ? "demo"
                                            : ownerSite.status === 3
                                                ? "suspend"
                                                : "expired"
                                }}</span>
                            </li>
                            <!-- Repeat the above <li> structure for the remaining fields -->
                            <li class="field-item">
                                <span class="field-label">Tên:</span>
                                <span class="field-value">{{ ownerSite.name }}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Địa chỉ:</span>
                                <span class="field-value">{{ ownerSite.address }}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Số điện thoại:</span>
                                <span class="field-value">{{ ownerSite.phone }}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Mô tả:</span>
                                <span class="field-value">{{ ownerSite.notes }}</span>
                            </li>
                        </ul>
                    </b-col>
                    <b-col cols="12" md="5" lg="5" class="mt-5 text-center">
                        <ul class="field-list">
                            <li class="field-item">
                                <span class="field-label">Ngày tạo:</span>
                                <span class="field-value">{{ ownerSite.createdAt | FormatDate}}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Cập nhật lại vào ngày:</span>
                                <span class="field-value">{{ ownerSite.statusDate | FormatDate}}</span>
                            </li>
                        </ul>
                    </b-col>
                    <b-col cols="12">
                        <div class="text-center mt-5">
                            <el-button class="btn-cancel" @click="onBackHome">Quay lại</el-button>
                        </div>
                    </b-col>
                </b-row>
            </div>
        </template>
    </div>
</template>
<style>
.btn-delete {
    background-color: #f78989;
}

.btn-create {
    background-color: #b3c0d1;
}

.field-label-title {
    font-size: 24px;
}

.title-content-pet {
    width: 100%;
}

.main-container-empty {
    margin-top: 50px;
    text-align: center;
}

.main-container {
    margin-top: 50px;
    text-align: center;
    background-color: #f5f5f5;
    box-shadow: 0px 0px 5px 1px #f1eaea;
    padding: 50px;
}

.field-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.field-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.field-label {
    font-weight: bold;
    margin-right: 10px;
}

.field-value {
    font-style: italic;
}

.search-pet {
    margin-top: 20px;
}

.search-pet .el-input__inner {
    height: 50px;
}

.el-header {
    background-color: #b3c0d1;
    color: #333;
    line-height: 60px;
}

.btn-info {
    border: none;
    font-style: italic;
}

.el-aside {
    color: #333;
}

.header-title-pet {
    text-align: center;
    margin-top: 25px;
}

.header-title-pet span {
    width: 58px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700 !important;
    font-size: 30px;
    line-height: 20px;
    color: #003049 !important;
    padding-left: 5px;
}
</style>
  
<script>
// lib
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

// component
export default {
    layout: "private",
    middleware: "authenticatedSite",
    middleware: "permissionSite",
    middleware: "isValidTokenSite",
    components: {
    },
    data() {
        return {

        };
    },
    computed: {
        ...mapGetters({
            ownerSite: "owner-site/ownerSite"
        }),
        isPetsEmpty() {
            return this.pets.length === 0;
        }
    },
    methods: {
        ...mapActions({
            listOwnerDetail: "owner-site/OWNER_SITE_DETAIL"
        }),
        onBackHome() {
            this.$router.push('/owner-site')
        }
    },
    created() {
        const { id } = this.$route.params;
        this.listOwnerDetail(id);
    },
};
</script>
  