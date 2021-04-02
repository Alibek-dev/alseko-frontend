<template>
    <v-card>
        <v-card-title>
            <span class="headline">{{ formTitle }}</span>
        </v-card-title>

        <v-card-text>
            <v-container>
                <v-col cols="12">
                    <v-text-field
                        label="Название"
                        placeholder="Введите название материальной ценности"
                        outlined
                        v-model="subject"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Стоимость"
                        placeholder="Введите стоимость"
                        outlined
                        v-model="price"
                    ></v-text-field>
                </v-col>
            </v-container>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="$emit('close', {showTangibleForm: false})"
            >
                Отмена
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click="submit"
            >
                Сохранить
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "TangibleForm",
    props: {
        editedItem: Object,
        formTitle: Text,
        showTangibleForm: Boolean,
    },
    data: () => ({
        subject: '',
        price: '',
    }),
    mounted() {

        console.log(this.editedItem)
    },
    watch: {
        showTangibleForm() {
            this.subject = this.editedItem.subject
            this.price = this.editedItem.price
            console.log(this.editedItem)
        },
    },
    methods: {
        submit() {
            this.$emit('save', {
                    subject: this.subject,
                    price: this.price
                }
            )
            console.log('Сохранить')
        }
    }

}
</script>

<style scoped>

</style>
