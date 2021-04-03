import axios from 'axios'
const URL = process.env.DOMEN ?? 'http://localhost:3000/'

export default  {
    actions: {
        async fetchEmployees(ctx) {
            try {
                let res = await axios.get (URL + 'api/employees')
                ctx.commit('setEmployees', res.data)
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
    },

    mutations: {
        setEmployees(state, employees) {
            state.employees = employees
        },
    },

    state: {
        employees: [],
    },

    getters: {
        employees: s => s.employees
    }
}

