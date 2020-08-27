<template>
  <div>
    <Card>
      <p slot="title">
        通讯录
      </p>
      <i-table
        border
        :columns="columns1"
        :data="data1"
      ></i-table>
    </Card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          title: '姓名',
          key: 'name',
          render: (h, params) => h('div', {
            on: {
              click: () => { this.test(params.row.name, event); },
            },
          }, params.row.name),
        },
        {
          title: '年龄',
          key: 'age',
        },
        {
          title: '地址',
          key: 'address',
        },
      ],
      data1: [
        {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居',
        },
        {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗',
        },
        {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道',
        },
        {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道',
          cellClassName: {
            name: 'demo-table-info-cell-name',
          },
        },
      ],
    };
  },
  methods: {
    test: (res, event) => {
      const el = event.currentTarget;
      if (el.style.backgroundColor !== 'gray') {
        el.style.backgroundColor = 'gray';
      } else {
        el.style.backgroundColor = 'transparent';
      }
    },
  },
};
</script>

<style>
  .ivu-table .demo-table-info-cell-name {
    background-color: #2db7f5;
    color: #fff;
  }

</style>
