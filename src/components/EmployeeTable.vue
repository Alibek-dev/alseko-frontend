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
            @click:row="rowClick"
            @contextmenu:row="rowContextMenu"
            item-key="fullName"
            single-select
            :headers="headers"
            :items="employees"
            :search="search"
        >

        </v-data-table>

        <v-menu v-model="showMenu" :position-x="x" :position-y="y" absolute offset-y>
            <v-list>
                    <v-btn @click="dialog = !dialog" depressed><v-icon>mdi-delete</v-icon> Удалить</v-btn>
            </v-list>
        </v-menu>

        <v-dialog
            v-model="dialog"
            persistent
            max-width="400"
        >
            <v-card>
                <v-card-title class="headline">
                    Вы действительно хотите удалить?
                </v-card-title>
                <v-card-text>Сотрудника <strong>{{ itemContextMenu.fullName }}</strong></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        Disagree
                    </v-btn>
                    <v-btn
                        color="green darken-1"
                        text
                        @click="dialog = false"
                    >
                        Agree
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>
</template>

<script>
export default {
    name: "Table",
    props: {
        employees: Array,
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

        search: '',
        headers: [
            {text: 'ФИО', align: 'start', value: 'fullName'},
            {text: 'Кол-во', align: 'start', value: 'countOfSubjects'},
            {text: 'Общая стоимость', align: 'start', value: 'sumOfTangiblesValue'},

        ]
    }),
    methods: {
        rowClick: function (item, row) {
            if (this.selectedId === item.fullName) {
                this.selectedId = -1
                row.select(false)
            } else {
                this.selectedId=item.fullName
                row.select(true);
            }
        },
        rowContextMenu: function (e, item) {
            document.oncontextmenu = function (){return false}
            this.itemContextMenu = item.item

            this.showMenu = false;
            this.x = e.clientX;
            this.y = e.clientY;
            this.$nextTick(() => {
                this.showMenu = true;
            });
        }
    },
}
</script>

<style>
tr.v-data-table__selected {
    background: salmon !important;
}
</style>
