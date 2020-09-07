export const statusObj = {
  audit_pass: {
    status: '审核通过',
    operation: '详情',
    cellClassName: {
      status: 'audit_pass_cell'
    }
  },
  audit_pending: {
    status: '待审核',
    operation: '审核',
    cellClassName: {
      status: 'audit_pending_cell'
    }
  }
}

export const rentStatusObj = {
  rented: {
    rentStatus: '已出租',
    cellClassName: {
      rentStatus: 'rented_cell'
    }
  },
  rent_pending: {
    rentStatus: '未出租',
    cellClassName: {
      rentStatus: 'rent_pending'
    }
  }
}
