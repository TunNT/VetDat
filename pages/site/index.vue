<template>
  <div>
    <el-button size="mini" class="add-btn col-2" @click="redirectAdd">
      <i class="el-icon-plus"></i>
      <span class="add-btn-text"> Thêm site</span>
    </el-button>
    <el-table
      :data="sites.data || []"
      style="width: 100%"
      @sort-change="onSortNameHandler"
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.4)"
    >
      <el-table-column
        min-width="100"
        prop="login"
        label="Tên đăng nhập"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="name"
        label="Tên"
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
              ? "Chưa kích hoạt"
              : scope.row.status === 1
              ? "đang hoạt động"
              : scope.row.status === 2
              ? "Thử nghiệm"
              : scope.row.status === 3
              ? "Đình chỉ"
              : "Hết hạn"
          }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="100"
        prop="contact"
        label="liên hệ"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="address"
        label="Địa chỉ"
        sortable="custom"
      ></el-table-column>

      <el-table-column
        min-width="100"
        prop="phone"
        label="điện thoại"
        sortable="custom"
      ></el-table-column>

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
            >sửa</el-button
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
      :msgNotify="'Bạn có muốn xóa site này?'"
      :title="'Xóa site'"
    />
    <addSite
      :dialogVisible="showAddSiteDialog"
      :onCancelHandler="onCancelAddHandler"
      :onSubmitHandler="onSubmitAddHandler"
      :itemSelected="addSite"
      :options="statuses"
    />
    <UpdateSite
      :dialogVisible="showEditDialog"
      :onCancelHandler="onCancelEditHandler"
      :onSubmitHandler="onSubmitEditHandler"
      :itemSelected="selectedSite"
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
.header-title-top span {
  width: 58px;
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 700 !important;
  font-size: 30px;
  line-height: 20px;
  color: #003049 !important;
  padding-left: 5px;
}
.add-btn-text {
  color: black;
  font-size: 24px;
}
.add-btn {
  margin-top: 40px;
  color: #003049;
  background-color: #b3c0d1 !important;
  height: 40px !important;
  font-size: 13px;
  font-weight: bold;
}
.add-btn i {
  font-size: 24px;
}
</style>

<script>
// lib
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import addSite from "@/components/site/add";
import UpdateSite from "@/components/site/edit";
// component
import SearchInput from "@components/SearchInput";
export default {
  layout: "private",
  middleware: "authenticated",
  middleware: "permission",
  components: {
    SearchInput,
    addSite,
    UpdateSite
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
      selectedSite: {},
      showAddSiteDialog: false,
      addSite: {},
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
      loading: "site/loading",
      sites: "site/sites"
    })
  },
  methods: {
    ...mapActions({
      getSiteList: "site/SITE_LIST",
      updateSite: "site/SITE_UPDATE",
      deleteSite: "site/SITE_DELETE",
      createSite: "site/SITE_CREATE"
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
      this.$isLoading(true);
      this.createSite(value)
        .then((result) => {
          if (result.message ==="common_success") {
            this.$notify({
              group: "all",
              title: "Thêm thành công!",
              type: "success",
            });
            this.getSiteList(
              _.pickBy(this.pagination, (value) => value)
            );
            this.showAddSiteDialog = false;
            this.$router.push("/site");
          } 
        })
        .catch((error) => {
          this.$notify({
            group: "all",
            title: `"Site"đã tồn tại`,
            type: "error",
          });
        })
        .finally(() => {
          this.showAddSiteDialog = false;
          this.$isLoading(false);
        });
    },
    onSubmitEditHandler(value) {
      this.$isLoading(true);
      this.updateSite(value)
        .then((result) => {
          if (result.message === "common_success") {
            this.getSiteList(_.pickBy(this.pagination, (value) => value));
            this.$notify({
              group: "all",
              title: "Cập nhật thành công",
              type: "success",
            });
          } else {
            this.$notify({
              group: "all",
              title: "Cập nhật thất bại",
              type: "error",
              text: error,
            });
          }
        })
        .catch((error) => {
          this.$notify({
            group: "all",
            title: "Cập nhật thất bại",
            type: "error",
            text: error,
          });
        })
        .finally(() => {
          this.showEditDialog = false;
          this.$isLoading(false);
        });
    },
    onCancelEditHandler() {
      this.showEditDialog = false;
    },
    onCancelDeleteHandler() {
      this.showDeleteDialog = false;
    },
    onSubmitDeleteHandler() {
      this.$isLoading(true);
      this.deleteSite(this.selectedSite.id)
        .then((result) => {
          if (result.message === "common_success") {
            this.getSiteList(_.pickBy(this.pagination, value => value));
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
          this.$isLoading(false);
        });
    },

    handleEdit(_, row) {
      this.selectedSite = row;
      this.showEditDialog = true;
    },
    handleDelete(_, row) {
      this.selectedSite = row;
      this.showDeleteDialog = true;
    },
    handleSizeChange(val) {
      this.pagination.number = val;
    },
    handleCurrentChange(val) {
      this.pagination.page = val;
    },
    onCancelAddHandler() {
      this.showAddSiteDialog = false;
    },
    redirectAdd() {
      (this.addSite = {}), (this.showAddSiteDialog = true);
    }
  },
  watch: {
    pagination: {
      handler(val) {
        this.getSiteList(_.pickBy(val, value => value));
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getSiteList(_.pickBy(vm.pagination, value => value));
    });
  }
};
</script>
