<template>
  <div>
    <el-table
      :data="users.data || []"
      style="width: 100%"
      @sort-change="onSortNameHandler"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        min-width="250"
        prop="name"
        label="Tên"
        sortable="custom"
      >
        <span slot-scope="scope">
          {{ scope.row | MapFullname }}
        </span>
      </el-table-column>
      <el-table-column
        min-width="250"
        prop="email"
        label="Email"
        sortable="custom"
      ></el-table-column>
      <el-table-column
        prop="telephone"
        label="Điện thoại"
        sortable="custom"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="gender"
        label="Giới tính"
        sortable="custom"
        width="120"
      >
        <template slot-scope="scope">
          {{
            scope.row.gender === 0
              ? "Nữ"
              : scope.row.gender === 1
              ? "Nam"
              : "Khác"
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="taro_role"
        label="Quyền"
        sortable="custom"
        width="120"
      >
        <span slot-scope="scope">
          {{ scope.row.taro_role | RoleDisplay }}
        </span>
      </el-table-column>

      <el-table-column
        prop="created_at"
        label="Thời gian tạo"
        width="180"
      ></el-table-column>

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
            >Xoá</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="d-flex justify-content-end p-2">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="+users.currentPage || pagination.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="+pagination.number"
        layout="prev, pager, next, sizes"
        :total="+users.sizeDocuments"
      >
      </el-pagination>
    </div>
    <YesNoDialog
      :dialogVisible="showDeleteDialog"
      :onCancelHandler="onCancelDeleteHandler"
      :onSubmitHandler="onSubmitDeleteHandler"
      :msgNotify="'Bạn có muốn xoá người dùng này?'"
      :title="'Xoá người dùng'"
    />

    <YesNoDialog
      :dialogVisible="showEditDialog"
      :onCancelHandler="onCancelEditHandler"
      :onSubmitHandler="onSubmitEditHandler"
      :title="`Chỉnh sửa thông tin ${$options.filters.MapFullname(
        selectedUser
      )}`"
      :contentLabel="'Chọn quyền'"
      :options="roles"
      :defaultRole="selectedUser.taro_role"
      :submitType="'primary'"
      :submitText="'Cập nhật'"
    />
  </div>
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
// lib
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

// component
import SearchInput from "@components/SearchInput";
export default {
  layout: "private",
  middleware: "authenticated",
  middleware: "permission",
  components: {
    SearchInput,
  },
  data() {
    return {
      search: "",
      currentPage: 1,
      showDeleteDialog: false,
      showEditDialog: false,
      pagination: {
        page: 1,
        number: 10,
        field: "",
        order: "",
        keyword: "",
      },
      selectedUser: {},
      roles: [
        // TODO: define constant or get list using API
        {
          label: "User",
          value: 1,
        },
        {
          label: "Reader",
          value: 2,
        },
        {
          label: "Admin",
          value: 3,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      loading: "user/loading",
      users: "user/users",
    }),
  },
  methods: {
    ...mapActions({
      getUserList: "user/USER_LIST",
      updateUserRole: "user/USER_UPDATE",
      deleteUser: "user/USER_DELETE",
    }),
    onChangeHandler(val) {
      this.pagination.keyword = val;
    },
    onSortNameHandler({ prop, order }) {
      const sort = {
        field: order ? prop : "",
        order: order?.replace("ing", ""),
      };
      this.pagination = {
        ...this.pagination,
        ...sort,
      };
    },
    onSubmitEditHandler(value) {
      if (!value) return;
      this.updateUserRole({
        user_id: this.selectedUser.id,
        role_id: value,
      })
        .then(({ message, error }) => {
          if (message === "SUCCESS") {
            this.getUserList(_.pickBy(this.pagination, (value) => value));
            this.$notify({
              group: "all",
              title: "Cập nhật thành công",
              type: "success",
            });
          } else {
            this.$notify({
              group: "all",
              title: "Cập nhật không thành công",
              type: "error",
              text: error,
            });
          }
        })
        .catch((error) => {
          this.$notify({
            group: "all",
            title: "Cập nhật không thành công",
            type: "error",
            text: error,
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
    onSubmitDeleteHandler() {
      this.deleteUser(this.selectedUser.id)
        .then(({ message, error }) => {
          if (message === "SUCCESS") {
            this.getUserList(_.pickBy(this.pagination, (value) => value));
            this.$notify({
              group: "all",
              title: "Xóa thành công",
              type: "success",
            });
          } else {
            this.$notify({
              group: "all",
              title: "Xóa không thành công",
              type: "error",
              text: error,
            });
          }
        })
        .catch((error) => {
          if (error !== 404 && error !== 500) {
            this.$notify({
              group: "all",
              title: "Xóa không thành công",
              type: "error",
              text: error,
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
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.getUserList(_.pickBy(val, (value) => value));
      },
      deep: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getUserList(_.pickBy(vm.pagination, (value) => value));
    });
  },
};
</script>
