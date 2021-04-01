<template>
    <v-dialog
        v-model="showForm"
        persistent
        max-width="500"
    >
        <v-card>
            <v-card-title>Добавить сотрудника</v-card-title>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="$emit('answerForm', {save: false, showForm: false})"
                >
                    Отмена
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="$emit('answerForm', {save: true, showForm: false})"
                >
                    Сохранить
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "EmployeeForm",
    props: {
        showForm: Boolean
    }
}
</script>

<style scoped>

</style>
