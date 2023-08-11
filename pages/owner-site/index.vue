<template>
  <div>
    <el-button size="mini" class="add-btn col-2" @click="redirectAdd">
      <i class="el-icon-plus"></i>
      <span class="add-btn-text"> Thêm chủ sở hữu</span>
    </el-button>
    <el-table
      :data="ownerSites.data || []"
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
        prop="notes"
        label="Mô tả"
        sortable="custom"
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
    <addOwner
      :dialogVisible="showAddOwnerDialog"
      :onCancelHandler="onCancelAddHandler"
      :onSubmitHandler="onSubmitAddHandler"
      :itemSelected="addOwner"
      :options="statuses"
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
import addOwner from "@/components/owner/add";

// component
import SearchInput from "@components/SearchInput";
export default {
  layout: "private",
  // middleware: "authenticated",
  // middleware: "permission",
  components: {
    SearchInput,
    addOwner
  },
  data() {
    return {
      addOwner: {},
      showAddOwnerDialog: false,
      search: "",
      currentPage: 1,
      showDeleteDialog: false,
      showEditDialog: false,
      pagination: {
        keyword: ""
      },
      selectedUser: {},
      statuses: [
        {
          label: "chưa kích hoạt",
          value: 0
        },
        {
          label: "kích hoạt",
          value: 1
        },
        {
          label: "thử nghiệm",
          value: 2
        },
        {
          label: "hoãn lại",
          value: 3
        },
        {
          label: "hết hạn",
          value: 4
        }
      ],
    };
  },
  computed: {
    ...mapGetters({
      loading: "owner-site/loading",
      ownerSites: "owner-site/ownerSites"
    })
  },
  methods: {
    ...mapActions({
      getOwnerSiteList: "owner-site/OWNER_SITE_LIST",
      createOwner: "owner-site/OWNER_SITE_CREATE",
      updateOwnerRole: "owner-site/OWNER_SITE_UPDATE",
      deleteOwner: "owner-site/OWNER_SITE_DELETE"
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
    onSubmitAddHandler(value) {
      this.createOwner(value)
        .then((result) => {
          if (result.message ==="common_success") {
            this.$notify({
              group: "all",
              title: "Thêm thành công!",
              type: "success",
            });
            this.getOwnerSiteList(
              _.pickBy(this.pagination, (value) => value)
            );
            this.showAddOwnerDialog = false;
            this.$router.push("/owner-site");
          } 
        })
        .catch((error) => {
          this.$notify({
            group: "all",
            title: `"chủ sở hữu"đã tồn tại`,
            type: "error",
          });
        })
        .finally(() => {
          this.showAddOwnerDialog = false;
        });
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
    onCancelAddHandler() {
      this.showAddPetDialog = false;
    },
    redirectAdd() {
      (this.addOwner = {}), (this.showAddOwnerDialog = true);
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
        this.getOwnerSiteList(_.pickBy(val, value => value));
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getOwnerSiteList(_.pickBy(vm.pagination, value => value));
    });
  }
};
</script>
