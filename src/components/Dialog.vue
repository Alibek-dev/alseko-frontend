<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="500"
    >
        <v-card>
            <v-card-title class="headline">
                {{ question }}
            </v-card-title>
            <v-card-text> <strong>{{ text }}</strong> </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red darken-1"
                    text
                    @click="$emit('answer', {deleteObject: false, dialog: false})"
                >
                    Нет
                </v-btn>
                <v-btn
                    color="green darken-1"
                    text
                    @click="$emit('answer', {deleteObject: true, dialog: false})"
                >
                    Да
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        question: String,
        text: String,
        dialog: Boolean
    },

}
</script>

<style scoped>

</style>
