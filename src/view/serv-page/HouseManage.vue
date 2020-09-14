<template>
  <div>
    <Table
      size="small"
      stripe
      :columns="columns"
      :data="rowData"
    />
    <!--
      <template slot="status" slot-scope="{ row }">
        <Tag v-if="row.status=='audit_pass'" color="green">{{ row.status | h_status }}</Tag>
        <Tag v-if="row.status=='audit_pending'" color="blue">{{ row.status | h_status }}</Tag>
        <Tag v-if="row.status=='audit_reject'" color="red">{{ row.status | h_status }}</Tag>
      </template>

      <template slot="rentStatus" slot-scope="{ row }">
        <Tag v-if="row.rentStatus=='rented'" color="green">{{ row.rentStatus | h_rentStatus }}</Tag>
        <Tag v-if="row.rentStatus=='rent_pending'" color="red">{{ row.rentStatus | h_rentStatus }}</Tag>
      </template>

      <template slot="operation" slot-scope="{ row }">
        <span v-if="row.status=='audit_pass' || row.status=='audit_reject'" @click="modalShow(row)">详情</span>
        <span v-if="row.status=='audit_pending'" @click="modalShow(row)">审核</span>
      </template>
      -->
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
import HouseModal from './components/HouseModal.vue'
import { getHouseList } from '@/api/house'
import { statusObj, rentStatusObj } from '@/config/house_config'
import Dict from '@/filters/Dict'
// import paramsVue from '../argu-page/params.vue'
// import paramsVue from '../argu-page/params.vue'
export default {
  components: {
    HouseModal
  },
  filters: {
    cnStatus: Dict.h_status,
    cnRentStatus: Dict.h_rentStatus
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
                {this.$options.filters.cnStatus(status)}
              </Tag>
            )
          }
        },
        {
          title: '出租状态',
          key: 'rentStatus',
          render: (h, params) => {
            const rentStatus = params.row.rentStatus
            let color = 'default'
            if (rentStatus === 'rented') {
              color = 'green'
            } else if (rentStatus === 'rent_pending') {
              color = 'red'
            }
            return (
              <Tag color={color}>
                {this.$options.filters.cnRentStatus(rentStatus)}
              </Tag>
            )
          }
        },
        {
          title: '操作',
          key: 'operation',
          className: 'operation_col',
          render: (h, params) => {
            let text = '详情'
            if (params.row.status === 'audit_pending') {
              text = '审核'
            }
            return (
              <span onClick={() => this.modalShow(params.row)}>
                {text}
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
        this.listQuery.total = 0 || data.total
        this.rowData = data.list
      })
    },
    changeStatus(row, key) {
      row.cellClassName = { ...row.cellClassName, ...statusObj[key].cellClassName }
      row.operation = statusObj[key].operation
      return statusObj[key].status
    },
    changeRentStatus(row, key) {
      row.cellClassName = { ...row.cellClassName, ...rentStatusObj[key].cellClassName }
      return rentStatusObj[key].rentStatus
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
