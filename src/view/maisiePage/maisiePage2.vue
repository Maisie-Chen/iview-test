<template>
  <Card title="通讯录">
    <Table
      border
      :columns="columns12"
      :data="data6"
    >
      <template
        slot="name"
        slot-scope="{ row }"
      >
        <strong>{{ row.name }}</strong>
      </template>
      <template
        slot="action"
        slot-scope="{ row, index }"
      >
        <Button
          type="primary"
          size="small"
          style="margin-right: 5px"
          @click="show(index)"
        >
          View
        </Button>
        <Button
          type="error"
          size="small"
          @click="remove(index)"
        >
          Delete
        </Button>
      </template>
    </Table>
  </Card>
</template>
<script>
export default {
  data() {
    return {
      columns12: [
        {
          title: 'Name',
          slot: 'name',
        },
        {
          title: 'Age',
          key: 'age',
        },
        {
          title: 'Address',
          key: 'address',
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center',
        },
      ],
      data6: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
        },
      ],
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: 'User Info',
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`,
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    },
  },
};
</script>
