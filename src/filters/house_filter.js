const STATUS_OBJ = {
  audit_pass: {
    status: '审核通过'
  },
  audit_pending: {
    status: '待审核'
  },
  audit_reject: {
    status: '审核拒绝'
  }
}

const RENT_STATUS_OBJ = {
  rented: {
    rentStatus: '已出租'
  },
  rent_pending: {
    rentStatus: '未出租'
  }
}

const HAS_ELEVATOR = {
  true: '有',
  false: '无'
}

const DIRECTION = {
  east: '朝东',
  west: '朝西',
  north: '朝北',
  south: '朝南'
}

export default {
  STATUS_OBJ,
  RENT_STATUS_OBJ,
  HAS_ELEVATOR,
  DIRECTION
}

