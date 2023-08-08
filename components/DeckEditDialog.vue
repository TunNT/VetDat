<template>
  <div>
    <el-dialog
      :title="`Chỉnh sửa bộ bài ${itemSync.name}`"
      :visible="dialogVisible"
      :before-close="handleClose"
      center
      top="5vh"
    >
      <el-form :model="itemSync" label-width="160px" label-position="left" size="small">
        <el-form-item label="Tên lá bài" required>
          <el-input placeholder="Nhập tên lá bài" v-model="itemSync.name">
          </el-input>
        </el-form-item>

        <el-form-item label="Người tạo">
          <el-input disabled :value="itemSync.author | ByUnkown"> </el-input>
        </el-form-item>
        <el-form-item label="Nguồn">
          <el-input
            placeholder="Nhập nguồn"
            v-model="itemSync.source"
          ></el-input>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 10 }"
            placeholder="Nhập mô tả"
            v-model="itemSync.description"
          ></el-input>
        </el-form-item>
        <el-form-item label="Thời gian tạo">
          <el-date-picker
            :value="itemSync.createdAt"
            style="width: 100%"
            type="datetime"
            disabled
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Thời gian cập nhật">
          <el-date-picker
            :value="itemSync.updatedAt"
            style="width: 100%"
            type="datetime"
            disabled
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancelHandler">Huỷ</el-button>
        <el-button size="small" type="primary" @click="onSubmitHandler(itemSync)"
          >Cập nhật</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

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
  },
  data() {
    return {
      itemSync: {}
    };
  },
  watch: {
    itemSelected: {
      handler(val) {
        this.itemSync = {
          ...val,
          source: val.source?.toString()
        };
      },
      deep: true
    },
  },
  methods: {
    handleClose(done) {
      // handle previous close
      this.onCancelHandler();
    },
  },
};
</script>
