<template>
  <Card>
    <Button @click="customerList">
      请求数据TEST
    </Button>
    <Table 
      size="small"
      stripe
      :columns="columns"
      :data="data0"
    >
      <template 
        slot="operation"
        slot-scope="{ index }" 
      >
        <Button 
          v-if="data0[index].operation"
          type="primary" 
          size="small" 
          style="margin-right: 5px"
          @click="data0[index].modalShow = true"
        >
          {{ data0[index].operation }}
        </Button>
        <Modal 
          v-model="data0[index].modalShow" 
        >
          <p slot="header">
            <Icon type="ios-information-circle"></Icon>
            <span>审核/查看详情</span>
          </p>
          <div class="modal-content">
            <p class="modal-c-item">
              状态: {{ data0[index].status }}
            </p>
            <p class="modal-c-item">
              姓名: {{ data0[index].name }}
            </p>
            <p class="modal-c-item">
              手机号: {{ data0[index].phone }}
            </p>
            <p class="modal-c-item">
              性别: xxx
            </p>
            <p class="modal-c-item">
              年龄: xxx
            </p>
            <p class="modal-c-item">
              身份证号: xxx
            </p>
          </div>
          <div 
            slot="footer"
            class="modal-footer"   
          >
            <Button 
              v-if="data0[index].status != '已实名'"
              type="primary" 
            >
              审核
            </Button>
            <Button type="error">
              拒绝
            </Button>
          </div>
        </Modal>
      </template>
    </Table>
  </Card>
</template>
<script>
  import axios from 'axios'
  import { getCustomerList } from '@/api/customer'
  export default {
    data () {
      return {
        listQuery: {
          pageSize: 10,
          pageNum: 1
        },
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'right'
          },
          {
            title: '名称',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '当前状态',
            key: 'status',
            render: (h, params) => h('span', {
              style: {
                backgroundColor: 'green',
                color: '#fff',
                textAlign: 'center',
                textDecoration: 'underline',
                padding: '.5rem'
              }
            }, params.row.status)
            
          },
          {
            title: '角色',
            key: 'job'
          },
          {
            title: '最后登录时间',
            key: 'lastLoginTime'
          },
          {
            title: '居住地址',
            key: 'address'
          },
          {
            title: '操作',
            slot: 'operation',
            key: 'operation'
          }
       ],
       data0: [
          {
            name: '张三',
            phone: 18861824384,
            status: '待实名',
            job: '无',
            lastLoginTime: '2020-04-05',
            address: '江苏省苏州市吴中区沿江小区3栋2-701',
            operation: '',
            modalShow: false
          },
          {
            name: '李四',
            phone: 18861824385,
            status: '待审核',
            job: '无',
            lastLoginTime: '',
            address: '',
            operation: '审核',
            modalShow: false
          },
          {
            name: '乔峰',
            phone: 18861824386,
            status: '已实名',
            job: '业主、租户',
            lastLoginTime: '',
            address: '',
            operation: '详情',
            modalShow: false
          },
          {
            name: '展昭',
            phone: 18861824387,
            status: '审核拒绝',
            job: '',
            lastLoginTime: '',
            address: '',
            operation: '审核',
            modalShow: false
          }
        ]
      }
    },
    methods: {
      customerList(){
        // getCustomerList(this.listQuery).then(res => {
          // console.log(res)
        // })

      }

    }
  }
</script>
<style lang="less">
  @import './user-manage.less';
</style>
