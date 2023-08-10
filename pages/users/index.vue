<template>
  <div>
    <el-table
      :data="Owner.data || []"
      style="width: 100%"
      @sort-change="onSortNameHandler"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        min-width="100"
        prop="Name"
        label="Name"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="Status"
        label="Status"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{
            scope.row.Status === 0
              ? "not activated "
              : scope.row.Status === 1
              ? "Ok"
              : scope.row.Status === 2
              ? "demo"
              : scope.row.Status === 3
              ? "suspend"
              : "expired"
          }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="100"
        prop="Address"
        label="Address"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="Phone"
        label="Phone"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="Email"
        label="Email"
        sortable="custom"
      ></el-table-column>

      <el-table-column align="right" width="250">
        <template slot="header">
          <SearchInput
            :placeholder="'Type to search'"
            :clearable="true"
            @onChangeHandler="onChangeHandler"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="btn-info"
            @click="handleEdit(scope.$index, scope.row)"
            >More infomation</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column>

      <!-- <el-table-column
        min-width="250"
        prop="name"
        label="Tên"
        sortable="custom"
      >
        <span slot-scope="scope">
          {{ scope.row | MapFullname }}
        </span>
      </el-table-column> -->
      <!-- <el-table-column align="right" width="250">
        <template slot="header">
          <SearchInput
            :placeholder="'Type to search'"
            :clearable="true"
            @onChangeHandler="onChangeHandler"
          />
        </template>
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >Delete</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>

    <div class="d-flex justify-content-end p-2">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="+Owner.currentPage || pagination.page"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="+pagination.number"
        layout="prev, pager, next, sizes"
        :total="+Owner.sizeDocuments"
      >
      </el-pagination>
    </div>
    <YesNoDialog
      :dialogVisible="showDeleteDialog"
      :onCancelHandler="onCancelDeleteHandler"
      :onSubmitHandler="onSubmitDeleteHandler"
      :msgNotify="'Do you want to delete this user?'"
      :title="'Delete user'"
    />

    <YesNoDialog
      :dialogVisible="showEditDialog"
      :onCancelHandler="onCancelEditHandler"
      :onSubmitHandler="onSubmitEditHandler"
      :title="`Owner description`"
      :contentLabel="'Label'"
      :options="roles"
      :defaultRole="selectedUser.taro_role"
      :submitType="'primary'"
      :submitText="'Submit'"
    />
  </div>
</template>
<style>
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
      Owner: {
        data: [
          {
            OwnerID: 1,
            Status: 1,
            StatusDate: "",
            SiteID: 1,
            ModDate: "",
            ModID: "",
            Name: "trung",
            Address: "Da Nang",
            Phone: "0847410803",
            Email: "trung@gmail.com",
            Notes: "customer"
          },
          {
            OwnerID: 2,
            Status: 2,
            StatusDate: "",
            SiteID: 1,
            ModDate: "",
            ModID: "",
            Name: "trung",
            Address: "Da Nang",
            Phone: "0847410803",
            Email: "trung@gmail.com",
            Notes: "customer"
          },
          {
            OwnerID: 3,
            Status: 3,
            StatusDate: "",
            SiteID: 1,
            ModDate: "",
            ModID: "",
            Name: "trung",
            Address: "Da Nang",
            Phone: "0847410803",
            Email: "trung@gmail.com",
            Notes: "customer"
          },
          {
            OwnerID: 4,
            Status: 3,
            StatusDate: "",
            SiteID: 1,
            ModDate: "",
            ModID: "",
            Name: "trung",
            Address: "Da Nang",
            Phone: "0847410803",
            Email: "trung@gmail.com",
            Notes: "customer"
          },
          {
            OwnerID: 5,
            Status: 2,
            StatusDate: "",
            SiteID: 1,
            ModDate: "",
            ModID: "",
            Name: "trung",
            Address: "Da Nang",
            Phone: "0847410803",
            Email: "trung@gmail.com",
            Notes: "customer"
          }
        ],
        sizeDocuments: 5,
        currentPage: 1
      },
      search: "",
      currentPage: 1,
      showDeleteDialog: false,
      showEditDialog: false,
      pagination: {
        page: 1,
        number: 10,
        field: "",
        order: "",
        keyword: ""
      },
      selectedUser: {},
      roles: [
        // TODO: define constant or get list using API
        {
          label: "a",
          value: 1
        },
        {
          label: "b",
          value: 2
        },
        {
          label: "c",
          value: 3
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      loading: "user/loading",
      users: "user/users"
    })
  },
  methods: {
    ...mapActions({
      getUserList: "user/USER_LIST",
      updateUserRole: "user/USER_UPDATE",
      deleteUser: "user/USER_DELETE"
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
        this.getUserList(_.pickBy(val, value => value));
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getUserList(_.pickBy(vm.pagination, value => value));
    });
  }
};
</script>
