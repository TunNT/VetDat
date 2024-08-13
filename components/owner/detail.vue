<template>
    <div>
        <el-dialog :title="`Chi tiết của chủ sở hữu ${itemSync.name}`" :visible="dialogVisible" :before-close="handleClose" center
            top="10vh" width="60%">
            <b-row class="m-auto form-create">
                    <b-col cols="2"></b-col>
                    <b-col cols="12" md="5" lg="5" class="mt-5 text-center">
                        <ul class="field-list">
                            <li class="field-item">
                                <span class="field-label">Trạng thái::</span>
                                <span class="field-value">{{
                                    itemSync.status === 0
                                    ? "not activated "
                                    : itemSync.status === 1
                                        ? "Ok"
                                        : itemSync.status === 2
                                            ? "demo"
                                            : itemSync.status === 3
                                                ? "suspend"
                                                : "expired"
                                }}</span>
                            </li>
                            <!-- Repeat the above <li> structure for the remaining fields -->
                            <li class="field-item">
                                <span class="field-label">Tên:</span>
                                <span class="field-value">{{ itemSync.name }}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Địa chỉ:</span>
                                <span class="field-value">{{ itemSync.address }}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Số điện thoại:</span>
                                <span class="field-value">{{ itemSync.phone }}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Mô tả:</span>
                                <span class="field-value">{{ itemSync.notes }}</span>
                            </li>
                        </ul>
                    </b-col>
                    <b-col cols="12" md="5" lg="5" class="mt-5 text-center">
                        <ul class="field-list">
                            <li class="field-item">
                                <span class="field-label">Ngày tạo:</span>
                                <span class="field-value">{{ itemSync.createdAt | FormatDate}}</span>
                            </li>
                            <li class="field-item">
                                <span class="field-label">Cập nhật lại vào ngày:</span>
                                <span class="field-value">{{ itemSync.statusDate | FormatDate}}</span>
                            </li>
                        </ul>
                    </b-col>
                </b-row>
            <span slot="footer" class="dialog-footer">
                <el-button class="btn-cancel-group" @click="onCancelHandler">Hủy</el-button>
                <el-button class="btn-add-group" @click="onSubmitHandler(itemSync)">Sửa chủ sở hữu</el-button>
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
    },
    data() {
        return {
            itemSync: {
                status: 0,
                name: "",
                address: "",
                phone: "",
                notes: "",
                // siteId:""
            },
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
        handleClose(done) {
            // handle previous close
            this.onCancelHandler();
        },
    }
};
</script>
  