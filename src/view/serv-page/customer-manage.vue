<template>
  <div>
    <Table
      size="small"
      stripe
      :columns="columns"
      :data="rowData"
    />
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
import CustomerModal from './components/customer-modal.vue'
import { getCustomerList } from '@/api/customer'
import { customerStatus } from '@/libs/field.js'
import Dict from '@/filters/dict'
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
            const content = customerStatus[status].status
            const color = customerStatus[status].color || 'default'
            return (
              <Tag color={color}>
                {content}
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
            const opText = customerStatus[status].operation || ''
            if (!opText.length) {
              return
            }
            return (
              <span onClick={() => this.modalShow(params.row)}>{opText}</span>
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
        this.listQuery.total = data.total || 0
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
