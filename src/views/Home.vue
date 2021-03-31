<template>
    <div style="padding: 0 20% 0 20%">
        <h1>Список сотрудников</h1>
        <EmployeeTable/>
    </div>
</template>

<script>
import EmployeeTable from "@/components/EmployeeTable";
export default {
    name: 'Home',
    components: {
        EmployeeTable,
    }
}
</script>
