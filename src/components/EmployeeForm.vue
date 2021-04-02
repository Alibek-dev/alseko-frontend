<template>

    <v-card>
        <v-card-title>Добавить сотрудника</v-card-title>

        <v-card-text>

            <v-col lg="6" md="8" sm="12" xs="12" class="ma-0 pa-0">
                <v-text-field label="Фамилия" placeholder="Введите Фамилию" outlined></v-text-field>
            </v-col>
            <v-col lg="6" md="8" sm="12" xs="12" class="ma-0 pa-0">
                <v-text-field label="Имя" placeholder="Введите Имя" outlined></v-text-field>
            </v-col>
            <v-col lg="6" md="8" sm="12" xs="12" class="ma-0 pa-0">
                <v-text-field label="Отчество" placeholder="Введите Отчество" outlined></v-text-field>
            </v-col>


            <v-card>
                <v-card-title></v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="employee.subjects"
                    sort-by="calories"
                    class="elevation-1"
                >
                    <template v-slot:top>
                        <v-toolbar
                            flat
                        >
                            <v-toolbar-title>Список выданных материальных ценностей</v-toolbar-title>
                            <v-divider
                                class="mx-4"
                                inset
                                vertical
                            ></v-divider>
                            <v-spacer></v-spacer>
                            <v-dialog
                                v-model="dialog"
                                max-width="500px"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        color="primary"
                                        dark
                                        class="mb-2"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        Добавить
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.name"
                                                        label="Dessert name"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.calories"
                                                        label="Calories"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.fat"
                                                        label="Fat (g)"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.carbs"
                                                        label="Carbs (g)"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col
                                                    cols="12"
                                                    sm="6"
                                                    md="4"
                                                >
                                                    <v-text-field
                                                        v-model="editedItem.protein"
                                                        label="Protein (g)"
                                                    ></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="close"
                                        >
                                            Отмена
                                        </v-btn>
                                        <v-btn
                                            color="blue darken-1"
                                            text
                                            @click="save"
                                        >
                                            Сохранить
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                            <v-dialog v-model="dialogDelete" max-width="500px">
                                <v-card>
                                    <v-card-title class="headline">Вы уверены, что хотите удалить эту материальную
                                        ценность?
                                    </v-card-title>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue darken-1" text @click="closeDelete">Нет</v-btn>
                                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">Да</v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <template v-slot:no-data>
                        Пока пусто
                    </template>
                </v-data-table>
            </v-card>

            <!--            <v-card>
                            <v-card-title>Добавить/редактировать материальную ценность</v-card-title>
                            <v-row>
                                <v-col lg="8" md="8" sm="12" xs="12">
                                    <v-text-field label="Название" placeholder="Название материальной ценности"
                                                  outlined></v-text-field>
                                </v-col>
                                <v-col lg="4" md="4" sm="12" xs="12">
                                    <v-text-field label="Стоимость" placeholder="Стоимость материальной ценности"
                                                  outlined></v-text-field>
                                </v-col>
                            </v-row>

                        </v-card>-->


        </v-card-text>

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
</template>

<script>
export default {
    name: "EmployeeForm",
    props: {
        newEmployee: {
            type: Boolean,
            default: true
        },
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Название',
                align: 'start',
                value: 'subject'
            },
            {text: 'Стоимость', value: 'price'},
            {text: 'Действия', value: 'actions', sortable: false}
        ],
        employee: {
            subjects: Array,
        },
        editedIndex: -1,
        editedItem: {
            subject: '',
            price: 0,
        },
        defaultItem: {
            subject: '',
            price: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Добавить' : 'Редактировать'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },

    async mounted() {
        if (this.newEmployee) {
            this.employee = {}
        } else {
            let path = location.pathname.split('/')
            const id = path[path.length - 1]
            await this.$store.dispatch('fetchEmployee', id)
            this.employee = await this.$store.getters.employee
            console.log(this.employee)
        }
    },

    methods: {
        editItem(item) {
            this.editedIndex = this.employee.subjects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            this.editedIndex = this.subjects.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm() {
            this.subjects.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close() {
            this.dialog = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        closeDelete() {
            this.dialogDelete = false
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            })
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.subjects[this.editedIndex], this.editedItem)
            } else {
                this.subjects.push(this.editedItem)
            }
            this.close()
        },
    },
}
</script>

<style scoped>

</style>
