<template>
  <div>
    <el-table
      :data="owners.data || []"
      style="width: 100%"
      @sort-change="onSortNameHandler"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        min-width="70"
        prop="name"
        label="Tên chủ sở hữu"
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
        prop="address"
        label="Địa chỉ"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="phone"
        label="Số điện thoại"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="name"
        label="Thuộc site"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.site.name}}
        </template>
    </el-table-column>
    <el-table-column
        min-width="100"
        prop="contact"
        label="Liên hệ của site"
        sortable="custom"
      >
      <template slot-scope="scope">
        {{scope.row.site.contact}}
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

    <!-- <div class="d-flex justify-content-end p-2">
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
    </div> -->
    <YesNoDialog
      :dialogVisible="showDeleteDialog"
      :onCancelHandler="onCancelDeleteHandler"
      :onSubmitHandler="onSubmitDeleteHandler"
      :msgNotify="'Bạn có muốn xóa người sở hữu này?'"
      :title="'Xóa chủ sở hữu'"
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
      search: "",
      currentPage: 1,
      showDeleteDialog: false,
      showEditDialog: false,
      pagination: {
        keyword: ""
      },
      selectedUser: {},
    };
  },
  computed: {
    ...mapGetters({
      loading: "owner/loading",
      owners: "owner/owners"
    })
  },
  methods: {
    ...mapActions({
      getOwnerList: "owner/OWNER_LIST",
      updateOwnerRole: "owner/OWNER_UPDATE",
      deleteOwner: "owner/OWNER_DELETE"
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
        this.getOwnerList(_.pickBy(val, value => value));
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getOwnerList(_.pickBy(vm.pagination, value => value));
    });
  }
};
</script>
