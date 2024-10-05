<template>
  <div>
    <template class="main">
      <div class="main-container">
        <b-row class="m-auto form-create">
          <h3 class="title-content-pet">
            Thông tin của thú cưng có mã định danh: {{ petSite.id }}
          </h3>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <img :src="petSite.avatar" alt="#" style="width: 100%" />
          </b-col>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <ul class="field-list">
              <li class="field-item">
                <span class="field-label">Trạng thái:</span>
                <span class="field-value">
                  {{
                    petSite.status === 0
                      ? "chưa kích hoạt"
                      : petSite.status === 1
                      ? "kích hoạt"
                      : petSite.status === 2
                      ? "Thử nghiệm"
                      : petSite.status === 3
                      ? "Trì hoãn"
                      : "Hết hạn"
                  }}</span
                >
              </li>
              <li class="field-item">
                <span class="field-label">Loại thú cưng:</span>
                <span class="field-value">{{
                  petSite.petType === 0
                    ? "Không xác định"
                    : petSite.petType === 1
                    ? "Chó"
                    : petSite.petType === 2
                    ? "Mèo"
                    : "Thỏ"
                }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Giống vật nuôi:</span>
                <span class="field-value">{{ petSite.petBreed }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Giới tính:</span>
                <span class="field-value">{{
                  petSite.petSex === 0
                    ? "Không xác định"
                    : petSite.petSex === 1
                    ? "Đực"
                    : "Cái"
                }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Triệt sản:</span>
                <span class="field-value">{{
                  petSite.petTriet === 0
                    ? "Không xác định"
                    : petSite.petTriet === 1
                    ? "Có"
                    : "Chưa"
                }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Màu sắc vật nuôi:</span>
                <span class="field-value">{{ petSite.petColor }}</span>
              </li>
              <!-- Repeat the above <li> structure for the remaining fields -->
              <li class="field-item">
                <span class="field-label">Tên thú nuôi:</span>
                <span class="field-value">{{ petSite.petName }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Thời điểm sinh:</span>
                <span class="field-value">{{
                  petSite.petDob | FormatDay
                }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Ghi chú:</span>
                <span class="field-value">{{ petSite.notes }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Cập nhật mới nhất:</span>
                <span class="field-value">{{ petSite.statusDate }}</span>
              </li>
            </ul>
          </b-col>
          <b-col cols="12" md="4" lg="4" class="mt-5 text-center">
            <ul class="field-list">
              <li class="field-item">
                <span class="field-label-title">Thuộc chủ sở hữu</span>
              </li>
              <li class="field-item">
                <span class="field-label">Trạng thái::</span>
                <span class="field-value">{{
                  ownerPet.status === 0
                    ? "not activated "
                    : ownerPet.status === 1
                    ? "Ok"
                    : ownerPet.status === 2
                    ? "demo"
                    : ownerPet.status === 3
                    ? "suspend"
                    : "expired"
                }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Tên:</span>
                <span class="field-value">{{ ownerPet.name }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Địa chỉ:</span>
                <span class="field-value">{{ ownerPet.address }}</span>
              </li>
              `
              <li class="field-item">
                <span class="field-label">Số điện thoại:</span>
                <span class="field-value">{{ ownerPet.phone }}</span>
              </li>
              <li class="field-item">
                <span class="field-label">Mô tả:</span>
                <span class="field-value">{{ ownerPet.name }}</span>
              </li>
            </ul>
          </b-col>
          <b-col cols="12">
            <div class="text-center mt-5">
              <el-button class="btn-cancel" @click="onBackHome"
                >Quay lại</el-button
              >
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
export default {
  layout: "private",
  middleware: "authenticatedSite",
  middleware: "permissionSite",
  middleware: "isValidTokenSite",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      petSite: "pet-site/petSite",
      ownerPet: "pet-site/ownerPet"
    }),
    isPetsEmpty() {
      return this.pets.length === 0;
    }
  },
  methods: {
    ...mapActions({
      listPetDetail: "pet-site/PET_SITE_DETAIL"
    }),
    onBackHome() {
      this.$router.push("/pet-site");
    }
  },
  created() {
    const { id } = this.$route.params;
    this.listPetDetail(id);
  }
};
</script>
