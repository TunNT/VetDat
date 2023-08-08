<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
      center
      top="25vh"
    >
      <!-- Custom main content Msg or Select input-->
      <span v-if="!!msgNotify">{{ msgNotify }}</span>
      <template v-else>
        <span>{{ contentLabel }}</span>
        <el-select v-model="role" placeholder="Chọn quyền">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </template>

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="onCancelHandler">{{
          cancelText
        }}</el-button>
        <el-button
          size="small"
          :type="submitType"
          @click="onSubmitHandler(role)"
          >{{ submitText }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    dialogVisible: Boolean,
    onCancelHandler: Function,
    onSubmitHandler: Function,
    submitType: {
      type: String,
      default: "danger",
    },
    submitText: {
      type: String,
      default: "Xoá",
    },
    cancelText: {
      type: String,
      default: "Huỷ",
    },
    msgNotify: {
      type: String,
      default: null,
    },
    contentLabel: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    defaultRole: {
      type: [Number, String],
      default: 1,
    },
  },
  data() {
    return {
      role: 1
    };
  },
  watch: {
    defaultRole(val) {
      this.role = +val;
    }
  },
  methods: {
    handleClose(done) {
      // handle previoues close
      this.onCancelHandler();
    },
  },
};
</script>
