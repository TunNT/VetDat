<template>
  <div>
    <el-dialog
      :title="`Thêm 1 thú cưng`"
      :visible="dialogVisible"
      :before-close="handleClose"
      center
      top="10vh"
      width="60%"
    >
      <el-form
        ref="updateForm"
        :model="itemSync"
        :rules="rules"
        label-width="160px"
        label-position="left"
        size="small"
      >
        <b-row class="mb-3">
          <b-col cols="6">
            <el-form-item label="File:" prop="file">
              <el-input v-model="itemSync.file"></el-input>
              <template>
                <el-row class="m-auto">
                  <input
                    type="file"
                    ref="fileInput"
                    @change="handleFileChange"
                  />
                </el-row>
                <img
                  class="file-image"
                  v-if="itemSync.selectedFile"
                  :src="itemSync.selectedFileURL"
                  style="max-width: 100%"
                />
                <el-button
                  size="small"
                  v-if="itemSync.selectedFile"
                  @click="cancelFileSelection"
                  >Hủy chọn</el-button
                >
              </template>
            </el-form-item>
          
          </b-col>
          <b-col cols="6" class="layout-input">
            <el-form-item label="Mã định danh pet:" prop="id">
              <el-input
                class="group-name"
                placeholder="Vui lòng nhập mã định danh pet"
                v-model="itemSync.id"
              >
              </el-input>
            </el-form-item>

            <el-form-item label="Chủ sở hữu:">
              <template>
                <el-select v-model="itemSync.ownerId" placeholder="Chủ sở hữu:">
                  <el-option
                    v-for="item in listOwner"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item label="Trạng thái:">
              <template>
                <el-select v-model="itemSync.status" placeholder="Trạng thái:">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item label="Loại thú cưng:">
              <template>
                <el-select
                  v-model="itemSync.petType"
                  placeholder="Loại thú cưng:"
                >
                  <el-option
                    v-for="item in optionsPetType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item label="Giới tính vật nuôi:">
              <template>
                <el-select v-model="itemSync.petSex" placeholder="Giới tính:">
                  <el-option
                    v-for="item in optionsPetSex"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item label="Triệt sản:">
              <template>
                <el-select v-model="itemSync.petTriet" placeholder="Triệt sản:">
                  <el-option
                    v-for="item in optionsPetTriet"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-form-item>

            <el-form-item label="Thời gian sinh:" prop="petDob">
              <el-date-picker
                v-model="itemSync.petDob"
                arrow-control
                placeholder="Pick time"
              >
              </el-date-picker>
            </el-form-item>
          </b-col>
        </b-row>

        <el-form-item label="Giống vật nuôi:" prop="petBreed">
          <el-input
            class="group-name"
            placeholder="Vui lòng nhập giống vật nuôi"
            v-model="itemSync.petBreed"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Màu sắc vật nuôi:" prop="petColor">
          <el-input
            class="group-name"
            placeholder="Vui lòng nhập màu sắc vật nuôi"
            v-model="itemSync.petColor"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Tên thú nuôi:" prop="petName">
          <el-input
            class="group-name"
            placeholder="Vui lòng nhập tên thú nuôi"
            v-model="itemSync.petName"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Thêm mô tả:" prop="notes">
          <el-input
            class="group-name"
            placeholder="Vui lòng thêm mô tả"
            v-model="itemSync.notes"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-cancel-group" @click="onCancelHandler"
          >Hủy</el-button
        >
        <el-button class="btn-add-group" @click="onPreviousSubmit"
          >Tạo pet</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<style>
.layout-input {
  border-left: 1px solid !important;
}
.btn-cancel-group {
  background-color: #f5f5f5;
  color: #003049;
  border: none;
  width: 104px;
  height: 40px;
  font-size: 13px;
  font-weight: 700;
}
.btn-add-group {
  background-color: #b3c0d1 !important;
  color: #003049;
  border: none;
  width: 104px;
  height: 40px;
  font-size: 13px;
  font-weight: 700;
}
.el-dialog__title {
  color: #003049 !important;
  font-weight: 700 !important;
}

.group-name input {
  width: 100% !important;
}

.el-form-item__label {
  font-weight: 700;
  color: #003049 !important;
}

.bnt-color-cancel {
  background-color: #fafafa;
  color: #003049 !important;
  font-weight: 600;
  height: 40px;
  width: 80px;
}

.bnt-color-cancel:hover {
  background-color: #fafafa;
  color: #000;
  font-weight: 600;
}

.bnt-color-create {
  background-color: #333;
  color: #003049 !important;
  font-weight: 600;
  height: 40px;
  width: 80px;
}

.bnt-color-create:hover {
  background-color: #333;
  color: #000;
  font-weight: 600;
}

.form-dialog {
  border-radius: 15px;
}
.btn-cancel {
  background-color: #e9e9e9;
}
.el-dialog {
  border-radius: 10px !important;
}
</style>
<script>
export default {
  props: {
    dialogVisible: Boolean,
    onCancelHandler: Function,
    onSubmitHandler: Function,
    itemSelected: {
      type: Object,
      default: {}
    },
    msgNotify: {
      type: String,
      default: null
    },
    contentLabel: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    optionsPetTriet: {
      type: Array,
      default: () => []
    },
    optionsPetType: {
      type: Array,
      default: () => []
    },
    optionsPetSex: {
      type: Array,
      default: () => []
    },
    listOwner: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      itemSync: {
        id: "",
        status: 0,
        petType: 0,
        petBreed: "",
        petSex: 0,
        petTriet: "",
        petColor: "",
        petName: "",
        petDob: "",
        notes: "",
        ownerId: 0,
        file: "",
        selectedFile: null,
        selectedFileURL: "",
        fileBase64: '',
      },
      rules: {
        id: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petType: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petBreed: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petSex: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petTriet: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petColor: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petName: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        petDob: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        notes: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ],
        ownerId: [
          {
            required: true,
            message: "Vui lòng không được để trống!",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    itemSelected: {
      handler(val) {
        this.itemSync = {
          ...val
        };
      },
      deep: true
    }
  },
  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.itemSync.file = file.name;
        this.itemSync.selectedFile = file;
        this.itemSync.selectedFileURL = URL.createObjectURL(file);
        this.reduceQualityAndConvertToBase64(file);
      }
    },
    reduceQualityAndConvertToBase64(file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const reducedFile = new File([blob], file.name, { type: file.type });
            const reader = new FileReader();
            reader.onloadend = () => {
              this.itemSync.fileBase64 = reader.result;
            };
            reader.readAsDataURL(reducedFile);
          }, file.type, 0.7); // Điều chỉnh chất lượng ở đây (0.7 là 70% chất lượng)
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    cancelFileSelection() {
      this.$set(this.itemSync, 'file', '');
      this.itemSync.selectedFile = null;
      this.itemSync.selectedFileURL = '';
      // Reset the file input value if needed
      this.$refs.fileInput.value = '';
        },
    handleClose(done) {
      // handle previous close
      this.onCancelHandler();
    },
    onPreviousSubmit() {
      this.$refs.updateForm.validate(valid => {
        if (valid) this.onSubmitHandler(this.itemSync);
      });
    }
  }
};
</script>
