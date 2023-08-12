<template>
  <div>
    <template>
      <div class="header-title-pet">
        <span>Tìm kiếm thú cưng</span>
        <SearchInput :placeholder="'Nhập để tìm kiếm'" :clearable="true" class="search-pet"
          @onChangeHandler="onChangeHandler" />
      </div>
    </template>
    <template class="main">
      <b-container class="main-container-empty" v-if="pagination.keyword == '' || isPetsEmpty">
        <h3 class="title">
          Thông tin của thú cưng
        </h3>
      </b-container>
      <div v-else-if="pagination.keyword" class="main-container">
        <b-row class="m-auto form-create">
          <h3 class="title-content-pet">
            Thông tin của thú cưng có mã định danh: {{ pets.id }}
          </h3>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <ul class="field-list">
              <li class="field-item">
                <span class="field-label-title">Thú cưng</span>
              </li>
              <li class="field-item">
                <span class="field-label">Trạng thái:</span>
                <span class="field-value">{{ pets.status }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Loại thú cưng:</span>
                <span class="field-value">{{ pets.petType }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Giống vật nuôi:</span>
                <span class="field-value">{{ pets.petBreed }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Giới tính:</span>
                <span class="field-value">{{ pets.petSex }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Triệt sản:</span>
                <span class="field-value">{{ pets.petTriet }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Màu sắc vật nuôi:</span>
                <span class="field-value">{{ pets.petColor }}</span>
              </li>
              <!-- Repeat the above <li> structure for the remaining fields -->
              <li class="field-item">
                <span class="field-label">Tên thú nuôi:</span>
                <span class="field-value">{{ pets.petName }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Ghi chú:</span>
                <span class="field-value">{{ pets.notes }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Thời điểm sinh:</span>
                <span class="field-value">{{ pets.petDob | FormatDay }}</span>
              </li>
            </ul>
          </b-col>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <ul class="field-list">
              <li class="field-item">
                <span class="field-label-title">Chủ sở hữu</span>
              </li>
              <li class="field-item">
                <span class="field-label">Trạng thái::</span>
                <span class="field-value">{{
                  pets.owner.status === 0
                  ? "not activated "
                  : pets.owner.status === 1
                    ? "Ok"
                    : pets.owner.status === 2
                      ? "demo"
                      : pets.owner.status === 3
                        ? "suspend"
                        : "expired"
                }}</span>
              </li>
              <!-- Repeat the above <li> structure for the remaining fields -->
              <li class="field-item">
                <span class="field-label">Tên:</span>
                <span class="field-value">{{ pets.owner.name }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Địa chỉ:</span>
                <span class="field-value">{{ pets.owner.address }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Số điện thoại:</span>
                <span class="field-value">{{ pets.owner.phone }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Địa chỉ:</span>
                <span class="field-value">{{ pets.owner.notes }}</span>
              </li>
            </ul>
          </b-col>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <ul class="field-list">
              <li class="field-item">
                <span class="field-label-title">Site</span>
              </li>
              <li class="field-item">
                <span class="field-label">Trạng thái::</span>
                <span class="field-value">{{
                  pets.site.status === 0
                  ? "not activated "
                  : pets.site.status === 1
                    ? "Ok"
                    : pets.site.status === 2
                      ? "demo"
                      : pets.site.status === 3
                        ? "suspend"
                        : "expired"
                }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Tên đăng nhập:</span>
                <span class="field-value">{{ pets.site.login }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Tên:</span>
                <span class="field-value">{{ pets.site.name }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Địa chỉ:</span>
                <span class="field-value">{{ pets.site.address }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Liên hệ:</span>
                <span class="field-value">{{ pets.site.contact }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Số điện thoại:</span>
                <span class="field-value">{{ pets.site.phone }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Địa chỉ:</span>
                <span class="field-value">{{ pets.site.notes }}</span>
              </li>
            </ul>
          </b-col>
          <b-col cols="12">
            <div class="text-center mt-5">
              <el-button class="btn-cancel" @click="onBackHome">Hủy</el-button>
              <el-button class="btn-create" @click="handleEdit(pets)">Sửa</el-button>
              <el-button class="btn-delete" @click="handleDelete(pets)">Xóa</el-button>
            </div>
          </b-col>
        </b-row>
      </div>
    </template>

    <YesNoDialog :dialogVisible="showDeleteDialog" :onCancelHandler="onCancelDeleteHandler"
      :onSubmitHandler="onSubmitDeleteHandler" :msgNotify="'bạn có muốn xóa thú cưng này?'" :title="'Xác nhận'" />
    <updatePet :dialogVisible="showEditDialog" :onCancelHandler="onCancelEditHandler"
      :onSubmitHandler="onSubmitEditHandler" :itemSelected="selectedPet" :options="statuses"
      :optionsPetTriet="optionsPetTriet" :optionsPetType="optionsPetType" :optionsPetSex="optionsPetSex"
      :listOwner=owners.data :listSite="sites.data" />
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
import updatePet from "@/components/pet/edit";
// component
import SearchInput from "@components/SearchInput";
export default {
  layout: "private",
  middleware: "authenticated",
  middleware: "permission",
  components: {
    SearchInput,
    updatePet
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
      pets: "pet/pets",
      owners: "owner/owners",
      sites: "site/sites"
    }),
    isPetsEmpty() {
      return this.pets.length === 0;
    }
  },
  methods: {
    ...mapActions({
      getPetList: "pet/PET_LIST",
      updatePet: "pet/PET_UPDATE",
      deletePet: "pet/PET_DELETE",
      getOwnerList: "owner/OWNER_LIST",
      getSiteList: "site/SITE_LIST",
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
      this.updatePet(value)
        .then((result) => {
          if (result.message === "common_success") {
            this.getPetList(_.pickBy(this.pagination, (value) => value));
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
      this.$router.push("/pet");
    },
    onSubmitDeleteHandler() {
      this.deletePet(this.selectedPet.id)
        .then((result) => {
          if (result.message === "common_success") {
            this.getPetList(_.pickBy(this.pagination, value => value));
            this.$notify({
              group: "all",
              title: "Xóa thành công",
              type: "success"
            });
            this.pagination.keyword = '';
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

    handleEdit(row) {
      this.selectedPet = row;
      this.showEditDialog = true;
    },
    handleDelete(row) {
      this.selectedPet = row;
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
        this.getPetList(_.pickBy(val, value => value));
        this.getOwnerList();
        this.getSiteList();
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPetList(_.pickBy(vm.pagination, value => value));
      vm.getOwnerList();
      vm.getSiteList();
    });
  }
};
</script>
