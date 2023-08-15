<template>
  <div>
    <template>
      <b-container class="header-title-pet">
        <span>Tìm kiếm thú cưng</span>
        <SearchInput :placeholder="'Nhập để tìm kiếm'" :clearable="true" class="search-pet"
          @onChangeHandler="onChangeHandler" />
      </b-container>
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
            <img :src=pets.avatar alt="#" style="width: 100%">
          </b-col>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <ul class="field-list container-detail">
              <li class="field-item">
                <span class="field-label-title">Thú cưng</span>
              </li>
              <li class="field-item">
                <span class="field-label">Trạng thái:</span>
                <span class="field-value">
                  {{
                    pets.status === 0
                    ? "chưa kích hoạt"
                    : pets.status === 1
                      ? "kích hoạt"
                      : pets.status === 2
                        ? "Thử nghiệm"
                        : pets.status === 3
                          ? "Đình chỉ"
                          : "Hết hạn"
                  }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Loại thú cưng:</span>
                <span class="field-value">{{ pets.petType === 0
                  ? "Không xác định"
                  : pets.petType === 1
                    ? "Chó"
                    : pets.petType === 3
                      ? "Mèo"
                      : "Thỏ" }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Giống vật nuôi:</span>
                <span class="field-value">{{ pets.petBreed }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Giới tính:</span>
                <span class="field-value">{{ pets.petSex === 0
                  ? "Không xác định"
                  : pets.petSex === 1
                    ? "Đực"
                    : "Cái" }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Triệt sản:</span>
                <span class="field-value">{{ pets.petTriet === 0
                  ? "Không xác định"
                  : pets.petTriet === 1
                    ? "Có"
                    : "Chưa" }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Màu sắc vật nuôi:</span>
                <span class="field-value">{{ pets.petColor }}</span>
              </li>
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
            <ul class="field-list container-detail">
              <li class="field-item">
                <span class="field-label-title">Site</span>
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
                <span class="field-label">Số điện thoại:</span>
                <span class="field-value">{{ pets.site.phone }}</span>
              </li>
            </ul>
          </b-col>
        </b-row>
      </div>
    </template>
  </div>
</template>
<style>
.container-detail {
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  padding: 20px !important;
  background-color: #fff;
  height: 100%;
}

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
import SearchInput from "@components/SearchInput";
export default {
  components: {
    SearchInput,
  },
  data() {
    return {
      search: "",
      pagination: {
        keyword: ""
      },
    };
  },
  computed: {
    ...mapGetters({
      loading: "pet/loading",
      pets: "pet/petSearch"
    }),
    isPetsEmpty() {
      return this.pets.length === 0;
    }
  },
  methods: {
    ...mapActions({
      getPetSearchList: "pet/PET_SEARCH_GLOBAL"
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
  },
  watch: {
    pagination: {
      handler(val) {
        this.getPetSearchList(_.pickBy(val, value => value));
      },
      deep: true
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getPetSearchList(_.pickBy(vm.pagination, value => value));
    });
  }
};
</script>
  