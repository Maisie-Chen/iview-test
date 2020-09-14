export const statusObj = {
  audit_pass: {
    status: '已实名',
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
  },
  not_audit: {
    status: '未实名',
    operation: '',
    cellClassName: {
      status: 'not_audit_cell'
    }
  }
}
