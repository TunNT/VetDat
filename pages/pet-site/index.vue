<template>
  <div>
    <el-button size="mini" class="add-btn col-2" @click="redirectAdd">
      <i class="el-icon-plus"></i>
      <span class="add-btn-text"> Thêm thú cưng</span>
    </el-button>
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
        <!-- <template slot-scope="scope">
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
        </template> -->
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
        prop="petDob"
        label="Năm tuổi"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.petDob | FormatDay }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="100"
        prop="name"
        label="Chủ sở hữu"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.owner.name }}
        </template>
      </el-table-column>

      <el-table-column
        min-width="100"
        prop="phone"
        label="Phone(chủ sở hữu)"
        sortable="custom"
      >
        <template slot-scope="scope">
          {{ scope.row.owner.phone }}
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
          <el-button
            size="mini"
            @click="handleInfor(scope.$index, scope.row)"
            >Chi tiết</el-button
          >
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >Sửa</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <addPet
      :dialogVisible="showAddPetDialog"
      :onCancelHandler="onCancelAddHandler"
      :onSubmitHandler="onSubmitAddHandler"
      :itemSelected="addPet"
      :options="statuses"
      :optionsPetTriet="optionsPetTriet"
      :optionsPetType="optionsPetType"
      :optionsPetSex="optionsPetSex"
      :listOwner=ownerSites.data
    />
    <updatePet :dialogVisible="showEditDialog" :onCancelHandler="onCancelEditHandler"
      :onSubmitHandler="onSubmitEditHandler" :itemSelected="selectedPet" :options="statuses"
      :optionsPetTriet="optionsPetTriet" :optionsPetType="optionsPetType" :optionsPetSex="optionsPetSex"
      :listOwner=ownerSites.data />
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
import addPet from "@/components/pet/add";
import updatePet from "@/components/pet/edit-site";

// component
import SearchInput from "@components/SearchInput";
export default {
  layout: "private",
  middleware: "authenticatedSite",
  middleware: "permissionSite",
  middleware: "isValidTokenSite",
  components: {
    SearchInput,
    addPet,
    updatePet
  },
  data() {
    return {
      search: "",
      currentPage: 1,
      showEditDialog: false,
      showAddPetDialog: false,
      addPet: {},
      pagination: {
        keyword: ""
      },
      selectedPet: {},
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
      optionsPetTriet: [
        {
          label: "chưa xác định",
          value: 0
        },
        {
          label: "đã triệt sản",
          value: 1
        },
        {
          label: "chưa triệt sản",
          value: 2
        }
      ],
      optionsPetType: [
        {
          label: "chưa xác định",
          value: 0
        },
        {
          label: "Chó",
          value: 1
        },
        {
          label: "Mèo",
          value: 2
        },
        {
          label: "Thỏ",
          value: 3
        }
      ],
      optionsPetSex: [
        {
          label: "chưa xác định",
          value: 0
        },
        {
          label: "Đực",
          value: 1
        },
        {
          label: "Cái",
          value: 2
        },
      ]
    };
  },
  computed: {
    ...mapGetters({
      loading: "pet/loading",
      petSites: "pet-site/petSites",
      ownerSites: "owner-site/ownerSites"
    }),
    isPetsEmpty() {
      return this.pets.length === 0;
    }
  },
  methods: {
    ...mapActions({
      getPetSiteList: "pet-site/PET_SITE_LIST",
      createPet: "pet-site/PET_SITE_CREATE",
      updatePet: "pet-site/PET_SITE_UPDATE",
      getOwnerSiteList: "owner-site/OWNER_SITE_LIST",
    }),
    onChangeHandler(val) {
      this.pagination.keyword = val;
    },
    onCancelAddHandler() {
      this.showAddPetDialog = false;
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
    handleInfor(_,row) {
      this.$router.push(`/pet-site/${row.id}`)
    },
    onSubmitAddHandler(value) {
      this.createPet(value)
        .then((result) => {
          if (result.message ==="common_success") {
            this.$notify({
              group: "all",
              title: "Thêm thành công!",
              type: "success",
            });
            this.getPetSiteList(
              _.pickBy(this.pagination, (value) => value)
            );
            this.showAddPetDialog = false;
            this.$router.push("/pet-site");
          } 
        })
        .catch((error) => {
          this.$notify({
            group: "all",
            title: `"Thú cưng"đã tồn tại`,
            type: "error",
          });
        })
        .finally(() => {
          this.showAddPetDialog = false;
        });
    },
    onSubmitEditHandler(value) {
      this.updatePet(value)
        .then((result) => {
          if (result.message === "common_success") {
            this.getPetSiteList(_.pickBy(this.pagination, (value) => value));
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
        });
    },
    onCancelEditHandler() {
      this.showEditDialog = false;
    },
    onCancelDeleteHandler() {
      this.showDeleteDialog = false;
    },
    onBackHome() {
      this.$router.push("/pet-site");
    },
    onCancelAddHandler() {
      this.showAddPetDialog = false;
    },
    redirectAdd() {
      (this.addPet = {}), (this.showAddPetDialog = true);
    },

    handleEdit(_, row) {
      this.selectedPet = row;
      this.showEditDialog = true;
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
        this.getOwnerSiteList(_.pickBy(val, value => value));
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPetSiteList(_.pickBy(vm.pagination, value => value));
      vm.getOwnerSiteList();
    });
  }
};
</script>
