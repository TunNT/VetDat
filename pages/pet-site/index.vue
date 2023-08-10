<template>
    <div>
      <el-table
      :data="petSites.data || []"
      style="width: 100%"
      @sort-change="onSortNameHandler"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        min-width="70"
        prop="id"
        label="Mã định danh"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="status"
        label="Trạng thái"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{
            scope.row.status === 0
              ? "chưa kích hoạt"
              : scope.row.status === 1
              ? "kích hoạt"
              : scope.row.status === 2
              ? "Thử nghiệm"
              : scope.row.status === 3
              ? "Trì hoãn"
              : "Hết hạn"
          }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="100"
        prop="petColor"
        label="Màu sắc"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="petSex"
        label="Giới tính"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="petType"
        label="Loại thú cưng"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="name"
        label="Chủ sở hữu"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.owner.name}}
        </template>
    </el-table-column>

    <el-table-column
        min-width="100"
        prop="phone"
        label="Phone(chủ sở hữu)"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.owner.phone}}
        </template>
    </el-table-column>

      <el-table-column align="right" width="250">
        <template slot="header">
          <SearchInput
            :placeholder="'Nhập để tìm kiếm'"
            :clearable="true"
            @onChangeHandler="onChangeHandler"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Sửa</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Xóa</el-button
          >
        </template>
      </el-table-column>
    </el-table>
      <YesNoDialog
        :dialogVisible="showDeleteDialog"
        :onCancelHandler="onCancelDeleteHandler"
        :onSubmitHandler="onSubmitDeleteHandler"
        :msgNotify="'Do you want to delete this user?'"
        :title="'Delete user'"
      />
    </div>
  </template>
  <style>
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
  import SearchInput from "@components/SearchInput";
  export default {
    layout: "private",
    // middleware: "authenticated",
    // middleware: "permission",
    components: {
      SearchInput
    },
    data() {
      return {
        search: "",
        currentPage: 1,
        showDeleteDialog: false,
        showEditDialog: false,
        pagination: {
          keyword: ""
        },
        selectedUser: {}
      };
    },
    computed: {
      ...mapGetters({
        loading: "pet/loading",
        petSites: "pet-site/petSites"
      }),
      isPetsEmpty() {
        return this.pets.length === 0;
      }
    },
    methods: {
      ...mapActions({
        getPetSiteList: "pet-site/PET_SITE_LIST",
        updatePetRole: "pet-site/PET_UPDATE",
        deletePet: "pet-site/PET_DELETE"
      }),
      onChangeHandler(val) {
        this.pagination.keyword = val;
      },
      onSortNameHandler({ prop, order }) {
        const sort = {
          field: order ? prop : "",
          order: order?.replace("ing", "")
        };
        this.pagination = {
          ...this.pagination,
          ...sort
        };
      },
      onSubmitEditHandler(value) {
        if (!value) return;
        this.updateUserRole({
          user_id: this.selectedUser.id,
          role_id: value
        })
          .then(({ message, error }) => {
            if (message === "SUCCESS") {
              this.getUserList(_.pickBy(this.pagination, value => value));
              this.$notify({
                group: "all",
                title: "Cập nhật thành công",
                type: "success"
              });
            } else {
              this.$notify({
                group: "all",
                title: "Cập nhật không thành công",
                type: "error",
                text: error
              });
            }
          })
          .catch(error => {
            this.$notify({
              group: "all",
              title: "Cập nhật không thành công",
              type: "error",
              text: error
            });
          })
          .finally(() => {
            this.showEditDialog = false;
          });
      },
      onCancelEditHandler() {
        this.showEditDialog = false;
      },
      onCancelDeleteHandler() {
        this.showDeleteDialog = false;
      },
      onBackHome() {
        this.$router.push("/pet");
      },
      onSubmitDeleteHandler() {
        this.deleteUser(this.selectedUser.id)
          .then(({ message, error }) => {
            if (message === "SUCCESS") {
              this.getUserList(_.pickBy(this.pagination, value => value));
              this.$notify({
                group: "all",
                title: "Xóa thành công",
                type: "success"
              });
            } else {
              this.$notify({
                group: "all",
                title: "Xóa không thành công",
                type: "error",
                text: error
              });
            }
          })
          .catch(error => {
            if (error !== 404 && error !== 500) {
              this.$notify({
                group: "all",
                title: "Xóa không thành công",
                type: "error",
                text: error
              });
            }
          })
          .finally(() => {
            this.showDeleteDialog = false;
          });
      },
  
      handleEdit(_, row) {
        this.selectedUser = row;
        this.showEditDialog = true;
      },
      handleDelete(_, row) {
        this.selectedUser = row;
        this.showDeleteDialog = true;
      },
      handleSizeChange(val) {
        this.pagination.number = val;
      },
      handleCurrentChange(val) {
        this.pagination.page = val;
      }
    },
    watch: {
      pagination: {
        handler(val) {
          this.getPetSiteList(_.pickBy(val, value => value));
        },
        deep: true
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.getPetSiteList(_.pickBy(vm.pagination, value => value));
      });
    }
  };
  </script>
  