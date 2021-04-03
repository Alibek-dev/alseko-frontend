import axios from 'axios'
const URL = process.env.DOMEN ?? 'http://localhost:3000/'

export default  {
    actions: {
        async fetchEmployee(ctx, employeeId) {
            try {
                let res = await axios.get (URL + `api/employee/${employeeId}`)
                ctx.commit('setEmployee', res.data)
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        },
        async deleteEmployee(ctx, employeeId) {
            try {
                let res = await axios.delete(URL + `api/employee/${employeeId}`)
                ctx.commit('setEmployee', {})
            } catch (e) {
                ctx.commit('setError', e)
                throw e
            }
        }
    },

    mutations: {
        setEmployee(state, employee) {
            state.employee = employee
        },
    },

    state: {
        employee: {},
    },

    getters: {
        employee: s => s.employee
    }
}

