<template>
  <div>
    <Table
      size="small"
      stripe
      :columns="columns"
      :data="rowData"
    >
      <template slot="status" slot-scope="{ row }">
        <Tag v-if="row.status=='audit_pass'" color="green">{{ row.status | c_status }}</Tag>
        <Tag v-if="row.status=='audit_pending'" color="blue">{{ row.status | c_status }}</Tag>
        <Tag v-if="row.status=='not_audit'" color="default">{{ row.status | c_status }}</Tag>
        <Tag v-if="row.status=='audit_reject'" color="red">{{ row.status | c_status }}</Tag>
      </template>
      <template slot="operation" slot-scope="{ row }">
        <span v-if="row.status=='audit_pass' || row.status=='audit_reject'" @click="modalShow(row)">详情</span>
        <span v-if="row.status=='audit_pending'" @click="modalShow(row)">审核</span>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="listQuery.total" :current.sync="listQuery.pageNum" @on-change="changePage" />
      </div>
    </div>
    <modal-dialog :id="selectRowId" :type="modalType" :show="isOperationShow" @modalStatusChange="modalStatusChange" />

  </div>
</template>
<script>
import modalDialog from './components/modals_for_customer/modalDialog.vue'
import { getCustomerList } from '@/api/customer'
export default {
  components: {
    modalDialog
  },
  data() {
    return {
      modalType: null,
      selectRowId: null,
      isOperationShow: false,
      rowData: [],
      modalData: {},
      listQuery: {
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      columns: [
        {
          title: '名称',
          key: 'username'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '当前状态',
          key: 'status',
          slot: 'status'
        },
        {
          title: '角色',
          key: 'roles',
          render: (h, params) => h('span', params.row.roles[0])
        },
        {
          title: '最后登录时间',
          key: 'lastLoginAt'
        },
        {
          title: '居住地址',
          key: 'identificationAddress'
        },
        {
          title: '操作',
          key: 'operation',
          slot: 'operation',
          className: 'operation_col'
        }
      ]
    }
  },
  created() {
    this.customerList()
  },
  methods: {
    customerList() {
      getCustomerList(this.listQuery).then(res => {
        const { data } = res.data
        this.listQuery.total = data.total
        this.rowData = data.list
      })
    },
    modalShow(row) {
      this.isOperationShow = true
      this.modalData = row
      this.selectRowId = row.id
      this.modalType = row.status
    },
    changePage() {
      this.customerList()
    },
    modalStatusChange(show) {
      this.isOperationShow = show
    }
  }
}
</script>
<style lang="less" scope>
  @import './customer-manage.less';
</style>
