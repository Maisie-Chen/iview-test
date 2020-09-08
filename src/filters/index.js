import Dict from './dict'

const filters = {
  c_status: Dict.c_status,
  h_status: Dict.h_status,
  h_rentStatus: Dict.h_rentStatus,
  h_hasElevator: Dict.h_hasElevator,
  h_direction: Dict.h_direction
}

export default (vm) => {
  Object.keys(filters).forEach(key => {
    vm.filter(key, filters[key])
  })
}
