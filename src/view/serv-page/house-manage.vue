<template>
  <Card>
    <Table 
      size="small"
      stripe
      :columns="columns"
      :data="data0"
    >
    </Table>
  </Card>
</template>
<script>
  export default {
    data () {
      return {
        statusStyle: {
          backgroundColor: 'green',
          color: '#fff',
          textAlign: 'center',
          textDecoration: 'underline',
          padding: '.5rem'
          
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'right'
          },
          {
            title: '房屋地址',
            key: 'address'
          },
          {
            title: '业主',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'phone',         
          },
          {
            title: '审核状态',
            key: 'status',
            render: (h, params) => h('span', {
              style: this.statusStyle },
              params.row.status) 
          },
          {
            title: '出租状态',
            key: 'rentStatus',
            render: (h, params) => h('span', {
              style: this.statusStyle },
              params.row.rentStatus) 
          },
          {
            title: '设备状态',
            key: 'deviceStatus',
            render: (h, params) => h('span', {
              style: this.statusStyle },
              params.row.deviceStatus) 
          },
       ],
       data0: [
          {
            address: '江苏省苏州市吴中区沿江小区3栋2-701',
            name: '张三',
            phone: 18861824384,
            status: '待审核',
            rentStatus: '待租',
            deviceStatus: '待租',
          },
          {
            address: '江苏省苏州市吴中区沿江小区3栋2-701',
            name: '李四',
            phone: 18861824385,
            status: '已审核',
            rentStatus: '合租',
            deviceStatus: '待租',
          },
          {
            address: '江苏省苏州市吴中区沿江小区3栋2-701',
            name: '乔峰',
            phone: 18861824386,
            status: '已审核',
            rentStatus: '整租',
            deviceStatus: '待租',
          },
          {
            address: '江苏省苏州市吴中区沿江小区3栋2-701',
            name: '展昭',
            phone: 18861824387,
            status: '已审核',
            rentStatus: '整租',
            deviceStatus: '待租',
          },
        ]
      }
    }
  }
</script>
<style lang="less">
 
</style>
