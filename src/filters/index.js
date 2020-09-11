import Dict from './dict'

const filters = { ...Dict }

export default (vm) => {
  Object.keys(filters).forEach(key => {
    vm.filter(key, filters[key])
  })
}
