<template>
    <div style="padding: 0 20% 0 20%">
        <h1>Сотрудник</h1>
        <v-btn
            @click="$router.push('/')"
        >
            <v-icon left>
                mdi-arrow-left-bold
            </v-icon>
            Назад
        </v-btn>
        <EmployeeForm
            :new-employee="false"
        />
    </div>
</template>

<script>
import EmployeeForm from "@/components/EmployeeForm";
export default {
    name: "EmployeeTangibles",
    components: {
        EmployeeForm
    },
}
</script>

<style scoped>

</style>
