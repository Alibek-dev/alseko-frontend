import Vue from 'vue'
import Vuex from 'vuex'
import Employees from './modules/Employees'
import EmployeeTangibles from "@/store/modules/EmployeeTangibles";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        error: null
    },

    mutations: {
        setError(state, error) {
            state.error = error
        },
        clearError(state) {
            state.error = null
        }
    },

    getters: {
        error: s => s.error
    },

    modules: {
        Employees,
        EmployeeTangibles
    }
})
