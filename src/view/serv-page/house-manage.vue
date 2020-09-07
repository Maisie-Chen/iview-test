<template>
  <div>
    <Table
      size="small"
      stripe
      :columns="columns"
      :data="rowData"
    >
      <template slot="status" slot-scope="{ row }">
        <Tag v-if="row.status=='audit_pass'" color="green">{{ row.status }}</Tag>
        <Tag v-if="row.status=='audit_pending'" color="blue">{{ row.status }}</Tag>
      </template>
      <template slot="rentStatus" slot-scope="{ row }">
        <Tag v-if="row.rentStatus=='rented'" color="green">{{ row.rentStatus }}</Tag>
        <Tag v-if="row.rentStatus=='rent_pending'" color="red">{{ row.rentStatus }}</Tag>
      </template>rentStatus
      <template slot="operation" slot-scope="{ row }">
        <span v-if="row.status=='audit_pass'" @click="modalShow(row)">详情</span>
        <span v-if="row.status=='audit_pending'" @click="modalShow(row)">审核</span>
      </template>
    </Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="listQuery.total" :current.sync="listQuery.pageNum" @on-change="changePage" />
      </div>
    </div>
    <div class="xxx">
      <modal-dialog :id="selectRowId" :type="modalType" :show="isOperationShow" @modalStatusChange="modalStatusChange" />
    </div>

  </div>
</template>
<script>
import modalDialog from './components/modals_for_house/modalDialog.vue'
import { getHouseList } from '@/api/house'
import { statusObj, rentStatusObj } from '@/config/house_config'
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
          slot: 'status'
          // render: (h, params) => h('span', this.changeStatus(params.row, params.row.status))
        },
        {
          title: '出租状态',
          key: 'rentStatus',
          slot: 'rentStatus'
          // render: (h, params) => h('span', this.changeRentStatus(params.row, params.row.rentStatus))
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
  mounted() {
    this.houseList()
  },
  methods: {
    houseList() {
      getHouseList(this.listQuery).then(res => {
        const { data } = res.data
        this.listQuery.total = data.total
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
  @import './house-manage.less';
</style>
