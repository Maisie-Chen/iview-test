<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize: `${fontSize}px`}">
      <BreadcrumbItem v-for="item in list" :key="`bread-crumb-${item.name}`" :to="item.to">
        {{ showTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import { showTitle } from '@/utils/util'
import './custom-bread-crumb.less'
export default {
  name: 'CustomBreadCrumb',
  components: {
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    showTitle(item) {
      return showTitle(item, this)
    },
    isCustomIcon(iconName) {
      return iconName.indexOf('_') === 0
    },
    getCustomIconName(iconName) {
      return iconName.slice(1)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.demo-breadcrumb-separator{
      display: none
}
</style>>
