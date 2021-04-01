<template>
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
</template>

<script>
export default {
    name: "Dialog",
    props: {
        itemContextMenu: Object,
        dialog: Boolean
    },

}
</script>

<style scoped>

</style>
