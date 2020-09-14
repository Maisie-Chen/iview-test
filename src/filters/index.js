import Dict from './Dict'

const filters = { ...Dict }

export default (vm) => {
  Object.keys(filters).forEach(key => {
    vm.filter(key, filters[key])
  })
}
