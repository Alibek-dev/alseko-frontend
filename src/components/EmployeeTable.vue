<template>
    <v-card>
        <v-card-title>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Поиск"
                single-line
                hide-details
            ></v-text-field>
            <v-btn class="ml-10">Добавить</v-btn>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="employees"
            :search="search"
        ></v-data-table>
    </v-card>
</template>

<script>
export default {
    name: "Table",
    props: {
        employees: []
    },
    data: () => ({
        search: '',
        headers: [
            {text: 'ФИО', align: 'start', value: 'fullName'},
            {text: 'Кол-во', align: 'start', value: 'countOfSubjects'},
            {text: 'Общая стоимость', align: 'start', value: 'sumOfTangiblesValue'},

        ]
    })
}
</script>

<style scoped>

</style>
