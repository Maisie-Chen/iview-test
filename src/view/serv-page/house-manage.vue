<template>
  <div>
    <Table
      size="small"
      stripe
      :columns="columns"
      :data="rowData"
    />
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="listQuery.total" :current.sync="listQuery.pageNum" @on-change="changePage" />
      </div>
    </div>
    <div class="xxx">
      <house-modal :id="selectRowId" :type="modalType" :show="isOperationShow" @modalStatusChange="modalStatusChange" />
    </div>

  </div>
</template>
<script>
import HouseModal from './components/house-modal.vue'
import { getHouseList } from '@/api/house'
import { houseStatus, houseRentStatus } from '@/libs/field.js'
export default {
  components: {
    HouseModal
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
          title: '房屋地址',
          key: 'address'
        },
        {
          title: '业主',
          key: 'houseHolderName'
        },
        {
          title: '手机号',
          key: 'mobile'
        },
        {
          title: '审核状态',
          key: 'status',
          render: (h, params) => {
            const status = params.row.status
            const content = houseStatus[status].status
            const color = houseStatus[status].color || 'default'
            return (
              <Tag color={color}>
                {content}
              </Tag>
            )
          }
        },
        {
          title: '出租状态',
          key: 'rentStatus',
          render: (h, params) => {
            const rentStatus = params.row.rentStatus
            const content = houseRentStatus[rentStatus].rentStatus
            const color = houseRentStatus[rentStatus].color
            return (
              <Tag color={color}>
                {content}
              </Tag>
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          className: 'operation_col',
          render: (h, params) => {
            const status = params.row.status
            const opText = houseStatus[status].operation
            return (
              <span onClick={() => this.modalShow(params.row)}>
                {opText}
              </span>
            )
          }
        }
      ]
    }
  },
  mounted() {
    this.houseList()
  },
  methods: {
    houseList() {
      getHouseList(this.listQuery).then(res => {
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
      this.houseList()
    },
    modalStatusChange(show) {
      this.isOperationShow = show
    }
  }
}
</script>
<style lang="less">
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
    .audit_pending_cell span{
        display: inline-block;
        border-radius: .3rem;
        padding: .05rem .15rem;
        border: 1px solid blue;
        color: blue;
    }

    .rented_cell span{
        display: inline-block;
        border-radius: .3rem;
        padding: .05rem .15rem;
        border: 1px solid blue;
        color: blue;
    }
    .rent_pending span{
        display: inline-block;
        border-radius: .3rem;
        padding: .05rem .15rem;
        border: 1px solid red;
        color: red;
    }
}

</style>
