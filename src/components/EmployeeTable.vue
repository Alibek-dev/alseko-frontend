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
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
        ></v-data-table>
    </v-card>
</template>

<script>
export default {
    name: "Table",
    data: () => ({
        search: '',
        headers: [
            {text: 'ФИО', align: 'start', value: 'fullname'},
            {text: 'Кол-во', align: 'start', value: 'count'},
            {text: 'Общая стоимость', align: 'start', value: 'sum'},

        ]
    })
}
</script>

<style scoped>

</style>
