export const houseStatus = {
  audit_pass: {
    status: '审核通过',
    operation: '详情',
    cellClassName: {
      status: 'audit_pass_cell'
    },
    color: 'green'
  },
  audit_pending: {
    status: '待审核',
    operation: '审核',
    cellClassName: {
      status: 'audit_pending_cell'
    },
    color: 'blue'
  },
  audit_reject: {
    status: '审核拒绝',
    operation: '详情',
    cellClassName: {
      status: 'audit_reject_cell'
    },
    color: 'red'
  }
}

export const houseRentStatus = {
  rented: {
    rentStatus: '已出租',
    cellClassName: {
      rentStatus: 'rented_cell'
    },
    color: 'green'
  },
  rent_pending: {
    rentStatus: '未出租',
    cellClassName: {
      rentStatus: 'rent_pending'
    },
    color: 'red'
  }
}

export const customerStatus = {
  audit_pass: {
    status: '已实名',
    operation: '详情',
    cellClassName: {
      status: 'audit_pass_cell'
    },
    color: 'green'
  },
  audit_pending: {
    status: '待审核',
    operation: '审核',
    cellClassName: {
      status: 'audit_pending_cell'
    },
    color: 'blue'
  },
  not_audit: {
    status: '未实名',
    operation: '',
    cellClassName: {
      status: 'not_audit_cell'
    },
    color: 'default'
  },
  audit_reject: {
    status: '审核拒绝',
    operation: '详情',
    cellClassName: {
      status: 'audit_reject_cell'
    },
    color: 'red'
  }
}

export const houseDetail = {
  elevator: {
    true: '有',
    false: '无'
  },
  direction: {
    east: '朝东',
    west: '朝西',
    north: '朝北',
    south: '朝南'
  }
}

