<template>
  <Modal
    :value="show"
    @on-visible-change="getFaultModalStatusChange"
  >
    <div slot="header" class="modal-header">
      <span v-if="type==='audit_pass'">详情</span>
      <span v-if="type==='audit_pending'">审核</span>
    </div>
    <div class="modal-content">
      <div class="modal-c-item">
        姓名: {{ formData.name }}
      </div>
      <div class="modal-c-item">
        手机号: {{ formData.mobile }}
      </div>
      <div class="modal-c-item">
        性别: {{ formData.gender }}
      </div>
      <div class="modal-c-item">
        年龄: {{ formData.age }}
      </div>
      <div class="modal-c-item">
        身份证号: {{ formData.identificationNo }}
      </div>
      <Divider size="small">审核意见</Divider>
      <Form ref="formValidate" :label-width="100">
        <FormItem label="审核意见：" prop="desc">
          <div class="modal-c-input">
            <Input class="input-item" maxlength="200" show-word-limit type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..." />
          </div>
        </FormItem>
      </Form>
    </div>
    <div
      slot="footer"
      class="modal-footer"
    >
      <div v-if="type==='audit_pending'">
        <Button
          type="primary"
        >
          通过审核
        </Button>
        <Button type="error">
          拒绝
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import { isUndef } from '@/libs/shared'
import { getCustomerDetail } from '@/api/customer'
export default {
  name: 'ModalDialog',
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: []
    }
  },
  watch: {
    id(id) {
      this.updateDetail(id)
    }
  },
  mounted() {
    this.updateDetail(this.id)
  },
  methods: {
    updateDetail(id) {
      if (!isUndef(id)) {
        this.getCustomerDetail(id)
      }
    },
    getCustomerDetail(id) {
      getCustomerDetail(id).then((res) => {
        const data = res.data
        this.formData = data.data === null ? {} : data.data
      })
    },
    getFaultModalStatusChange(show) {
      this.$emit('modalStatusChange', show)
    }
  }
}
</script>
<style lang='less' scoped>
  .modal-header{
    text-align: center;
    font-size: 1rem;
}

.modal-content{
    .modal-c-item{
        margin-left: 5rem;
        height: 3rem;
        line-height: 3rem;
    }
}

.modal-footer{
    text-align: center;
    Button{
        margin: 0 2rem;
        width: 8rem;
    }
}
</style>
