import axios from 'axios'
const URL = process.env.URL ?? 'http://localhost:3000/'

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
        async createNewEmployee(ctx, employee) {
            try {
                let res = await axios.post(URL + 'api/employee', employee)

                if (res.status === 200) {
                    employee['id'] = res.data.id
                    res = await axios.post(URL + 'api/employee/tangibles', employee)
                } else {
                    console.log('Что-то пошло не так')
                }
            } catch (e) {
                ctx.commit('setError', e.response)
            }
        },
        async updateEmployee(ctx, employee) {
            try {
                let res = await axios.put(URL + 'api/employee', employee)
                if (res.status === 200) {
                    employee['id'] = res.data.id
                    res = await axios.post(URL + 'api/employee/tangibles', employee)
                } else {
                    console.log('Что-то пошло не так')
                }
            } catch (e) {
                ctx.commit('setError', e.response)
            }
        }
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

