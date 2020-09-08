import customer from './customer_filter'
import house from './house_filter'

const c_status = val => {
  return customer.STATUS_OBJ[val].status
}

const h_status = val => {
  return house.STATUS_OBJ[val].status
}

const h_rentStatus = val => {
  return house.RENT_STATUS_OBJ[val].rentStatus
}

const h_hasElevator = val => {
  return house.HAS_ELEVATOR[val]
}

const h_direction = val => {
  return house.DIRECTION[val]
}

export default {
  c_status,
  h_status,
  h_rentStatus,
  h_hasElevator,
  h_direction
}
