<template>
    <div>
        <el-dialog :title="`Sửa chủ sở hữu ${itemSync.name}`" :visible="dialogVisible" :before-close="handleClose" center
            top="10vh" width="60%">
            <el-form ref="updateForm" :model="itemSync" :rules="rules" label-width="160px" label-position="left"
                size="small">
                <el-form-item label="Trạng thái:">
                    <template>
                        <el-select v-model="itemSync.status" placeholder="Trạng thái:">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <el-form-item label="Tên chủ sở hữu:" prop="name">
                    <el-input class="group-name" placeholder="Vui lòng nhập tên chủ sở hữu" v-model="itemSync.name">
                    </el-input>
                </el-form-item>

                <el-form-item label="Địa chỉ:" prop="address">
                    <el-input class="group-name" placeholder="Vui lòng nhập dịa chỉ" v-model="itemSync.address">
                    </el-input>
                </el-form-item>


                <el-form-item label="Số điện thoại:" prop="phone">
                    <el-input class="group-name" placeholder="Vui lòng nhập số điện thoại" v-model="itemSync.phone">
                    </el-input>
                </el-form-item>

                <el-form-item label="Thêm mô tả:" prop="notes">
                    <el-input class="group-name" placeholder="Vui lòng thêm mô tả" v-model="itemSync.notes">
                    </el-input>
                </el-form-item>

                <!-- <el-form-item label="Chọn site:">
                    <template>
                        <el-select v-model="itemSync.siteId" placeholder="Trạng thái:">
                            <el-option v-for="item in optionSites" :key="item.id" :label="item.login" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item> -->

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-cancel-group" @click="onCancelHandler">Hủy</el-button>
                <el-button class="btn-add-group" @click="onPreviousSubmit">Xác nhận sửa</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style>
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
    width: auto !important;
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
        optionSites: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            datePickerOptionsEndDate: {
                disabledDate: this.disabledEndDate
            },
            itemSync: {
                status: 0,
                name: "",
                address: "",
                phone: "",
                notes: "",
                // siteId:""
            },
            rules: {
                status: [
                    {
                        required: true,
                        message: "Vui lòng không được để trống!",
                        trigger: "blur"
                    }
                ],
                name: [
                    {
                        required: true,
                        message: "Vui lòng không được để trống!",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "Vui lòng không được để trống!",
                        trigger: "blur"
                    }
                ],
                phone: [
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
        disabledEndDate(date) {
            const beforeDate = new Date();
            return this.itemSync.petDob == ""
                ? date >= beforeDate.setDate(beforeDate.getDate())
                : (date = this.itemSync.petDob);
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
  