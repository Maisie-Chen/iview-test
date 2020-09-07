<template>
  <Modal
    :value="show"
    class-name="vertical-center-modal"
    @on-visible-change="getFaultModalStatusChange"
  >
    <div slot="header" class="modal-header">
      <span v-if="type==='audit_pass'">详情</span>
      <span v-if="type==='audit_pending'">审核</span>
    </div>
    <div class="modal-content">
      <div class="modal-c-item">
        姓名: {{ formData.houseHolder.holderName }}
      </div>
      <div class="modal-c-item">
        手机号:
      </div>
      <div class="modal-c-item">
        房屋地址: {{ formData.address }}
      </div>
      <div class="modal-c-item">
        身份证号: {{ formData.houseHolder.holderIdCardNumber }}
      </div>
      <div class="modal-c-item">
        房屋面积: {{ formData.houseLayout.area }}
      </div>
      <div class="modal-c-item">
        房屋朝向: {{ formData.houseLayout.direction }}
      </div>
      <div class="modal-c-item">
        楼层: {{ formData.houseLayout.floor }}
      </div>
      <div class="modal-c-item">
        电梯: {{ formData.houseLayout.hasElevator }}
      </div>
      <div class="modal-c-item">
        房间: {{ formData.houseLayout.roomCount }}
      </div>
      <div class="modal-c-item">
        厕所: {{ formData.houseLayout.toiletCount }}
      </div>
      <div class="modal-c-img">
        <img class="modal-img" :src="formData.housePropertyCertificateImageUrl" alt="housePropertyCertificateImageUrl">
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
import { isUndef, isEmpty } from '@/libs/shared'
import { getHouseDetail } from '@/api/house'
import { getImg } from '@/api/authimg'
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
      formData: {
        houseLayout: {},
        houseHolder: {}
      },
      modalStyle: {
        height: '50rem',
        overflow: 'auto'
      }
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
        this.getHouseDetail(id)
      }
    },
    getHouseDetail(id) {
      getHouseDetail(id).then((res) => {
        const data = res.data
        this.formData = data.data === null ? {} : data.data
        this.getAuthImg()
      })
    },
    getFaultModalStatusChange(show) {
      this.$emit('modalStatusChange', show)
    },
    async getAuthImg() {
      this.formData.housePropertyCertificateImageUrl
      if (isEmpty(this.formData.housePropertyCertificateImageUrl)) {
        this.loading = false
        return
      }
      await getImg(this.formData.housePropertyCertificateImageUrl).then((blod) => {
        const url = URL.createObjectURL(blod)
        console.log(url)
        this.formData.housePropertyCertificateImageUrl = url
      })
    }
  }
}
</script>
<style lang='less' scoped>
  @import './modalDialog.less';
</style>
