import Vue from 'vue'
import Vuex from 'vuex'
import Employees from './modules/Employees'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Employees
  }
})
