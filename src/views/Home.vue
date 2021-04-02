<template>
    <div style="padding: 0 20% 0 20%">
        <h1>Список сотрудников</h1>
        <EmployeeTable
            :employees="employees"
            :loading="loading"
            :headers="headers"
        />
    </div>
</template>

<script>
import EmployeeTable from "@/components/EmployeeTable";

export default {
    name: 'Home',
    components: {
        EmployeeTable,
    },
    data: () => ({
        employees: [],
        loading: false,

        headers: [
            {text: 'ФИО', align: 'start', value: 'fullName'},
            {text: 'Кол-во', align: 'start', value: 'countOfSubjects'},
            {text: 'Общая стоимость', align: 'start', value: 'sumOfTangiblesValue'},
        ]
    }),

    async mounted() {
        this.loading = true
        await this.$store.dispatch('fetchEmployees')
        this.employees = this.$store.getters.employees
        this.loading = false
    }
}
</script>
