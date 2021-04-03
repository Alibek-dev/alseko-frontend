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
            <v-btn @click="showForm = !showForm" class="ml-10">Добавить</v-btn>
        </v-card-title>
        <v-data-table
            @click:row="rowClick"
            @contextmenu:row="rowContextMenu"
            @dblclick:row="rowDbClick"
            item-key="id"
            single-select
            :headers="headers"
            :items="employees"
            :search="search"
            :loading="loading"
        >

        </v-data-table>

        <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
            <v-list>
                <v-btn @click="dialog = !dialog" depressed>
                    <v-icon>mdi-delete</v-icon>
                    Удалить
                </v-btn>
            </v-list>
        </v-menu>

        <Dialog
            question='Вы дейстительно хотите удалить данного сотрудника?'
            :text="itemContextMenu.fullName"
            :dialog="dialog"
            @answer="onAnswerDialog"
        />

        <v-dialog
            v-model="showForm"
            persistent
            max-width="800"
        >
            <EmployeeForm
                @answerForm="onAnswerForm"
                :isNewEmployee="true"
            />
        </v-dialog>


    </v-card>
</template>

<script>
import Dialog from './Dialog'
import EmployeeForm from "./EmployeeForm";

export default {
    name: "Table",
    props: {
        employees: Array,
        loading: Boolean,
        headers: Array,
    },
    components: {
        Dialog,
        EmployeeForm,
    },
    data: () => ({
        selectedId: -1,
        showMenu: false,
        x: 0,
        y: 0,
        contextMenuItems: [
            {title: 'Удалить'}
        ],

        itemContextMenu: {},
        dialog: false,

        showForm: false,

        search: ''

    }),
    methods: {
        rowClick(item, row) {
            if (this.selectedId === item.id) {
                this.selectedId = -1
                row.select(false)
            } else {
                this.selectedId = item.id
                row.select(true);
            }
        },
        rowContextMenu(e, item) {
            document.oncontextmenu = function () {
                return false
            }
            this.itemContextMenu = item.item

            this.showMenu = false;
            this.x = e.clientX;
            this.y = e.clientY;
            this.$nextTick(() => {
                this.showMenu = true;
            });
        },
        rowDbClick(e, item) {
            this.$router.push(`/${item.item.id}`)
        },
        async onAnswerDialog(data) {
            this.dialog = data.dialog
            if (data.deleteObject) {
                await this.$store.dispatch('deleteEmployee', this.itemContextMenu.id)
                this.$emit('initEmployees')
            }
        },
        onAnswerForm(data) {
            this.showForm = data.showForm
            if (data.save) {
                console.log('Сохранить')
            }

        }
    },
}
</script>

<style>
tr.v-data-table__selected {
    background: salmon !important;
}
</style>
