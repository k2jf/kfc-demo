import Transfer from './components/Transfer'

module.exports.default = module.exports = {
  Transfer,
  install: function (Vue) {
    Vue.component('Transfer', Transfer)
  }
}
