<template>

    <v-card>
        <v-card-title>{{
                this.isNewEmployee ? 'Добавить нового сотрудника' : 'Редактировать сотрудника'
            }}
        </v-card-title>

        <v-card-text>
            <v-row cols="12">
                <v-col lg="4" md="4" sm="6" xs="12">
                    <v-text-field
                        label="Фамилия"
                        placeholder="Введите Фамилию" outlined
                        v-model.trim="secondName"
                        counter="50"
                        :error="$v.secondName.$invalid && $v.secondName.$error"
                        @input="$v.secondName.$touch()"
                    ></v-text-field>
                </v-col>
                <v-col lg="4" md="4" sm="6" xs="12">
                    <v-text-field
                        label="Имя"
                        placeholder="Введите Имя"
                        outlined
                        v-model.trim="firstName"
                        counter="50"
                        :error="$v.firstName.$invalid && $v.firstName.$error"
                        @input="$v.firstName.$touch()"
                    ></v-text-field>
                </v-col>
                <v-col lg="4" md="4" sm="6" xs="12">
                    <v-text-field
                        label="Отчество"
                        placeholder="Введите Отчество"
                        outlined
                        v-model.trim="patronymic"
                        counter="50"
                        :error="$v.patronymic.$invalid && $v.patronymic.$error"
                        @input="$v.patronymic.$touch()"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-card>
                <v-card-title></v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="subjects"
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

                                <TangibleForm
                                    :edited-item="editedItem"
                                    :show-tangible-form="dialog"
                                    @close="close"
                                    @save="save"
                                />
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
                <h3 style="text-align: right"> Всего: {{ sumOfPrices }} </h3>
            </v-card>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="red darken-1"
                text
                @click="cancelTheForm"
            >
                Отмена
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="saveAndCloseForm"
            >
                Сохранить
            </v-btn>
        </v-card-actions>

        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="2000"
        >
            {{ snackbar.text }}
        </v-snackbar>
    </v-card>

</template>

<script>
import {required, maxLength} from 'vuelidate/lib/validators'
import TangibleForm from "@/components/TangibleForm";

export default {
    name: "EmployeeForm",
    props: {
        isNewEmployee: Boolean,
    },
    components: {
        TangibleForm,
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        snackbar: {
            show: false,
            color: '',
            text: '',
        },
        headers: [
            {
                text: 'Название',
                align: 'start',
                value: 'subject'
            },
            {text: 'Стоимость', value: 'price'},
            {text: 'Действия', value: 'actions', sortable: false}
        ],
        employee: {},
        editedIndex: -1,

        firstName: '',
        secondName: '',
        patronymic: '',
        subjects: [],
        sumOfPrices: 0,

        editedItem: {
            subject: '',
            price: '',
        },
        defaultItem: {
            subject: '',
            price: '',
        },
    }),

    validations: {
        firstName: {maxLength: maxLength(50), required},
        secondName: {maxLength: maxLength(50), required},
        patronymic: {maxLength: maxLength(50), required},
    },

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'Добавить' : 'Редактировать'
        },
        getSumPriceTangibles() {
            if (this.subjects !== []) {
                let sum = 0
                this.subjects.forEach(item => {
                    sum += Number(item.price)
                })
                return sum
            }
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
        subjects() {
            this.sumOfPrices = this.getSumPriceTangibles
        }
    },

    async mounted() {
        if (this.isNewEmployee) {
            this.employee = {}
            this.subjects = []
        } else {
            let path = location.pathname.split('/')
            const id = path[path.length - 1]
            await this.$store.dispatch('fetchEmployee', id)
            this.employee = await this.$store.getters.employee


            this.firstName = this.employee.firstName
            this.secondName = this.employee.secondName
            this.patronymic = this.employee.patronymic
            this.subjects = this.employee.subjects
        }
    },

    methods: {
        cancelTheForm() {
            if (this.isNewEmployee) {
                this.firstName = ''
                this.secondName = ''
                this.patronymic = ''
                this.subjects = []
                this.$v.$reset()
                this.$emit('answerForm', {save: false, showForm: false})
            } else {
                this.$router.push('/')
            }
        },
        async saveAndCloseForm() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                console.log('Не пройдёшь')
            } else {
                if (this.isNewEmployee) {
                    await this.$store.dispatch('createNewEmployee', {
                        firstName: this.firstName,
                        secondName: this.secondName,
                        patronymic: this.patronymic,
                        subjects: this.subjects
                    })

                    if (!this.isEmployeeExist()) {
                        this.$emit('answerForm', {save: true, showForm: false})
                        this.nullifyData()
                        this.$v.$reset()
                    }


                } else {
                    await this.$store.dispatch('updateEmployee', {
                        employeeId: this.employee.id,
                        firstName: this.firstName,
                        secondName: this.secondName,
                        patronymic: this.patronymic,
                        subjects: this.subjects
                    })
                    if (!this.isEmployeeExist()) {
                        await this.$router.push('/')
                    }

                }
            }

        },
        isEmployeeExist() {
            if ((this.$store.getters.error !== null) && (this.$store.getters.error.status === 409)) {
                this.snackbar = {
                    show: true,
                    color: 'error',
                    text: this.$store.getters.error.data
                }
                this.$store.commit('clearError')
                return true
            } else {
                return false
            }
        },

        nullifyData() {
            this.firstName = ''
            this.secondName = ''
            this.patronymic = ''
            this.subjects = []
        },

        editItem(item) {
            this.editedIndex = this.subjects.indexOf(item)
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

        save(item) {
            if (this.editedIndex > -1) {
                Object.assign(this.subjects[this.editedIndex], item)
            } else {
                this.subjects.push(item)
            }
            this.close()
        },
    },
}
</script>

<style scoped>

</style>
