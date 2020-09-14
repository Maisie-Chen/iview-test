<template>
  <div>
    <Table
      size="small"
      stripe
      :columns="columns"
      :data="rowData"
    >
      <!--
      <template slot="status" slot-scope="{ row }">
        <Tag v-if="row.status=='audit_pass'" color="green">{{ row.status | c_status }}</Tag>
        <Tag v-if="row.status=='audit_pending'" color="blue">{{ row.status | c_status }}</Tag>
        <Tag v-if="row.status=='not_audit'" color="default">{{ row.status | c_status }}</Tag>
        <Tag v-if="row.status=='audit_reject'" color="red">{{ row.status | c_status }}</Tag>
      </template>
      -->

      <!--
      <template slot="operation" slot-scope="{ row }">
        <span v-if="row.status=='audit_pass' || row.status=='audit_reject'" @click="modalShow(row)">详情</span>
        <span v-if="row.status=='audit_pending'" @click="modalShow(row)">审核</span>
      </template>
      -->
    </Table>
    <!--页码-->
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="listQuery.total" :current.sync="listQuery.pageNum" @on-change="changePage" />
      </div>
    </div>
    <!--弹框-->
    <customer-modal :id="selectRowId" :type="modalType" :show="isOperationShow" @modalStatusChange="modalStatusChange" />

  </div>
</template>
<script>
import CustomerModal from './components/CustomerModal.vue'
import { getCustomerList } from '@/api/customer'
import Dict from '@/filters/Dict'
export default {
  components: {
    CustomerModal
  },
  filters: {
    cnStatus: Dict.c_status
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
          render: (h, params) => {
            const status = params.row.status
            let color = 'default'
            if (status === 'audit_pass') {
              color = 'green'
            } else if (status === 'audit_pending') {
              color = 'blue'
            } else if (status === 'audit_reject') {
              color = 'red'
            }
            return (
              <Tag color={color}>
                {this.$options.filters.cnStatus(params.row.status)}
              </Tag>
            )
          }
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
          className: 'operation_col',
          render: (h, params) => {
            const status = params.row.status
            if (status === 'not_audit') {
              return
            }
            let text = '详情'
            if (status === 'audit_pending') {
              text = '审核'
            }
            return (
              <span onClick={() => this.modalShow(params.row)}>{text}</span>
            )
          }
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
        this.listQuery.total = 0 || data.total
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
  .ivu-table {
    td.operation_col{
        color: blue;
        &:hover{
            cursor: pointer;
        }
    }
    .audit_pass_cell span{
        display: inline-block;
        border-radius: .3rem;
        padding: .05rem .15rem;
        border: 1px solid green;
        color:green;

    }
    .not_audit_cell span{
        display: inline-block;
        border-radius: .3rem;
        padding: .05rem .15rem;
        border: 1px solid gray;
        color: gray;

    }
    .audit_pending_cell span{
        display: inline-block;
        border-radius: .3rem;
        padding: .05rem .15rem;
        border: 1px solid blue;
        color: blue;
    }

}
</style>
