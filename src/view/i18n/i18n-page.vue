<template>
  <div>
    <Row :gutter="10">
      <i-col span="6">
        <Card>
          <div class="i18n-card-box">
            <DatePicker
              type="date"
              placeholder="Select date"
            />
            <TimePicker
              type="timerange"
              placement="bottom-end"
              placeholder="Select time"
              style="display: block;margin-top: 10px;"
            />
            <Button
              type="primary"
              style="margin-top: 10px;"
              @click="modalVisible = true"
            >
              {{ $t('buttonText') }}
            </Button>
            <Modal
              v-model="modalVisible"
              :title="$t('modalTitle')"
            >
              <p>{{ content }}</p>
              <p>{{ content }}</p>
              <p>{{ content }}</p>
            </Modal>
            <i class="tip">{{ $t('i18n-tip') }}</i>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'I18nPage',
  data() {
    return {
      modalVisible: false
    }
  },
  computed: {
    content() {
      return this.$t('content')
    }
  }
}
</script>

<style lang="less">
.i18n-card-box{
  height: 200px;
  .tip{
    color: gray;
    display: block;
    margin-top: 20px;
  }
}
</style>
