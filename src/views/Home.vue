<template>
    <div style="padding: 0 20% 0 20%">
        <h1>Список сотрудников</h1>
        <EmployeeTable
            :employees="employees"
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
    }),

    async mounted() {
        await this.$store.dispatch('fetchEmployees')
        this.employees = this.$store.getters.employees
        console.log(this.employees)
    }
}
</script>
